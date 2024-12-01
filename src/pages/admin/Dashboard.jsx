import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

export default function Dashboard() {
  return (
    <div className='grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      <Card>
        <CardHeader>
            <CardTitle>Total Seles</CardTitle>
        </CardHeader>
      </Card>
    </div>
  )
}
