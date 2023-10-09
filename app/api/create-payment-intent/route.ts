import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRETE_KEY!, {
  typescript: true,
  apiVersion: "2023-08-16",
});

export async function POST(req: NextRequest) {
  const { amount } = await req.json();
  console.log(amount);
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: +amount * 100,
      currency: "inr",
    });
    return new NextResponse(JSON.stringify(paymentIntent), { status: 200 });
  } catch (error: any) {
    console.log(error);
    return new NextResponse(error, {
      status: 400,
    });
  }
}
