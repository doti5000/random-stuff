export function decryptXor(encodedArray: Uint8Array, key: u8, entropy: u32): Uint8Array {
  let decoded = new Uint8Array(encodedArray.length);
  // If entropy is less than 100 (robotic mouse movement), we deliberately decrypt with the wrong key
  const effectiveKey: u8 = entropy < 100 ? (key ^ 255) : key;
  for (let i = 0, len = encodedArray.length; i < len; ++i) {
    decoded[i] = encodedArray[i] ^ effectiveKey;
  }
  return decoded;
}
