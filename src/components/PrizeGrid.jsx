import { useState, useEffect } from 'react';
import { PrizeService } from '../services/prizeService';
import PrizeCard from './PrizeCard';
import toast from 'react-hot-toast';

const prizeService = new PrizeService();

export default function PrizeGrid() {
  const [prizes, setPrizes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPrizes();
  }, []);

  const loadPrizes = async () => {
    try {
      const prizeData = await prizeService.getPrizes();
      setPrizes(prizeData);
    } catch (error) {
      console.error('Error loading prizes:', error);
      toast.error('Failed to load prizes');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (prizes.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No prizes available. Click "Add Prize" to create new prizes.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {prizes.map((prize) => (
        <PrizeCard key={prize.id} prize={prize} />
      ))}
    </div>
  );
}