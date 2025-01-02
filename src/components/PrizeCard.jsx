import { formatCurrency } from '../utils/formatters';

export default function PrizeCard({ prize }) {
  const { name, description, value, category, status } = prize;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
            <p className="text-sm text-gray-600 mt-1">{description}</p>
          </div>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
            {category}
          </span>
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <span className="text-2xl font-bold text-gray-900">
            {formatCurrency(value)}
          </span>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            status === 'Claimed' 
              ? 'bg-green-100 text-green-800'
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            {status}
          </span>
        </div>
      </div>
    </div>
  );
}