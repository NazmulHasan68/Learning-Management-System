import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PaymentButton = () => {
  const params = useParams()
  const courseId = params.courseId;
  console.log(courseId);
  

    const handlePayment = async () => {
        try {
            const response = await axios.post(
                'http://localhost:8000/api/v1/payment',
                {courseId},
                {
                    headers: {
                       'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }
            );

            const { GatewayPageURL } = response.data;  // Get the payment URL from the response

            if (GatewayPageURL) {
                // Redirect to the payment gateway
                window.location.href = GatewayPageURL;
            } else {
                console.error('No GatewayPageURL in the response.');
            }
        } catch (error) {
            console.error('Error during payment request:', error.message);
        }
    };
    

    return (
        <button
            onClick={handlePayment}
            className="w-full bg-gray-800 hover:bg-gray-900 text-white rounded-xl p-2"
        >
            Pay for Course
        </button>
    );
};

export default PaymentButton;
