import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';

export default function PaymentHistory() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: payments = [], isError, isLoading } = useQuery({
    queryKey: ['payment'],
    queryFn: async () => {
      const res = await axiosSecure(`/payment-history?email=${user.email}`); // Assuming user email is available
      return res.data;
    },
  });

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Total Payments: {payments.length}</h2>

      {/* Responsive table with horizontal scrolling for small devices */}
      <div className="overflow-x-scroll sm:overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead className="bg-purple-600 text-white">
            <tr>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Transaction ID</th>
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Total Items</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment._id} className="text-center">
                <td className="px-4 py-2 border">{payment.email}</td>
                <td className="px-4 py-2 border">{payment.transactionId}</td>
                <td className="px-4 py-2 border">{new Date(payment.date).toLocaleString()}</td>
                <td className="px-4 py-2 border">{payment.status}</td>
                <td className="px-4 py-2 border">{payment.cartItems.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
