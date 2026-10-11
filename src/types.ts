export type ProductCategory =
  | 'Textbooks and Notes'
  | 'Calculators'
  | 'Lab Materials'
  | 'Project Kits'
  | 'Drawing Tools'
  | 'Stationery'
  | 'Electronics'
  | 'Other College Essentials';

export type ProductCondition = 'Brand New' | 'Like New' | 'Good' | 'Fair';

export interface SellerInfo {
  name: string;
  college: string;
  department: string;
  semester: string;
  isVerified: boolean;
  contactEmail: string;
  phone?: string;
  joinedDate: string;
  rating?: number;
}

export interface Product {
  id: string;
  title: string;
  category: ProductCategory;
  description: string;
  price: number; // in INR
  originalPrice?: number;
  condition: ProductCondition;
  image: string;
  campus: string;
  seller: SellerInfo;
  listedDate: string;
  tags: string[];
  isAvailable: boolean;
  viewsCount: number;
  wishlistCount: number;
}

export interface StudentUser {
  id: string;
  name: string;
  email: string;
  college: string;
  rollNumber?: string;
  department?: string;
  isVerified: boolean;
  verificationStatus: 'verified' | 'pending' | 'unverified';
}

export interface ChatMessage {
  id: string;
  productId: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
  isSeller: boolean;
}
