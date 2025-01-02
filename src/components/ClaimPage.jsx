import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { validateClaimCode, submitClaim } from '../services/claimService';
import toast from 'react-hot-toast';

export default function ClaimPage() {
  const [searchParams] = useSearchParams();
  const [claimState, setClaimState] = useState({
    loading: true,
    error: null,
    validationResult: null,
    claimed: false
  });
  const [formData, setFormData] = useState({
    name: '',
    phone: ''
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    validateCode();
  }, []);

  const validateCode = async () => {
    const code = searchParams.get('code');
    if (!code) {
      setClaimState({
        loading: false,
        error: "No claim code provided",
        validationResult: null,
        claimed: false
      });
      return;
    }

    try {
      const result = await validateClaimCode(code);
      setClaimState({
        loading: false,
        error: result.valid ? null : result.message,
        validationResult: result,
        claimed: false
      });
    } catch (error) {
      setClaimState({
        loading: false,
        error: error.message || "Failed to validate code. Please try again.",
        validationResult: null,
        claimed: false
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const { claimId, prizeId } = claimState.validationResult;
      await submitClaim(claimId, prizeId, formData);
      toast.success('Prize claimed successfully!');
      
      setClaimState(prev => ({
        ...prev,
        claimed: true
      }));
    } catch (error) {
      toast.error(error.message || 'Failed to submit claim. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (claimState.loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (claimState.error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <div className="text-center">
            <div className="text-red-600 text-xl mb-4">❌</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Claim Error</h2>
            <p className="text-gray-600">{claimState.error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (claimState.claimed) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <div className="text-center">
            <div className="text-green-600 text-xl mb-4">✅</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Congratulations!</h2>
            <p className="text-gray-600">Your prize has been claimed successfully.</p>
          </div>
        </div>
      </div>
    );
  }

  const { prize } = claimState.validationResult;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Claim Your Prize</h2>
          <p className="mt-2 text-gray-600">You've won: {prize.name}</p>
          <p className="text-sm text-gray-500">{prize.description}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {submitting ? 'Submitting...' : 'Claim Prize'}
          </button>
        </form>
      </div>
    </div>
  );
}