import SSLCommerzPayment from 'sslcommerz-lts';
import dotenv from 'dotenv';

dotenv.config();

const store_id = process.env.STORE_ID;
const store_passwd = process.env.STORE_PASSWORD;
const is_live = false;  // Set to true in live mode

export const purchaseCourse = async (req, res) => {
    try {
        const data = {
            total_amount: 100, // Amount to be charged
            currency: 'BDT', 
            tran_id: `REF${Date.now()}`, // Use a unique transaction ID
            success_url: 'http://localhost:3030/success',
            fail_url: 'http://localhost:3030/fail',
            cancel_url: 'http://localhost:3030/cancel',
            ipn_url: 'http://localhost:3030/ipn',
            shipping_method: 'Courier',
            product_name: 'Computer',
            product_category: 'Electronic',
            product_profile: 'general',
            cus_name: 'Customer Name',
            cus_email: 'customer@example.com',
            cus_add1: 'Dhaka',
            cus_add2: 'Dhaka',
            cus_city: 'Dhaka',
            cus_state: 'Dhaka',
            cus_postcode: '1000',
            cus_country: 'Bangladesh',
            cus_phone: '01711111111',
            cus_fax: '01711111111',
            ship_name: 'Customer Name',
            ship_add1: 'Dhaka',
            ship_add2: 'Dhaka',
            ship_city: 'Dhaka',
            ship_state: 'Dhaka',
            ship_postcode: '1000',
            ship_country: 'Bangladesh',
        };

        const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
        
        sslcz.init(data).then(apiResponse => {
            const GatewayPageURL = apiResponse.GatewayPageURL;
            if (GatewayPageURL) {
                console.log('Redirecting to:', GatewayPageURL);
                return res.json({ GatewayPageURL }); // Send GatewayPageURL to frontend
            } else {
                console.error('Failed to get GatewayPageURL:', apiResponse);
                return res.status(400).json({ error: 'Failed to initialize payment' });
            }
        }).catch(error => {
            console.error('SSLCommerz API Error:', error);
            return res.status(500).json({ error: 'Payment initialization error' });
        });
    } catch (error) {
        console.error('Server Error:', error);
        return res.status(500).json({ message: 'Failed to connect to SSLCommerz' });
    }
};
