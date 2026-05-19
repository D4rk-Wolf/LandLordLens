'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { trpc } from '@/lib/trpc/client'
import { Button, Input, Label } from '@landlordlens/ui'

interface PropertyFormProps {
  mode: 'create'
}

export function PropertyForm({ mode }: PropertyFormProps) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  const createProperty = trpc.properties.create.useMutation({
    onSuccess: (property) => {
      router.push(`/dashboard/properties/${property.id}`)
      router.refresh()
    },
    onError: (err) => setError(err.message),
  })

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    const fd = new FormData(e.currentTarget)

    createProperty.mutate({
      address: {
        line1: fd.get('line1') as string,
        line2: (fd.get('line2') as string) || undefined,
        city: fd.get('city') as string,
        county: (fd.get('county') as string) || undefined,
        postcode: fd.get('postcode') as string,
        country: 'United Kingdom',
      },
      propertyType: fd.get('propertyType') as 'house' | 'flat' | 'apartment' | 'bungalow' | 'other',
      bedrooms: parseInt(fd.get('bedrooms') as string, 10),
      bathrooms: parseInt(fd.get('bathrooms') as string, 10),
      rentAmount: (fd.get('rentAmount') as string) || undefined,
      region: fd.get('region') as 'england' | 'wales' | 'scotland' | 'northern_ireland',
      notes: (fd.get('notes') as string) || undefined,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
          {error}
        </p>
      )}

      <fieldset className="space-y-4">
        <legend className="text-sm font-semibold text-gray-700 border-b border-gray-200 pb-1 w-full">
          Address
        </legend>
        <div>
          <Label htmlFor="line1">Address line 1</Label>
          <Input id="line1" name="line1" required className="mt-1" placeholder="123 High Street" />
        </div>
        <div>
          <Label htmlFor="line2">Address line 2 (optional)</Label>
          <Input id="line2" name="line2" className="mt-1" placeholder="Flat 2" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="city">City / Town</Label>
            <Input id="city" name="city" required className="mt-1" placeholder="Manchester" />
          </div>
          <div>
            <Label htmlFor="county">County (optional)</Label>
            <Input id="county" name="county" className="mt-1" placeholder="Greater Manchester" />
          </div>
        </div>
        <div>
          <Label htmlFor="postcode">Postcode</Label>
          <Input id="postcode" name="postcode" required className="mt-1 max-w-[140px]" placeholder="M1 1AA" />
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="text-sm font-semibold text-gray-700 border-b border-gray-200 pb-1 w-full">
          Property details
        </legend>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="propertyType">Type</Label>
            <select
              id="propertyType"
              name="propertyType"
              defaultValue="house"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="house">House</option>
              <option value="flat">Flat</option>
              <option value="apartment">Apartment</option>
              <option value="bungalow">Bungalow</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <Label htmlFor="region">Region</Label>
            <select
              id="region"
              name="region"
              defaultValue="england"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="england">England</option>
              <option value="wales">Wales</option>
              <option value="scotland">Scotland</option>
              <option value="northern_ireland">Northern Ireland</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="bedrooms">Bedrooms</Label>
            <Input id="bedrooms" name="bedrooms" type="number" min="0" defaultValue="1" required className="mt-1" />
          </div>
          <div>
            <Label htmlFor="bathrooms">Bathrooms</Label>
            <Input id="bathrooms" name="bathrooms" type="number" min="0" defaultValue="1" required className="mt-1" />
          </div>
        </div>
        <div>
          <Label htmlFor="rentAmount">Monthly rent (£, optional)</Label>
          <Input id="rentAmount" name="rentAmount" type="number" min="0" step="0.01" className="mt-1 max-w-[180px]" placeholder="1200" />
        </div>
      </fieldset>

      <div>
        <Label htmlFor="notes">Notes (optional)</Label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
      </div>

      <Button type="submit" disabled={createProperty.isPending}>
        {createProperty.isPending ? 'Adding…' : 'Add property'}
      </Button>
    </form>
  )
}
