import { collection, addDoc, getDocs, query, where, updateDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { generateClaimCode } from '../utils/claimCodeGenerator';

export class ClaimCodeService {
  constructor() {
    this.claimCodesRef = collection(db, 'claimCodes');
  }

  async getUnassignedCodes() {
    try {
      const q = query(
        this.claimCodesRef,
        where("isUsed", "==", false),
        where("isAssigned", "==", false)
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting unassigned codes:', error);
      throw error;
    }
  }

  async generateNewClaimCode() {
    try {
      // Generate a new unique code
      const code = generateClaimCode();
      
      // Create the claim code document
      const newCode = {
        code,
        isUsed: false,
        isAssigned: false,
        createdAt: new Date()
      };

      const docRef = await addDoc(this.claimCodesRef, newCode);
      
      return {
        id: docRef.id,
        ...newCode
      };
    } catch (error) {
      console.error('Error generating new claim code:', error);
      throw error;
    }
  }

  async assignCodeToPrize(codeId, prizeId) {
    try {
      const codeRef = doc(this.claimCodesRef, codeId);
      const codeDoc = await getDoc(codeRef);
      
      if (!codeDoc.exists()) {
        throw new Error('Claim code not found');
      }
      
      if (codeDoc.data().isAssigned) {
        throw new Error('Code is already assigned to a prize');
      }

      await updateDoc(codeRef, {
        isAssigned: true,
        prizeId,
        assignedAt: new Date()
      });
    } catch (error) {
      console.error('Error assigning code to prize:', error);
      throw error;
    }
  }

  async validateCode(code) {
    try {
      const q = query(this.claimCodesRef, where("code", "==", code));
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        return { valid: false, message: "Invalid code" };
      }

      const claimCode = snapshot.docs[0];
      const claimData = claimCode.data();

      if (claimData.isUsed) {
        return { valid: false, message: "Code already claimed" };
      }

      if (!claimData.isAssigned || !claimData.prizeId) {
        return { valid: false, message: "Code not assigned to any prize" };
      }

      return {
        valid: true,
        claimId: claimCode.id,
        prizeId: claimData.prizeId
      };
    } catch (error) {
      console.error('Error validating code:', error);
      throw error;
    }
  }
}