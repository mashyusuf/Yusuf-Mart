import React from 'react'
import img1 from '../../../assets/1.png'
import img2 from '../../../assets/2.png'
import img3 from '../../../assets/3.png'
import img4 from '../../../assets/4.png'
export default function DetailsCard() {
  return (
    <div className='mt-5 mb-5'>
        <div className='grid md:flex md:grid-cols-3 container mx-auto gap-2 justify-center space-y-'>
        <div className='flex items-center space-x-2  border-purple-400 rounded-md border px-2 py-6 shadow-md'>
            <div>
                <img src={img1} alt="" />
            </div>
            <div className=''>
                <h1 className='text-xl font-bold'>Payment only online</h1>
                <p className='text-sm text-gray-500'>Tasigförsamhet beteende Mobile <br />
                checkout. Ylig kärrtorpa.</p>
            </div>
        </div>
        <div className='flex items-center space-x-2 border-purple-400 rounded-md border px-2 py-6 shadow-md'>
            <div>
                <img src={img2} alt="" />
            </div>
            <div className=''>
                <h1 className='text-xl font-bold'>New stocks and sales</h1>
                <p className='text-sm text-gray-500'>Tasigförsamhet beteende Mobile <br />
                checkout. Ylig kärrtorpa.</p>
            </div>
        </div>
        <div className='flex items-center space-x-2 border-purple-400 rounded-md border px-2 py-6 shadow-md'>
            <div>
                <img src={img3} alt="" />
            </div>
            <div className=''>
                <h1 className='text-xl font-bold'>assurance</h1>
                <p className='text-sm text-gray-500'>Tasigförsamhet beteende Mobile <br />
                checkout. Ylig kärrtorpa.</p>
            </div>
        </div>
        <div className='flex items-center space-x-2 border-purple-400  rounded-md border px-2 py-6 shadow-md'>
            <div>
                <img src={img4} alt="" />
            </div>
            <div className=''>
                <h1 className='text-xl font-bold'>Delivery from 1 hour</h1>
                <p className='text-sm text-gray-500'>Tasigförsamhet beteended Mobile <br />
                checkout. Ylig kärrtorpa.</p>
            </div>
        </div>
        </div>

    </div>
  )
}
