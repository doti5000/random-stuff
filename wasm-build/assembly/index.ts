// XOR Decryption
export function decryptXor(encodedArray: Uint8Array, key: u8): Uint8Array {
  let decoded = new Uint8Array(encodedArray.length);
  for (let i = 0, len = encodedArray.length; i < len; ++i) {
    decoded[i] = encodedArray[i] ^ key;
  }
  return decoded;
}
