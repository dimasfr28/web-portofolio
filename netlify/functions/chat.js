const { Pinecone } = require('@pinecone-database/pinecone');
const Groq = require('groq-sdk');

// Initialize clients
const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY
});

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

const PINECONE_INDEX_NAME = 'dimas-portfolio';
const PINECONE_NAMESPACE = 'portfolio-docs';

// Simple text-based embedding (bag-of-words with normalization)
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

  // Normalize
  const magnitude = Math.sqrt(embedding.reduce((sum, val) => sum + val * val, 0));
  return embedding.map(val => magnitude > 0 ? val / magnitude : 0);
}

// Query Pinecone for relevant documents
async function queryRelevantDocs(query, topK = 3) {
  try {
    const index = pinecone.index(PINECONE_INDEX_NAME);
    const queryEmbedding = generateEmbedding(query);

    const queryResponse = await index.namespace(PINECONE_NAMESPACE).query({
      vector: queryEmbedding,
      topK: topK,
      includeMetadata: true
    });

    return queryResponse.matches.map(match => match.metadata.text);
  } catch (error) {
    console.error('Error querying Pinecone:', error);
    return [];
  }
}

// Generate response using Groq LLM with RAG
async function generateRAGResponse(userMessage, conversationHistory = []) {
  try {
    // 1. Retrieve relevant context
    const relevantDocs = await queryRelevantDocs(userMessage, 3);

    // 2. Build context
    const context = relevantDocs.length > 0
      ? `Based on the following information about Dimas Firmansyah:\n\n${relevantDocs.join('\n\n')}\n\n`
      : '';

    // 3. System prompt
    const systemPrompt = `You are an AI assistant representing Dimas Firmansyah, a talented AI Engineer and Data Scientist from Politeknik Elektronika Negeri Surabaya (PENS).

${context}

Your role is to:
- Answer questions about Dimas's background, skills, experience, projects, and achievements
- Be professional, friendly, and informative
- If you don't have specific information, acknowledge it honestly
- Use the context provided to give accurate answers
- Keep responses concise and relevant

Remember: You are speaking on behalf of Dimas, so use first person when appropriate (e.g., "I worked on..." or "My experience includes...").`;

    // 4. Build messages
    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory,
      { role: 'user', content: userMessage }
    ];

    // 5. Call Groq API
    const completion = await groq.chat.completions.create({
      messages: messages,
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 1024,
      top_p: 1,
      stream: false
    });

    return completion.choices[0]?.message?.content || 'Sorry, I could not generate a response.';
  } catch (error) {
    console.error('Error generating response:', error);
    throw error;
  }
}

// Netlify Function handler
exports.handler = async (event) => {
  // Handle CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { message, conversationHistory = [] } = JSON.parse(event.body);

    if (!message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Message is required' })
      };
    }

    const response = await generateRAGResponse(message, conversationHistory);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ response })
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
