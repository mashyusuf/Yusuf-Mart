import React, { useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import './from.css';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import { ImSpinner5 } from "react-icons/im";
import useAddToCart from '../../hooks/useAddToCart';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export default function CheckoutForm({ selectedPaymentMethod, cartItems, formData, product }) {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [clientSecret, setClientSecret] = useState("");
  const [cartItem, refetch] = useAddToCart(); // Refetch the cart after payment
  const [cardError, setCardError] = useState('');
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  // Calculate the total price
  const totalPrice = parseFloat(cartItems.reduce((sum, item) => sum + item.cart.price, 0)).toFixed(2);

  // Fetch clientSecret when total price is available
  useEffect(() => {
    if (totalPrice && totalPrice > 0) {
      getClientSecret({ price: totalPrice });
    }
  }, [totalPrice]);

  const getClientSecret = async price => {
    try {
      const { data } = await axiosSecure.post(`/create-payment-intent`, price);
      setClientSecret(data.clientSecret);
    } catch (error) {
      console.error('Error fetching client secret:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
        return;
    }

    const card = elements.getElement(CardElement);
    if (card == null) {
        return;
    }

    // Create Payment Method
    const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card,
    });

    if (error) {
        console.log('[error]', error);
        setCardError(error.message);
        setProcessing(false);
        Swal.fire({
            title: 'Payment Error 😞',
            text: error.message,
            icon: 'error',
            confirmButtonText: 'Try Again',
        });
        return;
    } else {
        setCardError('');
    }

    // Confirm Payment
    const { error: confirmError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
            payment_method: paymentMethod.id,
        });

    if (confirmError) {
        setCardError(confirmError.message);
        setProcessing(false);
        Swal.fire({
            title: 'Payment Error 😞',
            text: confirmError.message,
            icon: 'error',
            confirmButtonText: 'Try Again',
        });
        return;
    }

    if (paymentIntent.status === 'succeeded') {
        // Payment successful
        const paymentInfo = {
            email: user?.email,
            name: user?.displayName,
            transactionId: paymentIntent.id,
            date: new Date(),
            status: 'pending',
            cartItems: cartItems.map(item => ({
                _id: item.cart._id,
                name: item.cart.name,
                price: item.cart.price,
            })),
        };

        try {
            // Save payment information
            const res = await axiosSecure.post('/payment', paymentInfo);
            console.log('Payment saved successfully', res.data);

            // Now delete the cart items using email
            const deleteRes = await axiosSecure.delete('/cart', { data: { email: user?.email } });
            console.log('Cart items deleted successfully', deleteRes.data);

            // Show SweetAlert2 notification after both post and delete are successful
            Swal.fire({
                title: 'Payment Successful! 🎉',
                text: `Your order has been placed successfully!\nTransaction ID: ${paymentIntent.id}`,
                icon: 'success',
                confirmButtonText: 'Okay',
            }).then(() => {
            });
        } catch (error) {
            console.error('Error processing payment or deleting cart:', error);
            Swal.fire({
                title: 'Error 😞',
                text: 'There was an error processing your payment or updating your cart. Please try again.',
                icon: 'error',
                confirmButtonText: 'Okay',
            });
        }
    }

    setProcessing(false);
    navigate('/dashboard/payment-history');
    refetch(); 
    
};


  

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <div className="mt-6">
        <button
          disabled={!selectedPaymentMethod || !stripe || !clientSecret || processing}
          className={`w-full py-3 rounded text-white transition duration-300 ${
            selectedPaymentMethod ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          {processing ? (
            <ImSpinner5 className='size-8 animate-spin m-auto' />
          ) : (
            `Order Price: ${totalPrice}`
          )}
        </button>
      </div>
    </form>
  );
}
