import React from 'react'
import { FaCreditCard } from 'react-icons/fa'
import { GiSlashedShield } from 'react-icons/gi'

export default function PaymentAndWarannty() {
  return (
    <div className="mt-8 text-center lg:text-left">
            <div className="flex flex-col items-center lg:items-start">
              <h3 className="text-base  flex items-center font-bold mb-4">
                <FaCreditCard className="text-green-600 mr-2" /> Payment
              </h3>

              <div className="flex flex-col space-y-2">
                <span className="flex items-center">
                  <span className="mr-2">•</span> Payment upon receipt of goods
                </span>
                <span className="flex items-center">
                  <span className="mr-2">•</span> Payment by card in the
                  department
                </span>
                <span className="flex items-center">
                  <span className="mr-2">•</span> Google Pay
                </span>
                <span className="flex items-center">
                  <span className="mr-2">•</span> Online Card - 5% discount in
                  case of payment
                </span>
              </div>

              <h3 className="text-base flex items-center font-bold mt-4 mb-2">
                <GiSlashedShield className="text-gray-700 mr-2" />
                Warranty
              </h3>
              <p className="text-sm text-gray-600 text-center lg:text-left">
                The Consumer Protection Act does not provide for the return of
                this product of proper quality.
              </p>
            </div>
          </div>
  )
}
