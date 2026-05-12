import { NextResponse } from "next/server";
import Stripe from "stripe";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// Lazy singleton — Stripe is instantiated only on first request,
// never at module load. This lets the build succeed even when the
// env var is absent (e.g. CI), and ensures we read the key fresh.
let _stripe: Stripe | null = null;
function getStripe(): Stripe {
  if (_stripe) return _stripe;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY is not set");
  }
  _stripe = new Stripe(key);
  return _stripe;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      cart = [],
      billingAddress = {},
      shippingAddress = {},
      subtotal = 0,
      shippingFee = 0,
      discountAmount = 0,
      total,
    } = body;

    /* ------------------------------
       VALIDATION
    ------------------------------ */
    const amount = Number(total);

    if (!amount || isNaN(amount) || amount <= 0) {
      return NextResponse.json(
        { error: "Invalid total amount" },
        { status: 400 }
      );
    }

    /* ------------------------------
       CREATE PAYMENT INTENT
    ------------------------------ */
    const stripe = getStripe();
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: "usd",

      automatic_payment_methods: {
        enabled: true,
      },

      metadata: {
        items: cart.length.toString(),
        subtotal: String(subtotal),
        shipping: String(shippingFee),
        discount: String(discountAmount),
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    console.error("❌ Stripe PI Error:", err);

    return NextResponse.json(
      { error: "Payment initialization failed" },
      { status: 500 }
    );
  }
}