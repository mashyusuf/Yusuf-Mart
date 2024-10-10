import React from 'react'

import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';


export default function useAddToHeart() {
    const {user}=useAuth()
  const axiosSecure = useAxiosSecure();
  const {data:heartItem=[],isLoading,isError,refetch} = useQuery({
    queryKey:['heart',user?.email],
    queryFn: async()=>{
        const res = await axiosSecure.get(`/heartData?email=${user.email}`)
        return res.data;
    }
  })
  return [heartItem,refetch]
}
