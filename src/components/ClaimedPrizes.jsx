import { useState, useEffect } from 'react';
import { PrizeService } from '../services/prizeService';
import toast from 'react-hot-toast';

const prizeService = new PrizeService();

export default function ClaimedPrizes() {
  const [claimedPrizes, setClaimedPrizes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadClaimedPrizes();
  }, []);

  const loadClaimedPrizes = async () => {
    try {
      const prizes = await prizeService.getClaimedPrizes();
      setClaimedPrizes(prizes);
    } catch (error) {
      console.error('Error loading claimed prizes:', error);
      toast.error('Failed to load claimed prizes');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-ET', {
      style: 'currency',
      currency: 'ETB',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (date) => {
    return new Date(date.seconds * 1000).toLocaleString();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (claimedPrizes.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No claimed prizes yet.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Prize Details
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Winner Details
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Value
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Claimed Date
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {claimedPrizes.map((prize) => (
            <tr key={prize.id}>
              <td className="px-6 py-4">
                <div className="text-sm font-medium text-gray-900">{prize.name}</div>
                <div className="text-sm text-gray-500">{prize.description}</div>
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
                  {prize.category}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-900">{prize.winnerDetails?.name}</div>
                <div className="text-sm text-gray-500">{prize.winnerDetails?.phone}</div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                {formatCurrency(prize.value)}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                {formatDate(prize.claimedAt)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}