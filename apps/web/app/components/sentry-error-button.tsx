'use client'
import * as Sentry from '@sentry/react'

export function ErrorButton() {
  return (
    <button
      onClick={() => {
        throw new Error('This is your first error!');
      }}
      className="flex items-center justify-between p-3 rounded-md border border-red-200 bg-red-50 hover:bg-red-100 text-sm font-medium text-red-700 w-full"
    >
      Break the world
      <span className="text-red-400">→</span>
    </button>
  );
}
