const Groq = require('groq-sdk');

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

// Static context about Dimas (tanpa RAG, hardcoded)
const DIMAS_CONTEXT = `
Dimas Firmansyah adalah seorang AI Engineer dan Data Scientist dari Politeknik Elektronika Negeri Surabaya (PENS).

Skills utama:
- Machine Learning & Deep Learning
- Python, TensorFlow, PyTorch
- Data Science & Analytics
- Computer Vision & NLP
- IoT Development

Pengalaman:
- AI Engineer Intern di PT Len Industri
- Robotics Team Member di berbagai kompetisi
- Mentor di EEPIS Data Enthusiast (EDUST)

Projects:
- Socnganalis: Social media analytics platform
- NeuroTraffic: Traffic prediction system
- Tunarasa: Sign language detection
- WEMOS Water Monitoring System

Achievements:
- Champion at COMFEST-17 AI Innovation Challenge
- Multiple robotics competition awards
- Research publications di bidang AI
`;

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
    const { message, conversationHistory = [] } = JSON.parse(event.body);

    if (!message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Message is required' })
      };
    }

    const systemPrompt = `You are an AI assistant representing Dimas Firmansyah.

${DIMAS_CONTEXT}

Answer questions professionally and accurately based on the context above. Use first person when appropriate.`;

    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory.slice(-10), // Only last 10 messages for context
      { role: 'user', content: message }
    ];

    console.log('Calling Groq API...');

    const completion = await groq.chat.completions.create({
      messages: messages,
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 512,
      top_p: 1,
      stream: false
    });

    console.log('Groq API response received');

    const response = completion.choices[0]?.message?.content || 'Sorry, I could not generate a response.';

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
