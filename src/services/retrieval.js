// Lightweight keyword retrieval (TF-IDF with a title boost) used by the RAG chatbot.
// Pure functions, no dependencies, so it can be tested on its own.

const tokenize = (text) => text.toLowerCase().match(/[a-z0-9]+/g) || [];

// Chunks are { text, source }. The first line of a chunk is treated as its title.
export const buildIndex = (chunks) => {
  const docs = chunks.map((chunk) => {
    const tokens = tokenize(chunk.text);
    const tf = new Map();
    tokens.forEach((t) => tf.set(t, (tf.get(t) || 0) + 1));
    const titleTokens = new Set(tokenize(chunk.text.split('\n')[0]));
    return { text: chunk.text, source: chunk.source, tf, titleTokens, length: tokens.length || 1 };
  });

  const df = new Map();
  docs.forEach((d) => d.tf.forEach((_, t) => df.set(t, (df.get(t) || 0) + 1)));
  const idf = new Map();
  df.forEach((n, t) => idf.set(t, Math.log(1 + docs.length / n)));

  return { docs, idf };
};

export const search = (index, query, topK = 5) => {
  const queryTokens = [...new Set(tokenize(query))];
  return index.docs
    .map((d) => {
      let score = 0;
      queryTokens.forEach((t) => {
        const w = index.idf.get(t);
        if (!w) return;
        const tf = d.tf.get(t);
        if (tf) score += (w * (1 + Math.log(tf))) / Math.sqrt(d.length);
        // A query term that appears in the entry's title is a strong signal.
        if (d.titleTokens.has(t)) score += w * 0.5;
      });
      return { text: d.text, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .map((x) => x.text);
};
