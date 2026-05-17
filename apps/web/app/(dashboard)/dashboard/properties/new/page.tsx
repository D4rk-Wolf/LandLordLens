import { PropertyForm } from '@/app/components/properties/property-form'

export default function NewPropertyPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Add property</h1>
        <p className="text-sm text-gray-500 mt-1">Enter the details of your property</p>
      </div>
      <PropertyForm mode="create" />
    </div>
  )
}
