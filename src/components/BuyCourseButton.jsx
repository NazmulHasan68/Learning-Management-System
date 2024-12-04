import React from 'react';
import { Button } from './ui/button';
import axios from 'axios';

export default function BuyCourseButton() {
  const handlerSSLcommerz = async () => {
    try {
      // Request the payment gateway URL from the backend
      const res = await axios.get('http://localhost:8000/api/v1/money', {
        headers: {
          "Content-Type": "application/json"
        }
      });
      
      const { GatewayPageURL } = res.data;

      // If the response contains the GatewayPageURL, redirect the browser
      if (GatewayPageURL) {
        window.location.href = GatewayPageURL; // Redirect to payment page
      } else {
        console.error('No GatewayPageURL in the response.');
      }
    } catch (error) {
      console.error('Error during payment request:', error.message);
    }
  };

  return (
    <Button onClick={handlerSSLcommerz} className="bg-slate-800 w-full hover:bg-slate-900 text-white rounded-xl">
      Purchase Course
    </Button>
  );
}
