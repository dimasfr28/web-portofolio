const { Pinecone } = require('@pinecone-database/pinecone');
const pdfParse = require('pdf-parse');
const fs = require('fs').promises;
const path = require('path');

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY
});

const PINECONE_INDEX_NAME = 'dimas-portfolio';
const PINECONE_NAMESPACE = 'portfolio-docs';

// Generate simple embedding
function generateEmbedding(text) {
  const words = text.toLowerCase().split(/\s+/);
  const wordSet = [...new Set(words)];

  const embedding = new Array(768).fill(0);

  wordSet.forEach(word => {
    const hash = word.split('').reduce((acc, char) => {
      return ((acc << 5) - acc) + char.charCodeAt(0);
    }, 0);
    const index = Math.abs(hash) % 768;
    embedding[index] += 1;
  });

  const magnitude = Math.sqrt(embedding.reduce((sum, val) => sum + val * val, 0));
  return embedding.map(val => magnitude > 0 ? val / magnitude : 0);
}

// Chunk text
function chunkText(text, chunkSize = 500, overlap = 50) {
  const words = text.split(/\s+/);
  const chunks = [];

  for (let i = 0; i < words.length; i += chunkSize - overlap) {
    const chunk = words.slice(i, i + chunkSize).join(' ');
    if (chunk.trim()) {
      chunks.push(chunk);
    }
  }

  return chunks;
}

// Process PDF
async function processPDF(pdfPath, sourceName) {
  try {
    const dataBuffer = await fs.readFile(pdfPath);
    const data = await pdfParse(dataBuffer);

    const chunks = chunkText(data.text, 500, 50);

    return chunks.map((chunkText, index) => ({
      text: chunkText,
      source: sourceName,
      page: Math.floor(index / 5) + 1 // Approximate page
    }));
  } catch (error) {
    console.error(`Error processing PDF ${sourceName}:`, error);
    return [];
  }
}

// Store chunks in Pinecone
async function storeChunks(chunks) {
  try {
    const index = pinecone.index(PINECONE_INDEX_NAME);
    const vectors = [];

    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      const embedding = generateEmbedding(chunk.text);

      vectors.push({
        id: `chunk-${i}-${Date.now()}-${Math.random().toString(36).substring(7)}`,
        values: embedding,
        metadata: {
          text: chunk.text,
          source: chunk.source,
          page: chunk.page || 0
        }
      });
    }

    // Upsert in batches of 100
    const batchSize = 100;
    for (let i = 0; i < vectors.length; i += batchSize) {
      const batch = vectors.slice(i, i + batchSize);
      await index.namespace(PINECONE_NAMESPACE).upsert(batch);
    }

    return vectors.length;
  } catch (error) {
    console.error('Error storing chunks:', error);
    throw error;
  }
}

// Netlify Function handler
exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Check if already initialized
    const { force = false } = JSON.parse(event.body || '{}');

    // Paths to PDF files
    const pdfFiles = [
      {
        path: path.join(__dirname, '../../public/doc_rag/CV Dimas.pdf'),
        name: 'CV Dimas Firmansyah'
      },
      {
        path: path.join(__dirname, '../../public/doc_rag/Portofolio_Dimas Firmansyah_PENS (2).pdf'),
        name: 'Portfolio Dimas Firmansyah'
      }
    ];

    let allChunks = [];

    for (const file of pdfFiles) {
      try {
        const chunks = await processPDF(file.path, file.name);
        allChunks.push(...chunks);
        console.log(`Processed ${file.name}: ${chunks.length} chunks`);
      } catch (error) {
        console.error(`Failed to process ${file.name}:`, error);
      }
    }

    if (allChunks.length === 0) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'No documents processed' })
      };
    }

    const vectorCount = await storeChunks(allChunks);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Documents initialized successfully',
        chunks: allChunks.length,
        vectors: vectorCount
      })
    };
  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Internal server error',
        message: error.message
      })
    };
  }
};
