import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = 100*price;
    const publishableKey = 'pk_test_51JCdzFSAcZ1oOiFBL7mhOX9lwAwoqnV279qgGyIE6yoFHNhyI1Bfz81NyjhcWj2u8Sx6iewbfXnxJsctxdYVSpJk00FT6ARDrj'

    const onToken = token => {
        console.log(token);
        alert('Payment Successful');
    }

    return(
        <StripeCheckout 
            label = 'Pay Now' 
            name = 'CROWN CLOTHING Ltd.'
            billingAddress
            shippingAddress
            image = 'https://svgshare.com/i/CUz.svg'
            description = {`Your total is $${price}`}
            amount =  {priceForStripe}
            panelLabel = 'Pay Now'
            token = {onToken}
            stripeKey = {publishableKey}
        />
    );
};

export default StripeCheckoutButton;