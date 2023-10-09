const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRETE_KEY);

exports.handler = async (event) => {
  try {
    const { amount } = JSON.parse(event.body);
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "inr",
      payment_method_types: ["card"],
    });
    return {
      statusCode: 200,
      body: JSON.stringify({ paymentIntent }),
    };
  } catch (error) {
    console.log({ error });
    return {
      statusCode: 400,
      body: JSON.stringify({ error }),
    };
  }
};