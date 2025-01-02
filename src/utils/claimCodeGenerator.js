// Utility for generating unique claim codes
const CHARS = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%&*'
};

function getRandomChar(charSet) {
  return charSet[Math.floor(Math.random() * charSet.length)];
}

function shuffleString(str) {
  return str.split('').sort(() => Math.random() - 0.5).join('');
}

export function generateClaimCode() {
  const length = 50; // Fixed length for consistency
  let code = '';
  
  // Ensure at least one character from each category
  code += getRandomChar(CHARS.uppercase);
  code += getRandomChar(CHARS.lowercase);
  code += getRandomChar(CHARS.numbers);
  code += getRandomChar(CHARS.symbols);
  
  // Fill the rest with random characters
  const allChars = Object.values(CHARS).join('');
  while (code.length < length) {
    code += getRandomChar(allChars);
  }
  
  return shuffleString(code);
}
