const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const { request, response } = require('express');
const stripe = require("stripe")('sk_test_51HQbdZAxFXfllBdK9RPWU7gGqaehCqARq2ezR6RR40DsYVtPdStTmSYxI4sh8VKuejS0ecf4jdVuPp3Jnp6qukZ200brIw0CiV');

/* ~API~ */

/* ~App Config~ */
const app = express();

/* ~Middlewares~ */
app.use(cors({ origin: true }));
app.use(express.json());

/* ~API routes~ */
app.get('/',(request, response) => response.status(200).send('hello React'));

app.post('/payments/create', async( request, response) => {
    const total = request.query.total;

    console.log('paymment Request Recieved for the amount !!', total);

    const paymentIntent = await stripe.paymentIntent.create({
        amount: total, /* subunits of the currency */
        currency: 'usd',
    });

    /* ok ~ created */
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    })
})
/* ~Listen Command~ */
exports.api = functions.https.onRequest(app);

/* http://localhost:5001/clone-9b0b1/us-central1/api */


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
