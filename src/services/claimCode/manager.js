import { collection, addDoc, doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { generateClaimCode } from './generator';
import { CLAIM_STATUS, PRIZE_STATUS } from './types';

export class ClaimCodeManager {
  constructor() {
    this.claimCodesRef = collection(db, 'claimCodes');
    this.prizesRef = collection(db, 'prizes');
  }

  async createNewCode() {
    try {
      const code = generateClaimCode();
      
      const claimCodeData = {
        code,
        status: CLAIM_STATUS.AVAILABLE,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const docRef = await addDoc(this.claimCodesRef, claimCodeData);
      
      return {
        id: docRef.id,
        ...claimCodeData
      };
    } catch (error) {
      console.error('Error creating claim code:', error);
      throw new Error('Failed to create new claim code');
    }
  }

  async assignToPrize(claimCodeId, prizeId) {
    try {
      const claimCodeRef = doc(this.claimCodesRef, claimCodeId);
      const prizeRef = doc(this.prizesRef, prizeId);

      // Get current claim code data
      const claimCodeDoc = await getDoc(claimCodeRef);
      if (!claimCodeDoc.exists()) {
        throw new Error('Claim code not found');
      }

      // Get current prize data
      const prizeDoc = await getDoc(prizeRef);
      if (!prizeDoc.exists()) {
        throw new Error('Prize not found');
      }

      // Update claim code
      await updateDoc(claimCodeRef, {
        status: CLAIM_STATUS.ASSIGNED,
        prizeId,
        updatedAt: new Date()
      });

      return true;
    } catch (error) {
      console.error('Error assigning claim code:', error);
      throw new Error('Failed to assign claim code to prize');
    }
  }

  async claimPrize(claimCodeId, prizeId, winnerDetails) {
    try {
      const claimCodeRef = doc(this.claimCodesRef, claimCodeId);
      const prizeRef = doc(this.prizesRef, prizeId);

      const timestamp = new Date();

      // Update claim code status
      await updateDoc(claimCodeRef, {
        status: CLAIM_STATUS.CLAIMED,
        winnerDetails,
        claimedAt: timestamp,
        updatedAt: timestamp
      });

      // Update prize status
      await updateDoc(prizeRef, {
        status: PRIZE_STATUS.CLAIMED,
        winnerDetails,
        claimedAt: timestamp,
        updatedAt: timestamp
      });

      return true;
    } catch (error) {
      console.error('Error claiming prize:', error);
      throw new Error('Failed to claim prize');
    }
  }
}