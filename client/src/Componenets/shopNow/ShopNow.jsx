import React from 'react';
import { useParams } from 'react-router-dom';  // Import useParams to get the dynamic route param
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../hooks/Loading';
import Error from '../../hooks/Error';

export default function ShopNow() {
    const { id } = useParams();  // Get the 'id' from the URL
    const axiosSecure = useAxiosSecure();
    const { data: showNow = [], isError, isLoading } = useQuery({
        queryKey: ['shop', id],  // Use 'id' in the queryKey
        queryFn: async () => {
            const res = await axiosSecure.get(`/allProducts/${id}`);  // Fetch data based on the 'id'
            return res.data;
        },
    });

    if (isLoading) return <Loading />;
    if (isError) return  <Error /> ;

    return (
        <div>
            ShopNow: {showNow.name}
        </div>
    );
}
