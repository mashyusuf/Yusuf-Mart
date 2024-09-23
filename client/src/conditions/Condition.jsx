//For Practice --------------
import React, { useState } from 'react';
export default function Condition() {
  const [login, setLogin] = useState(); // ডিফল্ট স্টেট হিসেবে ৩ সেট করা হয়েছে

  return (
    <div> 
      {login === 1 ? (
        <h1>Hieeeeeee Bby I am Login Now, True is Now</h1> 
      ) : login === 2 ? (
        <h1>Sorry Guys, Go and Login Now, Yoooooooooo:</h1> 
      ) : (
        <h1>Your 3rd Baby</h1> // ডিফল্ট কন্ডিশন
      )}
      
      {/* প্রথম বাটন: যখন ক্লিক করা হবে তখন ১ম কন্ডিশন দেখাবে */}
      <button className='btn btn-success btn-outline' onClick={() => setLogin(1)}>Show Condition 1</button>
      
      {/* দ্বিতীয় বাটন: যখন ক্লিক করা হবে তখন ২য় কন্ডিশন দেখাবে */}
      <button className='btn btn-success btn-outline' onClick={() => setLogin(2)}>Show Condition 2</button>

      {/* রিফ্রেশ বাটন: যখন ক্লিক করা হবে তখন ডিফল্ট (৩য়) কন্ডিশন দেখাবে */}
      <button className='btn btn-success btn-outline' onClick={() => setLogin(3)}>Refresh</button>
    </div>
  );
}
