// Secure claim code generation
const CHARS = {
  numbers: '0123456789',
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz'
};

function getRandomChar(charset) {
  const randomIndex = Math.floor(Math.random() * charset.length);
  return charset[randomIndex];
}

export function generateClaimCode() {
  // Generate a 12-character code with specific pattern:
  // 4 numbers + 4 uppercase + 4 lowercase
  let code = '';
  
  // Add 4 numbers
  for (let i = 0; i < 4; i++) {
    code += getRandomChar(CHARS.numbers);
  }
  
  // Add 4 uppercase letters
  for (let i = 0; i < 4; i++) {
    code += getRandomChar(CHARS.uppercase);
  }
  
  // Add 4 lowercase letters
  for (let i = 0; i < 4; i++) {
    code += getRandomChar(CHARS.lowercase);
  }
  
  // Shuffle the code
  return code.split('').sort(() => Math.random() - 0.5).join('');
}