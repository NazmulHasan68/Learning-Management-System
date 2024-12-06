import SSLCommerzPayment from 'sslcommerz-lts';
import dotenv from 'dotenv';
import mongoose, { Mongoose } from 'mongoose';

dotenv.config();

const store_id = process.env.STORE_ID;
const store_passwd = process.env.STORE_PASSWORD;
const is_live = false; // Set to true in production

export const BuyProduct = async (req, res) => {
    const { courseId } = req.body;
    const userId = req.id;
    console.log(userId, courseId);
    

    const tran_id = new mongoose.Types.ObjectId().toString();
    const course = {
        coursePrice: 100,  
        courseTitle: 'Sample Course', 
    };

    const user = {
        name: 'Customer Name',
        email: 'customer@example.com',
        phone: '01711111111',
        address1: 'Dhaka',
        city: 'Dhaka',
        postcode: '1000',
    };

    const data = {
        total_amount: course.coursePrice,
        currency: 'BDT',
        tran_id,
        success_url: `http://localhost:8000/api/v1/payment/success/:${tran_id}`,  // Replace with actual success URL
        fail_url: 'http://localhost:3030/fail',  // Replace with actual fail URL
        cancel_url: 'http://localhost:3030/cancel',  // Replace with actual cancel URL
        ipn_url: 'http://localhost:3030/ipn',  // Replace with actual IPN URL
        shipping_method: 'Courier',
        product_name: course.courseTitle,
        product_category: 'Course',
        product_profile: 'general',
        cus_name: user.name,
        cus_email: user.email,
        cus_add1: user.address1,
        cus_add2: 'Dhaka',
        cus_city: user.city,
        cus_state: 'Dhaka',
        cus_postcode: user.postcode,
        cus_country: 'Bangladesh',
        cus_phone: user.phone,
        cus_fax: user.phone,
        ship_name: user.name,
        ship_add1: user.address1,
        ship_add2: 'Dhaka',
        ship_city: user.city,
        ship_state: 'Dhaka',
        ship_postcode: user.postcode,
        ship_country: 'Bangladesh',
    };

    try {
        const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);  
        const apiResponse = await sslcz.init(data);

        const GatewayPageURL = apiResponse.GatewayPageURL;
        if (GatewayPageURL) {
            return res.json({ GatewayPageURL });  // Send the GatewayPageURL to frontend
        } else {
            return res.status(400).json({ error: 'Failed to initialize payment' });
        }
    } catch (error) {
        console.error('SSLCommerz Init Error:', error);
        return res.status(500).json({ error: 'Payment initialization error' });
    }
};



export const HandlerSuccess = async (req, res) => {
    try {
        console.log("Payment successful!");

        // Redirect to the frontend page
        return res.redirect('http://localhost:5173');
    } catch (error) {
        console.error('Payment Success Error:', error);
        return res.status(500).json({ error: 'Payment Success error' });
    }
};
