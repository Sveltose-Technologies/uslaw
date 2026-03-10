const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Payment = require("../models/payment.model");

//  Create Payment Intent
exports.createPaymentIntent = async (req, res) => {
  try {
    const { amount, userId } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });

    const payment = await Payment.create({
      userId,
      amount,
      currency: "usd",
      paymentIntentId: paymentIntent.id,
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentId: payment._id,
    });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//  Verify Payment
exports.verifyPayment = async (req, res) => {
  try {
    let { paymentIntentId } = req.body;

    // Safety: remove _secret if mistakenly sent
    if (paymentIntentId.includes("_secret")) {
      paymentIntentId = paymentIntentId.split("_secret")[0];
    }

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === "succeeded") {
      await Payment.findOneAndUpdate(
        { paymentIntentId },
        { status: "success" }
      );
    }

    res.status(200).json({
      success: true,
      message: "Payment verified successfully",
      data: paymentIntent,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//  Get All Payments
exports.getAllPayments = async (req, res) => {
  const payments = await Payment.find();
  res.json(payments);
};


//  Get Single Payment
exports.getSinglePayment = async (req, res) => {
  const payment = await Payment.findById(req.params.id);
  res.json(payment);
};


//  Refund Payment
exports.refundPayment = async (req, res) => {
  try {
    const { paymentIntentId } = req.body;

    const refund = await stripe.refunds.create({
      payment_intent: paymentIntentId,
    });

    await Payment.findOneAndUpdate(
      { paymentIntentId },
      { status: "refunded" }
    );

    res.json(refund);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Create Subscription
exports.createSubscription = async (req, res) => {
  try {
    const { customerId, priceId } = req.body;

    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      payment_behavior: "default_incomplete",
      expand: ["latest_invoice.payment_intent"],
    });

    res.json(subscription);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// 8️⃣ Stripe Webhook
exports.webhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object;

    await Payment.findOneAndUpdate(
      { paymentIntentId: paymentIntent.id },
      { status: "success" }
    );
  }

  res.json({ received: true });
};

exports.getPaymentsByUserId = async( req, res) => {
         try {
             const payments = await Payment.find({userId : req.params.userId})
            
             if(!payments){
                return res.status(400).json({
                    status : false,
                  message: "No payments found",
                })
             }
          
                 res.status(200).json({
                  status: true,
                 payments,
        });
          } catch (error) {
            res.status(500).josn({
                status: false,
                message: error.message
            })
         }
}