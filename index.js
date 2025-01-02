import { generateAndStoreClaimCodes } from './src/services/claimCodeService.js';

async function main() {
  try {
    console.log('Generating and storing claim codes...');
    await generateAndStoreClaimCodes();
    console.log('Claim codes stored successfully!');
  } catch (error) {
    console.error('Error:', error);
  }
}

main();