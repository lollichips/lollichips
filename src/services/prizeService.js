import { collection, addDoc, getDocs, query, where, updateDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { ClaimCodeManager } from './claimCode';

export class PrizeService {
  constructor() {
    this.prizesRef = collection(db, 'prizes');
    this.claimCodeManager = new ClaimCodeManager();
  }

  async getPrizes() {
    try {
      const snapshot = await getDocs(this.prizesRef);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting prizes:', error);
      throw error;
    }
  }

  async addNewPrize(prizeData) {
    try {
      // Create a new claim code first
      const newClaimCode = await this.claimCodeManager.createNewCode();

      // Create new prize with claim code
      const newPrize = {
        ...prizeData,
        status: 'Unclaimed',
        createdAt: new Date(),
        claimCodeId: newClaimCode.id
      };

      // Add prize to database
      const prizeDoc = await addDoc(this.prizesRef, newPrize);
      
      // Assign the claim code to the prize
      await this.claimCodeManager.assignToPrize(newClaimCode.id, prizeDoc.id);

      return {
        id: prizeDoc.id,
        ...newPrize
      };
    } catch (error) {
      console.error('Error adding new prize:', error);
      throw error;
    }
  }

  async getPrize(prizeId) {
    try {
      const prizeDoc = await getDoc(doc(this.prizesRef, prizeId));
      if (!prizeDoc.exists()) {
        throw new Error('Prize not found');
      }
      return {
        id: prizeDoc.id,
        ...prizeDoc.data()
      };
    } catch (error) {
      console.error('Error getting prize:', error);
      throw error;
    }
  }

  async getClaimedPrizes() {
    try {
      const q = query(this.prizesRef, where("status", "==", "Claimed"));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting claimed prizes:', error);
      throw error;
    }
  }
}