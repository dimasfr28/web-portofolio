// Turns an inline CSS string ("a-b: c; d: e") into a React style object.
const cache = new Map();

export const css = (str) => {
  if (cache.has(str)) return cache.get(str);
  const out = {};
  str.split(';').forEach((decl) => {
    const i = decl.indexOf(':');
    if (i < 0) return;
    const key = decl.slice(0, i).trim();
    const val = decl.slice(i + 1).trim();
    if (!key) return;
    out[key.startsWith('--') ? key : key.replace(/-([a-z])/g, (_, c) => c.toUpperCase())] = val;
  });
  cache.set(str, out);
  return out;
};
