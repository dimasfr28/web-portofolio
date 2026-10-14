import Groq from 'groq-sdk';
import { buildIndex, search } from './retrieval';

// Groq client is created on first use: the SDK throws when the API key is missing,
// which would otherwise crash the whole page at import time.
let groqClient = null;
const getGroq = () => {
  if (!groqClient) {
    groqClient = new Groq({
      apiKey: process.env.REACT_APP_GROQ_API_KEY,
      dangerouslyAllowBrowser: true
    });
  }
  return groqClient;
};

// In-memory document index
let documentIndex = buildIndex([]);

// Store document chunks in memory
export const storeDocumentChunks = (chunks) => {
  documentIndex = buildIndex(chunks);
  console.log(`✅ Stored ${documentIndex.docs.length} chunks in memory`);
  return documentIndex.docs.length;
};

// Query relevant documents
export const queryRelevantDocs = (query, topK = 5) => {
  if (documentIndex.docs.length === 0) {
    console.warn('⚠️ No documents loaded');
    return [];
  }
  return search(documentIndex, query, topK);
};

// Generate RAG response
export const generateRAGResponse = async (userMessage, conversationHistory = []) => {
  try {
    console.log('🔍 Querying relevant docs for:', userMessage);
    const relevantDocs = queryRelevantDocs(userMessage, 5);
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
- Answer ONLY from the information above. Never invent numbers, tools, dates, employers or results that are not written there
- If the answer is not in the information above, say you don't have that detail instead of guessing
- Reply in the same language as the question
- Keep responses concise and relevant

Remember: You are speaking on behalf of Dimas, so use first person when appropriate (e.g., "I worked on..." or "My experience includes...").`;

    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory,
      { role: 'user', content: userMessage }
    ];

    console.log('🤖 Calling Groq API...');
    console.log('API Key exists:', !!process.env.REACT_APP_GROQ_API_KEY);

    const completion = await getGroq().chat.completions.create({
      messages: messages,
      model: process.env.REACT_APP_GROQ_MODEL || 'qwen/qwen3.8-27b',
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
