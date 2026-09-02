'use client'

import Link from 'next/link'
import { PropertyCard } from '@/components/common/PropertyCard'
import { Property } from '@/types'

// Mock data for demonstration
const FEATURED_PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'Modern Downtown Apartment',
    description: 'Stunning 2-bedroom apartment in the heart of downtown with city views.',
    price: 450000,
    currency: 'USD',
    type: 'apartment',
    status: 'available',
    address: '123 Main St',
    city: 'New York',
    state: 'NY',
    postalCode: '10001',
    country: 'USA',
    latitude: 40.7128,
    longitude: -74.006,
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    yearBuilt: 2020,
    amenities: ['Gym', 'Parking', 'Doorman', 'Rooftop Deck'],
    images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80'],
    thumbnail: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    ownerId: 'owner-1',
    views: 1250,
    favorites: 89,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T15:30:00Z',
  },
  {
    id: '2',
    title: 'Luxury Penthouse',
    description: 'Exclusive 4-bedroom penthouse with panoramic views and premium finishes.',
    price: 2500000,
    currency: 'USD',
    type: 'apartment',
    status: 'available',
    address: '456 Park Ave',
    city: 'New York',
    state: 'NY',
    postalCode: '10022',
    country: 'USA',
    latitude: 40.7614,
    longitude: -73.9776,
    bedrooms: 4,
    bathrooms: 4,
    area: 3500,
    yearBuilt: 2022,
    amenities: ['Wine Cellar', 'Private Elevator', 'Infinity Pool', 'Home Theater'],
    images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80'],
    thumbnail: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    ownerId: 'owner-2',
    views: 2840,
    favorites: 156,
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-20T15:30:00Z',
  },
  {
    id: '3',
    title: 'Garden Townhouse',
    description: 'Beautiful 3-story townhouse with private garden and modern amenities.',
    price: 750000,
    currency: 'USD',
    type: 'house',
    status: 'available',
    address: '789 Brooklyn Ave',
    city: 'New York',
    state: 'NY',
    postalCode: '11238',
    country: 'USA',
    latitude: 40.6754,
    longitude: -73.9776,
    bedrooms: 3,
    bathrooms: 2.5,
    area: 1800,
    yearBuilt: 1995,
    amenities: ['Garden', 'Patio', 'Garage', 'Fireplace'],
    images: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'],
    thumbnail: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    ownerId: 'owner-3',
    views: 945,
    favorites: 64,
    createdAt: '2024-01-18T10:00:00Z',
    updatedAt: '2024-01-20T15:30:00Z',
  },
]

export function FeaturedProperties() {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {FEATURED_PROPERTIES.map((property) => (
          <Link
            key={property.id}
            href={`/property/${property.id}`}
            className="transition-transform duration-300 hover:scale-105"
          >
            <PropertyCard property={property} />
          </Link>
        ))}
      </div>

      <div className="text-center">
        <Link
          href="/search"
          className="btn btn-outline px-8 py-3 font-semibold inline-flex"
        >
          View All Properties →
        </Link>
      </div>
    </div>
  )
}
