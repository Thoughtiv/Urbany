import { create } from 'zustand';
import { Property } from '../types';

interface PropertyState {
  properties: Property[];
  favorites: string[];
  selectedProperty: Property | null;
  searchQuery: string;
  selectedType: string;
  maxPrice: number;
  setSearchQuery: (query: string) => void;
  setSelectedType: (type: string) => void;
  setMaxPrice: (price: number) => void;
  toggleFavorite: (id: string) => void;
  setSelectedProperty: (property: Property | null) => void;
}

const INITIAL_PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'Skyline Heights Premium',
    description: 'Ultra-luxury 3BHK high-rise apartment with panoramic skyline views, private balcony, and smart home automation.',
    price: 9500000,
    currency: 'INR',
    type: 'apartment',
    status: 'available',
    address: 'Financial District, Nanakramguda',
    city: 'Hyderabad',
    state: 'Telangana',
    postalCode: '500081',
    country: 'India',
    latitude: 17.3850,
    longitude: 78.4867,
    bedrooms: 3,
    bathrooms: 3,
    area: 1600,
    yearBuilt: 2025,
    amenities: ['Infinity Pool', 'EV Charging', 'Clubhouse', '24/7 Security', 'Gym'],
    images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80'],
    thumbnail: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    matchScore: 94,
    builderName: 'Prestige Group',
    builderRating: 4.8,
    locationTag: 'Financial District',
    investmentYield: 4.6,
  },
  {
    id: '2',
    title: 'Green Valley Villa',
    description: 'Exclusive 4BHK independent villa in a serene gated township near top tech parks and international schools.',
    price: 18500000,
    currency: 'INR',
    type: 'villa',
    status: 'available',
    address: 'Gachibowli Outer Ring Road',
    city: 'Hyderabad',
    state: 'Telangana',
    postalCode: '500032',
    country: 'India',
    latitude: 17.4328,
    longitude: 78.3849,
    bedrooms: 4,
    bathrooms: 4,
    area: 2800,
    yearBuilt: 2024,
    amenities: ['Private Garden', 'Double Car Parking', 'Solar Power', 'Clubhouse'],
    images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80'],
    thumbnail: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    matchScore: 90,
    builderName: 'Aparna Constructions',
    builderRating: 4.6,
    locationTag: 'Gachibowli',
    investmentYield: 4.2,
  },
  {
    id: '3',
    title: 'Elite Crest Tower',
    description: 'Modern 3BHK flat featuring double-height ceiling, Italian marble flooring, and direct expressway access.',
    price: 12000000,
    currency: 'INR',
    type: 'apartment',
    status: 'available',
    address: 'Neopolis, Kokapet',
    city: 'Hyderabad',
    state: 'Telangana',
    postalCode: '500075',
    country: 'India',
    latitude: 17.3569,
    longitude: 78.3999,
    bedrooms: 3,
    bathrooms: 3,
    area: 2000,
    yearBuilt: 2024,
    amenities: ['Mini Theater', 'Tennis Court', 'Sky Lounge', 'Concierge Service'],
    images: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'],
    thumbnail: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    matchScore: 92,
    builderName: 'My Home Group',
    builderRating: 4.9,
    locationTag: 'Kokapet',
    investmentYield: 4.8,
  },
];

export const usePropertyStore = create<PropertyState>((set) => ({
  properties: INITIAL_PROPERTIES,
  favorites: ['1'],
  selectedProperty: null,
  searchQuery: '',
  selectedType: 'all',
  maxPrice: 20000000,

  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedType: (type) => set({ selectedType: type }),
  setMaxPrice: (price) => set({ maxPrice: price }),

  toggleFavorite: (id) =>
    set((state) => ({
      favorites: state.favorites.includes(id)
        ? state.favorites.filter((favId) => favId !== id)
        : [...state.favorites, id],
    })),

  setSelectedProperty: (property) => set({ selectedProperty: property }),
}));
