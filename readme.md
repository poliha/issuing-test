# issuing-test

A sample script to test `incorrect_number` error when using stripe issuing cards to create a payment intent. 

## Usage

 - Clone the repo and run `yarn install`
 - Create a `.env` file with the following information. Replace the dummy data with actual data.
  ```
    STRIPE_TOKEN="sk_test_123" # your stripe account token 
    STRIPE_ACCOUNT_ID="acct_123" # stripe account ID. Needed if you are using stripe connect
    STRIPE_CARD_ID="ic_123" # issuing card id that you are testing
  ```
- run `node index.js` 

You should see this error in the logs `Error occured:  StripeCardError: Your card number is incorrect.`. 

**Note: When using the stripe test cards, it works as expected and doesn't return an error**