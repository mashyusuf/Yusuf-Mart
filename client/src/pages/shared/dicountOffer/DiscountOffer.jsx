import React from 'react';
import { useTypewriter } from 'react-simple-typewriter';

export default function DiscountOffer() {
  const [text] = useTypewriter({
    words: ['FREE delivery and a 40% discount on your next 3 orders! Place your 1st order within 7 days.'],
    loop: 0, // No loop
    delaySpeed: 2000, // Delay between words
    typeSpeed: 80, // Typing speed
    deleteSpeed: 50, // Deleting speed
  });

  return (
    <div className='flex justify-between items-center px-10 py-4 rounded-b-sm bg-purple-500 w-full'>
      <p className='text-base text-slate-50 font-bold'>
        <span>{text}</span>
      </p>
      <p className='text-base text-slate-50 font-bold'>
        We deliver to you every day from <span className='text-yellow-500'>7:00 to 23:00</span>
      </p>
    </div>
  );
}
