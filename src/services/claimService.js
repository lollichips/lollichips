import { ClaimCodeManager, validateClaimCode as validateCode } from './claimCode';
import { PrizeService } from './prizeService';

const claimCodeManager = new ClaimCodeManager();
const prizeService = new PrizeService();

export async function validateClaimCode(code) {
  try {
    // Validate the claim code
    const validationResult = await validateCode(code);
    
    if (!validationResult.isValid) {
      return { 
        valid: false, 
        message: validationResult.error 
      };
    }

    // Get the associated prize
    const prize = await prizeService.getPrize(validationResult.claimCode.prizeId);
    
    if (!prize) {
      return { 
        valid: false, 
        message: "Prize not found" 
      };
    }

    if (prize.status === 'Claimed') {
      return { 
        valid: false, 
        message: "This prize has already been claimed" 
      };
    }

    return {
      valid: true,
      claimId: validationResult.claimCode.id,
      prizeId: prize.id,
      prize
    };
  } catch (error) {
    console.error('Error validating claim code:', error);
    throw new Error('Failed to validate claim code');
  }
}

export async function submitClaim(claimId, prizeId, winnerDetails) {
  try {
    await claimCodeManager.claimPrize(claimId, prizeId, winnerDetails);
    return { success: true };
  } catch (error) {
    console.error('Error submitting claim:', error);
    throw error;
  }
}