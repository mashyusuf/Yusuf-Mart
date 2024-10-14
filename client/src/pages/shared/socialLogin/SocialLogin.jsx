import React from 'react';
import { FcGoogle } from 'react-icons/fc'; 
import useAuth from '../../../hooks/useAuth';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';

export default function SocialLogin() {
    const { googleSignIn } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const location = useLocation();

    const handleGoogleLogin = () => {
        googleSignIn()
            .then((result) => {
                const user = result.user; 
                const userinfo = {
                    name: user.displayName, 
                    email: user.email, 
                    role: 'user', 
                };
    
                return axiosPublic.post('/user', userinfo);
            })
            .then((res) => {
                console.log(res.data); // Check the response data
    
                if (res.data.insertedId) {
                    // User was newly registered
                    Swal.fire({
                        title: 'Registration Successful!',
                        text: 'Your account has been created successfully.',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1500,
                        showClass: {
                            popup: `animate__animated animate__fadeInUp animate__faster`,
                        },
                        hideClass: {
                            popup: `animate__animated animate__fadeOutDown animate__faster`,
                        },
                    }).then(() => {
                        navigate('/'); // Navigate to home after SweetAlert closes
                    });
                } else if (res.data.exists) {
                    // User already exists
                    Swal.fire({
                        title: 'Welcome Back!',
                        text: 'You are already registered. Redirecting to home...',
                        icon: 'info',
                        showConfirmButton: false,
                        timer: 1500,
                        showClass: {
                            popup: `animate__animated animate__fadeInUp animate__faster`,
                        },
                        hideClass: {
                            popup: `animate__animated animate__fadeOutDown animate__faster`,
                        },
                    }).then(() => {
                        navigate('/'); // Navigate to home after SweetAlert closes
                    });
                }
            })
            .catch(error => {
                console.error('Google sign-in error:', error); // Handle any errors
                Swal.fire({
                    title: 'Error',
                    text: 'An error occurred during login. Please try again.',
                    icon: 'error',
                });
            });
    };
    
    return (
        <div className="flex justify-center mt-4">
            <button onClick={handleGoogleLogin}
                className="flex items-center justify-center w-full max-w-sm p-3 border-2 border-purple-600 rounded-lg hover:bg-purple-600 hover:text-white transition-all duration-300"
            >
                <FcGoogle className="mr-2 text-2xl" /> {/* Google icon */}
                <span className="text-md font-bold">Continue with Google</span> 
            </button>
        </div>
    );
}
