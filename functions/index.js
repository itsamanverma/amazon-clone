const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const stripe = require("stripe")(functions.config().stripe.secret);

/* ~Firebase Admin Initialize~ */
// Initialize Firebase Admin SDK with default credentials
// This automatically uses the service account when deployed
// and uses Firebase emulator credentials in development
if (admin.apps.length === 0) {
  admin.initializeApp();
}

/* ~API~ */

/* ~App Config~ */
const app = express();

/* ~Middlewares~ */
app.use(cors({ origin: true }));
app.use(express.json());

/* ~API routes~ */
app.get('/', (request, response) => response.status(200).send('hello React'));

app.post('/payments/create', async (request, response) => {
    const total = request.query.total;

    console.log('Payment Request Received for the amount:', total);

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: total, /* subunits of the currency */
            currency: 'usd',
        });

        /* ok ~ created */
        response.status(201).send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        console.error('Payment creation error:', error);
        response.status(500).send({
            error: 'Payment creation failed'
        });
    }
})
/* ~Listen Command~ */
// Export with proper v4 Firebase Functions configuration
exports.api = functions
  .region('us-central1') // Specify region for consistency
  .https
  .onRequest(app);

/* http://localhost:5001/clone-9b0b1/us-central1/api */


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
