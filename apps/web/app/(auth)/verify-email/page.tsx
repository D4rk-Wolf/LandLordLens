import Link from 'next/link'

export default function VerifyEmailPage() {
  return (
    <div className="text-center space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">Email verified</h2>
      <p className="text-gray-600 text-sm">
        Your email address has been verified. You can now sign in to your account.
      </p>
      <Link
        href="/sign-in"
        className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
      >
        Sign in
      </Link>
    </div>
  )
}
