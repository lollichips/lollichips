export interface Prize {
  id?: string;
  name: string;
  description: string;
  value: number;
  category: PrizeCategory;
  status: PrizeStatus;
  claimCodeId?: string;
  createdAt?: Date;
}

export type PrizeStatus = 'Unclaimed' | 'Claimed';

export type PrizeCategory = 
  | 'Electronics'
  | 'Gaming'
  | 'Wearables'
  | 'Audio'
  | 'Gift Cards'
  | 'Home'
  | 'Fitness'
  | 'Photography'
  | 'Sports'
  | 'Smart Home';