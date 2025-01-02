import { Prize } from '../types/prize';

export const DEFAULT_PRIZES: Omit<Prize, 'id' | 'status' | 'claimCodeId' | 'createdAt'>[] = [
  {
    name: "Latest iPhone",
    description: "Brand new iPhone 15 Pro",
    value: 999,
    category: "Electronics"
  },
  {
    name: "Gaming Console",
    description: "PlayStation 5 Digital Edition",
    value: 399,
    category: "Gaming"
  },
  {
    name: "Smart Watch",
    description: "Latest model smartwatch",
    value: 299,
    category: "Wearables"
  },
  // Add more prizes as needed, up to 20
];