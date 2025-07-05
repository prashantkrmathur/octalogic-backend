// shim.js

// Safely patch globalThis.crypto.randomUUID
if (!globalThis.crypto || typeof globalThis.crypto.randomUUID !== 'function') {
    const crypto = require('crypto');
  
    globalThis.crypto = {
      ...globalThis.crypto,
      randomUUID: crypto.randomUUID,
      getRandomValues: crypto.getRandomValues || ((arr) => crypto.randomFillSync(arr)),
      subtle: crypto.subtle || {}, // to avoid breaking expectations
    };
  }
  
  // Now start your NestJS app
  require('./dist/main');
  