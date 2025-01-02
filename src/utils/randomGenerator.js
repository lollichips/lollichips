export const CHARS = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%&*'
};

export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomChar(charSet) {
  return charSet[Math.floor(Math.random() * charSet.length)];
}

export function shuffleString(str) {
  return str.split('').sort(() => Math.random() - 0.5).join('');
}