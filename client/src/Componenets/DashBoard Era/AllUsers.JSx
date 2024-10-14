import React from 'react'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query';
export default function AllUsers() {
    const axiosSecure = useAxiosSecure();
    const {data:users=[]}=useQuery({
        queryKey:['users'],
        queryFn:async()=>{
            const res = await axiosSecure.get('/user',{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('access-token')}`
                }
            })
            return res.data;
        }
    })
    //----user---
    co
  return (
    <div>
        All User Admin , Vendor , Customer------------------
    </div>
  )
}
