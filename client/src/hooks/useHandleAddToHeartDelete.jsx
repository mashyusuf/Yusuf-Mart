import { useMutation, useQueryClient } from '@tanstack/react-query'; // Import useQueryClient
import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';
import useAddToCart from './useAddToCart';
import Swal from 'sweetalert2';

export default function useHandleAddToHeartDelete() {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [, refetch] = useAddToCart();
    
    const queryClient = useQueryClient(); // Initialize queryClient

    const mutation = useMutation({
        mutationFn: async (id) => {
            await axiosSecure.delete(`/addToHeartDelete/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['heart', user?.email]); // Use queryClient to invalidate queries
        },
        onError: (error) => {
            console.error('Error deleting booking item:', error);
        },
    });

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to recover this booking!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Deleting...',
                    text: 'Please wait.',
                    icon: 'info',
                    showConfirmButton: false,
                    allowOutsideClick: false,
                });
                mutation.mutate(id);
                Swal.fire({
                    title: 'Deleted!',
                    text: 'Your booking has been deleted.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                });
                refetch(); // Refetch the data after deleting
            }
        });
    };

    return [handleDelete];
}
