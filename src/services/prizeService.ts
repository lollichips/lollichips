import { collection, addDoc, getDocs, query, where, deleteDoc, DocumentReference } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Prize } from '../types/prize';
import { DEFAULT_PRIZES } from '../data/prizesData';
import { shuffleArray, validatePrizeCount } from '../utils/prizeUtils';

export class PrizeService {
  private prizesRef = collection(db, 'prizes');
  private claimCodesRef = collection(db, 'claimCodes');

  async getPrizes(): Promise<Prize[]> {
    try {
      const snapshot = await getDocs(this.prizesRef);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Prize));
    } catch (error) {
      console.error('Error getting prizes:', error);
      throw error;
    }
  }

  async clearExistingPrizes(): Promise<void> {
    const snapshot = await getDocs(this.prizesRef);
    const deletePromises = snapshot.docs.map(doc => deleteDoc(doc.ref));
    await Promise.all(deletePromises);
  }

  private async getUnclaimedCodes() {
    const snapshot = await getDocs(
      query(this.claimCodesRef, where("isUsed", "==", false))
    );
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }

  async initializePrizes(): Promise<void> {
    try {
      // Get unclaimed codes
      const unclaimedCodes = await this.getUnclaimedCodes();
      
      // Validate prize count
      validatePrizeCount(DEFAULT_PRIZES.length, unclaimedCodes.length);

      // Clear existing prizes
      await this.clearExistingPrizes();

      // Shuffle codes for random assignment
      const shuffledCodes = shuffleArray(unclaimedCodes);

      // Create prizes with assigned claim codes
      const createPromises = DEFAULT_PRIZES.map((prize, index) => 
        addDoc(this.prizesRef, {
          ...prize,
          claimCodeId: shuffledCodes[index].id,
          status: "Unclaimed",
          createdAt: new Date()
        })
      );

      await Promise.all(createPromises);
    } catch (error) {
      console.error('Error initializing prizes:', error);
      throw error;
    }
  }
}