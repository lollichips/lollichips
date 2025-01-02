import { usePrizes } from '../hooks/usePrizes';
import PrizeCard from './PrizeCard';
import LoadingSpinner from './LoadingSpinner';

export default function PrizeGrid() {
  const { prizes, loading, error } = usePrizes();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Error loading prizes: {error.message}</p>
      </div>
    );
  }

  if (prizes.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">
          No prizes available. Click "Initialize Prizes" to add prizes.
        </p>
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