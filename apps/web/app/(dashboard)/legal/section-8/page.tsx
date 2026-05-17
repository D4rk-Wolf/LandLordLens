export default function Section8Page() {
  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Section 8 notice wizard</h1>
        <p className="text-sm text-gray-500 mt-1">
          Generate a Section 8 notice for your tenancy
        </p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800">
        <strong>Legal disclaimer:</strong> This wizard generates a draft notice for reference only.
        Always seek qualified legal advice before serving a Section 8 notice. Incorrectly served
        notices can invalidate possession proceedings.
      </div>

      <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-lg">
        <p className="text-gray-500 font-medium">Section 8 wizard</p>
        <p className="text-sm text-gray-400 mt-1">
          Select a tenancy above to generate a notice. Coming in a future update.
        </p>
      </div>
    </div>
  )
}
