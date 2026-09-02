'use client'

import Link from 'next/link'
import { ArrowRight, Heart, MapPin } from 'lucide-react'
import { Property } from '@/types'
import { formatCurrency } from '@/lib/utils'

const MATCHED_PROPERTIES: Array<Property & { matchScore: number; investmentYield: number; locationTag: string }> = [
  {
    id: '1',
    title: 'Skyline Heights',
    description: 'Luxury apartments with premium amenities in a top growth location.',
    price: 9500000,
    currency: 'INR',
    type: 'apartment',
    status: 'available',
    address: 'Financial District',
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
    amenities: ['Pool', 'Gym', 'Clubhouse'],
    images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80'],
    thumbnail: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    ownerId: 'owner-1',
    views: 1400,
    favorites: 120,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-03-12T08:00:00Z',
    matchScore: 92,
    investmentYield: 4.6,
    locationTag: 'Financial District',
  },
  {
    id: '2',
    title: 'Green Valley Residences',
    description: 'Exclusive gated community near top schools and transit corridors.',
    price: 8500000,
    currency: 'INR',
    type: 'apartment',
    status: 'available',
    address: 'Gachibowli',
    city: 'Hyderabad',
    state: 'Telangana',
    postalCode: '500032',
    country: 'India',
    latitude: 17.4328,
    longitude: 78.3849,
    bedrooms: 3,
    bathrooms: 3,
    area: 1500,
    yearBuilt: 2024,
    amenities: ['Garden', 'Security', 'Parking'],
    images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80'],
    thumbnail: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    ownerId: 'owner-2',
    views: 1080,
    favorites: 98,
    createdAt: '2024-02-01T09:00:00Z',
    updatedAt: '2024-03-18T11:45:00Z',
    matchScore: 89,
    investmentYield: 4.2,
    locationTag: 'Gachibowli',
  },
  {
    id: '3',
    title: 'Elite Crest',
    description: 'Modern residences with exceptional connectivity and premium finishes.',
    price: 12000000,
    currency: 'INR',
    type: 'apartment',
    status: 'available',
    address: 'Kokapet',
    city: 'Hyderabad',
    state: 'Telangana',
    postalCode: '500075',
    country: 'India',
    latitude: 17.3569,
    longitude: 78.3999,
    bedrooms: 4,
    bathrooms: 4,
    area: 2000,
    yearBuilt: 2023,
    amenities: ['Private Lift', 'Cinema', 'Infinity Pool'],
    images: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'],
    thumbnail: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    ownerId: 'owner-3',
    views: 1680,
    favorites: 145,
    createdAt: '2024-01-18T10:00:00Z',
    updatedAt: '2024-03-25T13:30:00Z',
    matchScore: 91,
    investmentYield: 4.8,
    locationTag: 'Kokapet',
  },
]

export function TopPropertyMatches() {
  return (
    <section className="py-16 bg-slate-50">
      <div className="container">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-8">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-sky-600">Top Property Matches</p>
            <h2 className="h2 mt-3 text-slate-900">Curated matches for your budget and lifestyle</h2>
          </div>
          <Link href="/search" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-slate-900">
            View all matches
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {MATCHED_PROPERTIES.map((property) => (
            <Link key={property.id} href={`/property/${property.id}`} className="group block overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-lg transition hover:-translate-y-1 hover:shadow-2xl">
              <div className="relative h-72 overflow-hidden">
                <img src={property.thumbnail} alt={property.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-x-0 top-4 flex items-center justify-between px-4">
                  <span className="rounded-full bg-sky-600/95 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                    {property.matchScore}% Match
                  </span>
                  <span className="rounded-full bg-white/90 px-3 py-2 text-xs font-semibold text-slate-900">
                    {property.locationTag}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between gap-4 mb-3 text-sm text-slate-500">
                  <span>{property.bedrooms} Beds</span>
                  <span>{property.bathrooms} Baths</span>
                  <span>{Math.round(property.area / 1000)}k sqft</span>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{property.title}</h3>
                <p className="text-sm leading-relaxed text-slate-600 mb-6">{property.description}</p>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-lg font-semibold text-slate-900">{formatCurrency(property.price, property.currency)}</p>
                    <p className="text-sm text-slate-500">Investment yield {property.investmentYield}%</p>
                  </div>
                  <button className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-700">
                    <Heart className="h-4 w-4" /> Save
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
