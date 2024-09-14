import React from 'react'

export default function DiscountOffer() {
  return (
    <div className='flex justify-between px-10 py-4 rounded-b-sm bg-purple-500 w-full'>
        <p className='text-base text-slate-50 font-bold'>
       "FREE delivery and a 40% discount on your next 3 orders! Place your 1st order within <span className='text-red-600'>7</span> days."
       </p>
       <p className='text-base text-slate-50 font-bold'>
       We deliver to you every day from <span className='text-yellow-500'>7:00 to 23:00</span>
       </p>
       
    </div>
  )
}
