import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/app/lib/stripe";
import Subscriptions from "@/models/userSub";
import User from "@/models/user";
import { ObjectId } from "mongodb";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;
  const stripeEnv = process.env.STRIPE_WEBHOOK_SECRET;

  try {
    if (!stripeEnv) {
      return new NextResponse(
        `Webhook Error: Missing Stripe Secret ${process.env.STRIPE_WEBHOOK_SECRET}`,
        {
          status: 400,
        }
      );
    }
    event = stripe.webhooks.constructEvent(body, signature, stripeEnv);
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message} ${signature} `, {
      status: 400,
    });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const userId = session?.metadata?.userId;
  const toObjUser = new ObjectId(userId);

  const user = await User.findOne({ _id: toObjUser });

  if (!user?.role) {
    await User.findOneAndUpdate({ _id: toObjUser }, { role: "user" });
  }

  if (session.metadata?.upgradeTo === "admin") {
    const user = await User.findOne({ _id: toObjUser });
    if (!user?.role) {
      await User.findOneAndUpdate({ _id: toObjUser }, { role: "admin" });
    }

    await User.findOneAndUpdate(
      { _id: toObjUser },
      { tier: "admin", role: "admin" }
    );
  }

  if (event.type === "checkout.session.completed") {
    if (!userId) {
      return new NextResponse(`Webhook Error: Missing metadata`, {
        status: 400,
      });
    }

    await Subscriptions.findOneAndUpdate(
      { user: toObjUser },
      {
        amount: session.metadata?.amount,
        paidFor: session.metadata?.upgradeTo,
      }
    );
    await User.findOneAndUpdate(
      { _id: toObjUser },
      { tier: session.metadata?.upgradeTo }
    );
  }

  if (event.type === "invoice.payment_succeeded") {
    if (!userId) {
      return new NextResponse(`Webhook Error: Missing metadata`, {
        status: 400,
      });
    }

    await Subscriptions.findOneAndUpdate(
      { user: toObjUser },
      {
        amount: session.metadata?.amount,
        paidFor: session.metadata?.upgradeTo,
      }
    );

    await User.findOneAndUpdate(
      { _id: toObjUser },
      { tier: session.metadata?.upgradeTo }
    );
  }

  return new NextResponse(null, { status: 200 });
}
