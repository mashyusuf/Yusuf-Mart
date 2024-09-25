import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import Loading from '../../../hooks/Loading';
import Error from '../../../hooks/Error';
import { FaStar, FaChevronDown, FaChevronUp } from 'react-icons/fa'; // For rating stars and buttons

export default function Reviews() {
    const axiosPublic = useAxiosPublic();
    const { data: reviews = [], isError, isLoading } = useQuery({
        queryKey: ['reviewsData'],
        queryFn: async () => {
            try {
                const res = await axiosPublic('/reviews');
                return res.data;
            } catch (err) {
                console.log('Error from Review', err);
            }
        }
    });

    const [showAll, setShowAll] = useState(false); // State to toggle between showing all reviews or only 5

    const toggleView = () => {
        setShowAll(!showAll); // Toggle between true and false
    };

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return <Error />;
    }

    // Conditionally show either 5 reviews or all of them
    const displayedReviews = showAll ? reviews : reviews.slice(0, 5);

    return (
        <div className="p-6">
            <div className="md:flex text-center md:ml-4 items-center gap-2">
                <h1 className="text-xl font-bold text-black mb-1">Popular Companies</h1>
                <p className="text-sm text-gray-500">
                    Some of the new products arriving this week
                </p>
            </div>
            {/* Flexbox for lg, Grid for md, sm */} 
            <div className="lg:flex grid grid-cols-2 lg:flex-wrap lg:justify-center">
                {displayedReviews.map((review) => (
                    <div 
                        key={review._id} 
                        className="lg:w-1/5 md:w-1/4 sm:w-1/2 w-full p-4">
                        <div className="bg-white shadow-lg rounded-lg p-6">
                            <img
                                src={review.avatar}
                                alt={review.user}
                                className="w-16 h-16 rounded-full mx-auto mb-4"
                            />
                            <h2 className="text-xl font-semibold text-center">{review.user}</h2>
                            <div className="flex justify-center items-center my-2">
                                <FaStar className="text-yellow-400" /> 
                                <span className="ml-1">{review.rating} / 5</span>
                            </div>
                            {/* Limit review text to first 6 words */}
                            <p className="text-gray-600 text-center mb-4">
                                {review.review.split(' ').slice(0, 6).join(' ')}...
                            </p>
                            <p className="text-center text-sm text-gray-500 font-semibold">
                                Type: <span className="text-blue-600">{review.type}</span>
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* View All / View Less Button with Icons */}
            <div className="flex justify-end mt-4 mr-2">
                <button
                    onClick={toggleView}
                    className="flex items-center justify-center gap-2 border border-purple-600 text-purple-600 bg-white hover:bg-purple-600 hover:text-white px-4 py-2 rounded transition duration-200"
                >
                    {showAll ? (
                        <>
                            View Less <FaChevronUp />
                        </>
                    ) : (
                        <>
                            View All <FaChevronDown />
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
