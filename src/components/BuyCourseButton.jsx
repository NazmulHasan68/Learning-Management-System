import React, { useEffect } from 'react';
import axios from 'axios';
import { useCreateCheckOutSessionMutation } from '@/features/api/purchaseApi';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const PaymentButton = ({courseId}) => {

  const [createCheckOutSession, {data, isLoading, isError, isSuccess, error}] = useCreateCheckOutSessionMutation()

useEffect(()=>{
    if(isError){
        toast.error(error?.data?.message || "Failed to create cheack out")
    }
},[data, isSuccess, isError, error])
  const handlePayment = async () => {
    try {
        const response = await createCheckOutSession({courseId}).unwrap();
        const { GatewayPageURL } = response;

        if (GatewayPageURL) {
            window.location.href = GatewayPageURL;
        } else {
            console.error('Payment gateway URL is missing in the response.');
        }
    } catch (error) {
        console.error('Error during payment request:', error.message);
    }
};



    return (
        <button
            disabled={isLoading}
            onClick={handlePayment}
            className="w-full bg-gray-800 hover:bg-gray-900 text-white rounded-xl p-2"
        >
           {
            isLoading ? (
                <div className='flex justify-center items-center '>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin '/> Please wait
                </div>
            ): "Purchase Course"
           }
        </button>
    );
};

export default PaymentButton;








// const handlePayment = async () => {
//     try {
//         const response = await axios.post(
//             'http://localhost:8000/api/v1/payment',
//             {courseId},
//             {
//                 headers: {
//                    'Content-Type': 'application/json',
//                 },
//                 withCredentials: true,
//             }
//         );

//         const { GatewayPageURL } = response.data;  // Get the payment URL from the response

//         if (GatewayPageURL) {
//             // Redirect to the payment gateway
//             window.location.href = GatewayPageURL;
//         } else {
//             console.error('No GatewayPageURL in the response.');
//         }
//     } catch (error) {
//         console.error('Error during payment request:', error.message);
//     }
// };
