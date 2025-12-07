import { storeDocumentChunks } from '../services/ragService';

// Chunk text into smaller pieces
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

// Load documents from text files
export const loadAllDocuments = async () => {
  try {
    const documents = [];

    // Load experience.txt
    try {
      const expResponse = await fetch('/experience.txt');
      if (expResponse.ok) {
        const expText = await expResponse.text();
        const expChunks = chunkText(expText, 500, 50);
        expChunks.forEach(chunk => {
          documents.push({
            text: chunk,
            source: 'Professional Experience'
          });
        });
      }
    } catch (error) {
      console.warn('Could not load experience.txt:', error);
    }

    // Load projects.txt
    try {
      const projResponse = await fetch('/projects.txt');
      if (projResponse.ok) {
        const projText = await projResponse.text();
        const projChunks = chunkText(projText, 500, 50);
        projChunks.forEach(chunk => {
          documents.push({
            text: chunk,
            source: 'Projects'
          });
        });
      }
    } catch (error) {
      console.warn('Could not load projects.txt:', error);
    }

    // Load achievement.txt
    try {
      const achResponse = await fetch('/achievement.txt');
      if (achResponse.ok) {
        const achText = await achResponse.text();
        const achChunks = chunkText(achText, 500, 50);
        achChunks.forEach(chunk => {
          documents.push({
            text: chunk,
            source: 'Achievements'
          });
        });
      }
    } catch (error) {
      console.warn('Could not load achievement.txt:', error);
    }

    // Store in memory
    const count = storeDocumentChunks(documents);
    console.log(`📚 Loaded ${count} document chunks from ${documents.length > 0 ? 'text files' : 'no files'}`);

    return count;
  } catch (error) {
    console.error('Error loading documents:', error);
    throw error;
  }
};
