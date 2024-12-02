import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

export default function EditLecture() {
  return (
    <div className='flex items-center justify-between mb-5'>
      <div className='flex items-center gap-2'>
        <Link>
            <Button className="rounded-full w-10 h-10">
                <ArrowLeft size={16}/>
            </Button>
        </Link>
      </div>
    </div>
  )
}
