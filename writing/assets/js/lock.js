/* ============================================================================
   ░░░  LOCKED ENTRIES  ░░░

   A locked entry keeps its writing in entries.js as an encrypted string
   instead of as readable text. That matters: this is a plain static site
   with no server, so anything merely *hidden* by the page would still be
   sitting in the file for anyone who opened it. Here the readable words
   genuinely aren't in the file, and without the password nothing — not the
   page, not someone reading the source — can get them back.

   To lock something, open  lock.html  in your browser, paste the writing
   in, pick a password, and copy the string it gives you.

   What is still public on a locked entry: its date, its title, its tags
   and its colour. Only the writing itself is sealed. So give a locked
   entry a title you don't mind people seeing.

   Format:  1$salt$iv$ciphertext   (each part base64)
            AES-GCM 256-bit, key stretched from the password with
            PBKDF2-SHA256. Changing ITERATIONS breaks existing strings.
   ============================================================================ */

window.lock = (function () {

  const VERSION    = '1';
  const ITERATIONS = 250000;

  const enc = new TextEncoder();
  const dec = new TextDecoder();

  /* Chunked, because spreading a long entry's bytes into one call is
     enough arguments to blow the stack. */
  function toB64(buf) {
    const bytes = new Uint8Array(buf);
    let out = '';
    for (let i = 0; i < bytes.length; i += 8192) {
      out += String.fromCharCode.apply(null, bytes.subarray(i, i + 8192));
    }
    return btoa(out);
  }

  function fromB64(str) {
    const raw = atob(str);
    const bytes = new Uint8Array(raw.length);
    for (let i = 0; i < raw.length; i++) bytes[i] = raw.charCodeAt(i);
    return bytes;
  }

  function keyFrom(password, salt) {
    return crypto.subtle
      .importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveKey'])
      .then(function (base) {
        return crypto.subtle.deriveKey(
          { name: 'PBKDF2', salt: salt, iterations: ITERATIONS, hash: 'SHA-256' },
          base,
          { name: 'AES-GCM', length: 256 },
          false,
          ['encrypt', 'decrypt']
        );
      });
  }

  /* text + password -> the string you paste into entries.js */
  function seal(text, password) {
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const iv   = crypto.getRandomValues(new Uint8Array(12));
    return keyFrom(password, salt)
      .then(function (key) {
        return crypto.subtle.encrypt({ name: 'AES-GCM', iv: iv }, key, enc.encode(text));
      })
      .then(function (body) {
        return [VERSION, toB64(salt), toB64(iv), toB64(body)].join('$');
      });
  }

  /* the string + password -> the writing back, or a rejected promise */
  function open(secret, password) {
    const parts = String(secret).split('$');
    if (parts.length !== 4 || parts[0] !== VERSION) {
      return Promise.reject(new Error('This lock is in a format I do not recognise.'));
    }
    return keyFrom(password, fromB64(parts[1]))
      .then(function (key) {
        return crypto.subtle.decrypt(
          { name: 'AES-GCM', iv: fromB64(parts[2]) }, key, fromB64(parts[3])
        );
      })
      .then(function (out) { return dec.decode(out); });
  }

  const available = !!(window.crypto && window.crypto.subtle);

  return { seal: seal, open: open, available: available };
})();
