import Groq from 'groq-sdk';

// Initialize Groq client
const groq = new Groq({
  apiKey: process.env.REACT_APP_GROQ_API_KEY,
  dangerouslyAllowBrowser: true
});

// In-memory vector store
let documentChunks = [];

// Simple text-based embedding (bag-of-words)
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

// Calculate cosine similarity
function cosineSimilarity(vec1, vec2) {
  let dotProduct = 0;
  for (let i = 0; i < vec1.length; i++) {
    dotProduct += vec1[i] * vec2[i];
  }
  return dotProduct;
}

// Store document chunks in memory
export const storeDocumentChunks = (chunks) => {
  documentChunks = chunks.map(chunk => ({
    text: chunk.text,
    source: chunk.source,
    embedding: generateEmbedding(chunk.text)
  }));
  console.log(`✅ Stored ${documentChunks.length} chunks in memory`);
  return documentChunks.length;
};

// Query relevant documents
export const queryRelevantDocs = (query, topK = 3) => {
  if (documentChunks.length === 0) {
    console.warn('⚠️ No documents loaded');
    return [];
  }

  const queryEmbedding = generateEmbedding(query);

  // Calculate similarity scores
  const scored = documentChunks.map(chunk => ({
    text: chunk.text,
    score: cosineSimilarity(queryEmbedding, chunk.embedding)
  }));

  // Sort by score and take top K
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, topK).map(item => item.text);
};

// Generate RAG response
export const generateRAGResponse = async (userMessage, conversationHistory = []) => {
  try {
    console.log('🔍 Querying relevant docs for:', userMessage);
    const relevantDocs = queryRelevantDocs(userMessage, 3);
    console.log('📄 Found relevant docs:', relevantDocs.length);

    const context = relevantDocs.length > 0
      ? `Based on the following information about Dimas Firmansyah:\n\n${relevantDocs.join('\n\n')}\n\n`
      : '';

    const systemPrompt = `You are an AI assistant representing Dimas Firmansyah, a talented AI Engineer and Data Scientist from Politeknik Elektronika Negeri Surabaya (PENS).

${context}

Your role is to:
- Answer questions about Dimas's background, skills, experience, projects, and achievements
- Be professional, friendly, and informative
- If you don't have specific information, acknowledge it honestly
- Use the context provided to give accurate answers
- Keep responses concise and relevant

Remember: You are speaking on behalf of Dimas, so use first person when appropriate (e.g., "I worked on..." or "My experience includes...").`;

    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory,
      { role: 'user', content: userMessage }
    ];

    console.log('🤖 Calling Groq API...');
    console.log('API Key exists:', !!process.env.REACT_APP_GROQ_API_KEY);
    console.log('API Key prefix:', process.env.REACT_APP_GROQ_API_KEY?.substring(0, 10));

    const completion = await groq.chat.completions.create({
      messages: messages,
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 1024,
      top_p: 1,
      stream: false
    });

    console.log('✅ Groq API response received');
    return completion.choices[0]?.message?.content || 'Sorry, I could not generate a response.';
  } catch (error) {
    console.error('❌ Error generating response:', error);
    console.error('Error details:', {
      message: error.message,
      status: error.status,
      type: error.type
    });
    throw error;
  }
};
