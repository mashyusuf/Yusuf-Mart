import React from 'react';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../hooks/Loading';
import Error from '../../../hooks/Error';
import { FaHandPointRight } from "react-icons/fa6";

export default function SuperOffer() {
    const axiosPublic = useAxiosPublic();
    const { data: supperOffer = [], isLoading, isError } = useQuery({
        queryKey: ['superOffersProducts'],
        queryFn: async () => {
            try {
                const res = await axiosPublic('/superProducts');
                return res.data;
            } catch (err) {
                console.log('Error fetching products: ', err);
            }
        }
    });

    if (isLoading) {
        return <Loading />;
    }
    if (isError) {
        return <Error />;
    }

    return (
        <div className='max-w-7xl mx-auto'>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {supperOffer.map((product) => (
                    <div
                        key={product._id}
                        className="border p-4 gap-4 items-center rounded-lg shadow-md flex"
                    >
                        {/* Product Info */}
                        <div className="w-2/3 pl-4 relative space-y-4">
                            <div className="bg-yellow-100 items-center rounded-xl text-white px-2 py-1 absolute top-0 left-0 text-sm">
                                <span className='text-orange-900'>{product.special}</span>
                            </div>
                            {/* Product Name and Description */}
                            <div className="mb-2 pt-8">
                                <h3 className="text-xl font-bold">{product.name}</h3>
                                <p className="text-gray-600">{product.description}</p>
                            </div>
                            {/* Add to Cart Button */}
                            <button className="w-full border border-purple-600 text-purple-600 py-2 rounded-lg hover:bg-purple-700 hover:text-white transition duration-300 flex items-center justify-center gap-2">
                                <span>Shop Now</span>
                                <FaHandPointRight className="text-lg" />
                            </button>
                        </div>
                        {/* Product Image */}
                        <div className="w-1/3 flex items-center justify-center">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-40 h-40 object-cover"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
