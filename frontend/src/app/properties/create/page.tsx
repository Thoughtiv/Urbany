"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { apiClient } from '@/lib/api-client'
import { MapLibreProvider, useMapLibre } from '@/components/maps/MapLibreProvider'
import { useToast } from '@/components/providers/ToastProvider'

function MapPicker({ lat, lng, onChange }: { lat?: number; lng?: number; onChange: (lat: number, lng: number) => void }) {
  const { map } = useMapLibre()

  useEffect(() => {
    if (!map) return

    const handleClick = (e: any) => {
      const { lngLat } = e
      onChange(lngLat.lat, lngLat.lng)
    }

    map.on('click', handleClick)
    return () => {
      map.off('click', handleClick)
    }
  }, [map, onChange])

  return null
}

export default function CreatePropertyPage() {
  const router = useRouter()
  const { addToast } = useToast()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState<number | ''>('')
  const [type, setType] = useState('apartment')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [country, setCountry] = useState('')
  const [latitude, setLatitude] = useState<number | null>(null)
  const [longitude, setLongitude] = useState<number | null>(null)
  const [bedrooms, setBedrooms] = useState<number | ''>('')
  const [bathrooms, setBathrooms] = useState<number | ''>('')
  const [areaSquareFeet, setAreaSquareFeet] = useState<number | ''>('')
  const [yearBuilt, setYearBuilt] = useState<number | ''>('')
  const [features, setFeatures] = useState('')
  const [amenityInput, setAmenityInput] = useState('')
  const [amenities, setAmenities] = useState<string[]>([])
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})

  const addAmenity = () => {
    const v = amenityInput.trim()
    if (!v) return
    setAmenities((s) => Array.from(new Set([...s, v])))
    setAmenityInput('')
  }

  const removeAmenity = (a: string) => setAmenities((s) => s.filter((x) => x !== a))

  const addImageUrl = () => {
    const u = window.prompt('Image URL')
    if (u) setImageUrls((s) => [...s, u])
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (!title || !description || !price || latitude == null || longitude == null) {
      addToast('Please fill required fields and pick a location on the map', 'error')
      return
    }

    setIsSubmitting(true)
    try {
      const payload: Record<string, unknown> = {
        title,
        description,
        price: Number(price),
        type,
        address,
        city,
        state,
        postalCode,
        country,
        latitude,
        longitude,
        bedrooms: bedrooms === '' ? 0 : Number(bedrooms),
        bathrooms: bathrooms === '' ? 0 : Number(bathrooms),
        areaSquareFeet: areaSquareFeet === '' ? 0 : Number(areaSquareFeet),
        yearBuilt: yearBuilt === '' ? 0 : Number(yearBuilt),
        features,
        amenities,
      }

      const created = await apiClient.createProperty(payload)
      // Add provided image URLs
      for (const url of imageUrls) {
        try {
          await apiClient.addPropertyImage(created.id, url, false)
        } catch (err) {
          console.warn('Failed to add image', url, err)
        }
      }

      addToast('Property created successfully', 'success')
      router.push(`/property/${created.id}`)
    } catch (err: any) {
      console.error(err)
      const serverData = (err as any)?.responseData

      if (serverData?.message && typeof serverData.message === 'object') {
        if (Array.isArray(serverData.message)) {
          addToast(serverData.message.join(', '), 'error')
        } else {
          setValidationErrors(serverData.message as Record<string, string>)
          addToast('Please fix the highlighted fields', 'error')
        }
      } else {
        addToast(err?.message || 'Failed to create property', 'error')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Create Property Listing</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {Object.keys(validationErrors).length > 0 && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
            <p className="font-semibold mb-1">Please fix the following errors:</p>
            <ul className="list-disc ml-5">
              {Object.entries(validationErrors).map(([k, v]) => (
                <li key={k}>{v}</li>
              ))}
            </ul>
          </div>
        )}
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-3 border rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-3 border rounded h-28" />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Price</label>
            <input type="number" value={price as any} onChange={(e) => setPrice(e.target.value === '' ? '' : Number(e.target.value))} className="w-full p-3 border rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Type</label>
            <select value={type} onChange={(e) => setType(e.target.value)} className="w-full p-3 border rounded">
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="land">Land</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Year Built</label>
            <input type="number" value={yearBuilt as any} onChange={(e) => setYearBuilt(e.target.value === '' ? '' : Number(e.target.value))} className="w-full p-3 border rounded" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            <input value={address} onChange={(e) => setAddress(e.target.value)} className="w-full p-3 border rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">City</label>
            <input value={city} onChange={(e) => setCity(e.target.value)} className="w-full p-3 border rounded" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <input value={state} onChange={(e) => setState(e.target.value)} placeholder="State" className="p-3 border rounded" />
          <input value={postalCode} onChange={(e) => setPostalCode(e.target.value)} placeholder="Postal Code" className="p-3 border rounded" />
          <input value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Country" className="p-3 border rounded" />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <input value={bedrooms as any} onChange={(e) => setBedrooms(e.target.value === '' ? '' : Number(e.target.value))} placeholder="Bedrooms" className="p-3 border rounded" />
          <input value={bathrooms as any} onChange={(e) => setBathrooms(e.target.value === '' ? '' : Number(e.target.value))} placeholder="Bathrooms" className="p-3 border rounded" />
          <input value={areaSquareFeet as any} onChange={(e) => setAreaSquareFeet(e.target.value === '' ? '' : Number(e.target.value))} placeholder="Area (sqft)" className="p-3 border rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Features (comma separated)</label>
          <input value={features} onChange={(e) => setFeatures(e.target.value)} className="w-full p-3 border rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Amenities</label>
          <div className="flex gap-2 mb-2">
            <input value={amenityInput} onChange={(e) => setAmenityInput(e.target.value)} className="p-2 border rounded flex-1" />
            <button type="button" onClick={addAmenity} className="px-4 py-2 bg-primary-600 text-white rounded">Add</button>
          </div>
          <div className="flex gap-2 flex-wrap">
            {amenities.map((a) => (
              <div key={a} className="px-3 py-1 bg-gray-100 rounded-full flex items-center gap-2">
                <span>{a}</span>
                <button type="button" onClick={() => removeAmenity(a)} className="text-red-500">x</button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Images (add by URL)</label>
          <div className="flex gap-2 mb-2">
            <button type="button" onClick={addImageUrl} className="px-4 py-2 bg-primary-600 text-white rounded">Add Image URL</button>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {imageUrls.map((u, i) => (
              <div key={i} className="border rounded overflow-hidden">
                <img src={u} alt={`img-${i}`} className="w-full h-28 object-cover" />
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Pick location on map (click on map)</label>
          <div style={{ height: 400 }} className="border rounded overflow-hidden">
            <MapLibreProvider center={longitude && latitude ? [longitude, latitude] : undefined}>
              <MapPicker
                lat={latitude ?? undefined}
                lng={longitude ?? undefined}
                onChange={(lat, lng) => {
                  setLatitude(lat)
                  setLongitude(lng)
                }}
              />
            </MapLibreProvider>
          </div>
          <div className="mt-2 text-sm text-gray-600">Latitude: {latitude ?? 'not set'} • Longitude: {longitude ?? 'not set'}</div>
        </div>

        <div>
          <button type="submit" disabled={isSubmitting} className="px-6 py-3 bg-primary-600 text-white rounded">
            {isSubmitting ? 'Creating...' : 'Create Property'}
          </button>
        </div>
      </form>
    </div>
  )
}
