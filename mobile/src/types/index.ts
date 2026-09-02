export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  type: 'apartment' | 'house' | 'villa' | 'plot';
  status: 'available' | 'sold' | 'pending';
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  latitude: number;
  longitude: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  yearBuilt: number;
  amenities: string[];
  images: string[];
  thumbnail: string;
  matchScore?: number;
  builderName?: string;
  builderRating?: number;
  locationTag?: string;
  investmentYield?: number;
  isFavorite?: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  isKycVerified: boolean;
}
