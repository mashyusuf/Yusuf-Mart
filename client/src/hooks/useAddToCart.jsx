import React from 'react'
import useAxiosSecure from './useAxiosSecure'
import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';

export default function useAddToCart() {
    const {user}=useAuth()
  const axiosSecure = useAxiosSecure();
  const {data:cartItem=[],isLoading,isError,refetch} = useQuery({
    queryKey:['cart',user?.email],
    queryFn: async()=>{
        const res = await axiosSecure.get(`/cartData?email=${user.email}`)
        return res.data;
    }
  })
  return [cartItem,refetch]
}
