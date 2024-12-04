const SSLCommerz = require('sslcommerz');

const store_id = 'ecomm66fb4b9306086';
const store_password = 'ecomm66fb4b9306086@ssl';
const is_live = false; // Use false for sandbox testing

const sslcz = new SSLCommerz(store_id, store_password, is_live);

const transactionData = {
    total_amount: 100,
    currency: "BDT",
    tran_id: "unique_transaction_id",
    success_url: "http://yourwebsite.com/success",
    fail_url: "http://yourwebsite.com/fail",
    cancel_url: "http://yourwebsite.com/cancel",
    ipn_url: "http://yourwebsite.com/ipn",
    cus_name: "Test Customer",
    cus_email: "test@customer.com",
    cus_phone: "01711111111",
};

sslcz.init_transaction(transactionData).then(response => {
    if (response.status === 'SUCCESS') {
        console.log('Redirect to Payment Gateway:', response.GatewayPageURL);
    } else {
        console.error('Transaction Initialization Failed:', response);
    }
}).catch(error => {
    console.error('Error:', error);
});
