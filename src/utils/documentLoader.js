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

// Split a text file into one chunk per entry (entries are separated by blank lines),
// so each project, job or award is retrieved as a whole. Very long entries fall back to word chunks.
function chunkEntries(text) {
  return text
    .split(/\n\s*\n/)
    .map((entry) => entry.trim())
    .filter((entry) => entry.split(/\s+/).length >= 12)
    .flatMap((entry) => (entry.split(/\s+/).length > 500 ? chunkText(entry, 500, 50) : [entry]));
}

// Load documents from text files
export const loadAllDocuments = async () => {
  try {
    const documents = [];

    // Load experience.txt
    try {
      const expResponse = await fetch('/rag/experience.txt');
      if (expResponse.ok) {
        const expText = await expResponse.text();
        const expChunks = chunkEntries(expText);
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
      const projResponse = await fetch('/rag/projects.txt');
      if (projResponse.ok) {
        const projText = await projResponse.text();
        const projChunks = chunkEntries(projText);
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
      const achResponse = await fetch('/rag/achievement.txt');
      if (achResponse.ok) {
        const achText = await achResponse.text();
        const achChunks = chunkEntries(achText);
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
