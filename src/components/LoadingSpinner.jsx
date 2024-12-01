import { Loader } from 'lucide-react'
import React from 'react'

export default function LoadingSpinner() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <Loader className='animate-spin h-16 w-16 text-blue-600'/>
      <p className='mt-4 text-lg font-semibold text-gray-700'>Loading...</p>
    </div>
  )
}
