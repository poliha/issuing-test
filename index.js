require('dotenv').config();
const {STRIPE_TOKEN, STRIPE_ACCOUNT_ID, STRIPE_CARD_ID} = process.env;

const stripe = require('stripe')(STRIPE_TOKEN);

const run = async () => {
  try {
    const cardDetails = await stripe.issuing.cards.retrieve(STRIPE_CARD_ID, {
      expand: ['number', 'cvc'],
    }, {
      ...(STRIPE_ACCOUNT_ID && {stripeAccount: STRIPE_ACCOUNT_ID})
    });


    const paymentMethod = await stripe.paymentMethods.create({
      type: 'card',
      card: {
        // Note using a test card works as expected
        // number: '4242424242424242',
        // exp_month: '06',
        // exp_year: '2024',
        number: cardDetails.number,
        exp_month: cardDetails.exp_month,
        exp_year: cardDetails.exp_year,
      },
    });

    const paymentIntent = await stripe.paymentIntents.create({
      payment_method: paymentMethod.id,
      amount: 2000,
      currency: 'usd',
      payment_method_types: ['card'],
      capture_method: 'automatic',
      confirm: true,
      statement_descriptor: 'Hoppier Test'
    });

    console.log('paymentIntent: ', paymentIntent);

  } catch (error) {
    console.error('Error occured: ', error)
  }
}

run();