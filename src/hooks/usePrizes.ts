import { useState, useEffect } from 'react';
import { Prize } from '../types/prize';
import { PrizeService } from '../services/prizeService';

const prizeService = new PrizeService();

export function usePrizes() {
  const [prizes, setPrizes] = useState<Prize[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    loadPrizes();
  }, []);

  const loadPrizes = async () => {
    try {
      setLoading(true);
      const prizeData = await prizeService.getPrizes();
      setPrizes(prizeData);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load prizes'));
    } finally {
      setLoading(false);
    }
  };

  const initializePrizes = async () => {
    try {
      setLoading(true);
      await prizeService.initializePrizes();
      await loadPrizes();
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to initialize prizes'));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    prizes,
    loading,
    error,
    initializePrizes,
    refreshPrizes: loadPrizes
  };
}