export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export function validatePrizeCount(prizesCount: number, codesCount: number): void {
  if (prizesCount > 20) {
    throw new Error('Cannot create more than 20 prizes');
  }
  
  if (codesCount < prizesCount) {
    throw new Error(`Not enough claim codes available. Need ${prizesCount} codes but only found ${codesCount}.`);
  }
}