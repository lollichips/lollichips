const { getRandomInt, getRandomChar, shuffleString, CHARS } = require('./utils/randomGenerator');

function generateClaimCode(length) {
  let code = '';
  
  // Ensure at least one character from each category
  code += getRandomChar(CHARS.uppercase);
  code += getRandomChar(CHARS.lowercase);
  code += getRandomChar(CHARS.numbers);
  code += getRandomChar(CHARS.symbols);
  
  // Fill the rest of the length with random characters from all categories
  const allChars = Object.values(CHARS).join('');
  while (code.length < length) {
    code += getRandomChar(allChars);
  }
  
  // Shuffle the final code to ensure randomness
  return shuffleString(code);
}

function generateUniqueCodes(count, minLength, maxLength) {
  const codes = new Set();
  
  while (codes.size < count) {
    const length = getRandomInt(minLength, maxLength);
    const code = generateClaimCode(length);
    codes.add(code);
  }
  
  return Array.from(codes);
}

module.exports = { generateUniqueCodes };