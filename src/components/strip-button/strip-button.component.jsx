import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton =({price}) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51IdeUEJ46KCciTHXrls8NPJb0XCuDkPl8fxRxhqY2EfN8uTlT95J1OXBFMjx0W7sOj2bepOJsAghVMYa6kzwOH6N00NrkkzIUB';

     const onToken = token => {
        console.log(token);
        alert('Payment Successful!');
    };

    return (
        <StripeCheckout 
        label='Pay Now'
        name='Crown Clothing Ltd.'
        billingAddress
        shippingAddress
        image='https://svgshare.com/i/CUz.svg'
        description={`Your total is $${price}`}
        amount={priceForStripe}
        panelLabel='Pay Now'
        token={onToken}
        stripeKey={publishableKey}
        />
    );
};

export default StripeCheckoutButton;