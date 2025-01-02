import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { CLAIM_STATUS } from './types';

export async function validateClaimCode(code) {
  try {
    const claimCodesRef = collection(db, 'claimCodes');
    const q = query(claimCodesRef, where('code', '==', code));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return {
        isValid: false,
        error: 'Invalid code. Please check your QR Code again.'
      };
    }

    const claimDoc = snapshot.docs[0];
    const claimData = claimDoc.data();

    if (claimData.status === CLAIM_STATUS.CLAIMED) {
      return {
        isValid: false,
        error: 'This code has already been claimed.'
      };
    }

    if (claimData.status !== CLAIM_STATUS.ASSIGNED || !claimData.prizeId) {
      return {
        isValid: false,
        error: 'This code is not active.'
      };
    }

    return {
      isValid: true,
      claimCode: {
        id: claimDoc.id,
        ...claimData
      }
    };
  } catch (error) {
    console.error('Error validating claim code:', error);
    throw new Error('Failed to validate claim code');
  }
}