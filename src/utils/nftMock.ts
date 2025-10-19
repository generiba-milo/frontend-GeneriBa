// Mock NFT Data and Types
export interface NFT {
  id: string;
  tokenId: string;
  name: string;
  description: string;
  image: string;
  jobId?: string;
  jobTitle?: string;
  completedDate?: string;
  floorPrice: number;
  lastSalePrice?: number;
  status: 'minted' | 'listed' | 'sold';
  owner: string;
  attributes: {
    trait_type: string;
    value: string | number;
  }[];
}

export const MOCK_NFTS: NFT[] = [
  {
    id: '1',
    tokenId: 'NFT-001',
    name: 'Completion Certificate #1',
    description: 'Certificate of completion for Full-Stack Web Development project',
    image: 'https://via.placeholder.com/300x300/667eea/ffffff?text=NFT+Certificate',
    jobId: 'job-123',
    jobTitle: 'Full-Stack Web App Development',
    completedDate: '2024-01-15',
    floorPrice: 0.5,
    lastSalePrice: 0.5,
    status: 'minted',
    owner: 'user-wallet-address',
    attributes: [
      { trait_type: 'Category', value: 'Development' },
      { trait_type: 'Completion Date', value: '2024-01-15' },
      { trait_type: 'Payment', value: 5000 },
      { trait_type: 'Rating', value: 5 },
      { trait_type: 'Rarity', value: 'Gold' }
    ]
  },
  {
    id: '2',
    tokenId: 'NFT-002',
    name: 'Completion Certificate #2',
    description: 'Certificate of completion for UI/UX Design project',
    image: 'https://via.placeholder.com/300x300/764ba2/ffffff?text=NFT+Certificate',
    jobId: 'job-456',
    jobTitle: 'Mobile App UI/UX Design',
    completedDate: '2024-02-10',
    floorPrice: 0.3,
    status: 'minted',
    owner: 'user-wallet-address',
    attributes: [
      { trait_type: 'Category', value: 'Design' },
      { trait_type: 'Completion Date', value: '2024-02-10' },
      { trait_type: 'Payment', value: 3000 },
      { trait_type: 'Rating', value: 4.5 },
      { trait_type: 'Rarity', value: 'Silver' }
    ]
  },
  {
    id: '3',
    tokenId: 'NFT-003',
    name: 'Completion Certificate #3',
    description: 'Certificate of completion for Smart Contract Development',
    image: 'https://via.placeholder.com/300x300/f093fb/ffffff?text=NFT+Certificate',
    jobId: 'job-789',
    jobTitle: 'Smart Contract Development',
    completedDate: '2024-03-05',
    floorPrice: 0.8,
    lastSalePrice: 0.7,
    status: 'listed',
    owner: 'user-wallet-address',
    attributes: [
      { trait_type: 'Category', value: 'Blockchain' },
      { trait_type: 'Completion Date', value: '2024-03-05' },
      { trait_type: 'Payment', value: 8000 },
      { trait_type: 'Rating', value: 5 },
      { trait_type: 'Rarity', value: 'Platinum' }
    ]
  }
];

export function generateMockNFT(jobId: string, jobTitle: string, payment: number): NFT {
  const tokenId = `NFT-${Date.now()}`;
  const completedDate = new Date().toISOString().split('T')[0];
  
  return {
    id: tokenId,
    tokenId,
    name: `Completion Certificate #${tokenId}`,
    description: `Certificate of completion for ${jobTitle}`,
    image: `https://via.placeholder.com/300x300/${Math.random().toString(16).slice(2, 8)}/ffffff?text=NFT+Certificate`,
    jobId,
    jobTitle,
    completedDate,
    floorPrice: payment / 10000, // Convert USD to SOL equivalent
    status: 'minted',
    owner: 'user-wallet-address',
    attributes: [
      { trait_type: 'Category', value: 'Completion' },
      { trait_type: 'Completion Date', value: completedDate },
      { trait_type: 'Payment', value: payment },
      { trait_type: 'Rating', value: 5 },
      { trait_type: 'Rarity', value: payment > 5000 ? 'Gold' : 'Silver' }
    ]
  };
}

export function calculateNFTValue(nfts: NFT[]): number {
  return nfts.reduce((total, nft) => total + nft.floorPrice, 0);
}
