const express = require("express");
const router = express.Router();
const controller = require("../controllers/payment.controller");

router.post("/create-payment-intent", controller.createPaymentIntent);
router.post("/verify-payment", controller.verifyPayment);
router.get("/getall", controller.getAllPayments);
router.get("/get-by-id/:id", controller.getSinglePayment);
router.post("/refund", controller.refundPayment);
router.post("/create-subscription", controller.createSubscription);
router.post("/webhook", express.raw({ type: "application/json" }), controller.webhook);
router.get("/get-by-userId/:userId", controller.getPaymentsByUserId);

module.exports = router;