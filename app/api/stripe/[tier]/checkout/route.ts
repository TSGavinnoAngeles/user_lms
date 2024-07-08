import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/app/lib/stripe";
import Subscriptions from "@/models/userSub";
import User from "@/models/user";
import Price from "@/models/pricing";

const redirectURL = "https://user-lms.vercel.app/pricing";

export async function POST(
  req: Request,
  { params }: { params: { tier: string } }
) {
  const tier = params.tier;
  const session = await auth();
  if (!session) {
    return NextResponse.redirect("https://user-lms.vercel.app/login");
  }
  const sesh = session.user;

  try {
    const [subbingUser, tierDetails] = await Promise.all([
      User.findOne({ email: sesh?.email, name: sesh?.name }),
      Price.findOne({ tier: tier }),
    ]);

    if (!tierDetails) {
      return new NextResponse(JSON.stringify({ error: "Tier not found" }), {
        status: 404,
      });
    }

    if (subbingUser.tier === tierDetails.correspondingTier) {
      return NextResponse.redirect("/catalog");
    }

    let userSubcription = await Subscriptions.findOne({ user: subbingUser });

    if (!userSubcription) {
      const customer = await stripe.customers.create({
        email: subbingUser.email,
      });
      await Subscriptions.create({
        user: subbingUser._id.toString(),
        stripeCustomerId: customer.id,
        amount: "0000",
        paidFor: "nothing",
      });
    }

    const stripeSession = await createStripeSession(
      userSubcription,
      subbingUser,
      tierDetails,
      redirectURL
    );
    console.log(
      "[Create Session Stripe]: ",
      JSON.stringify({ url: stripeSession.url })
    );

    return new NextResponse(JSON.stringify({ url: stripeSession.url }));
  } catch (error: any) {
    console.error("[STRIPE ERROR]", error.message);
    return NextResponse.json(`${error}`, { status: 500 });
  }
}

async function createStripeSession(
  userSubcription: { stripeSubscriptionId: string; stripeCustomerId: string },
  subbingUser: { email: string; _id: { toString: () => string } },
  tierDetails: { tier: string; price: string; correspondingTier: string },
  redirectURL: string
) {
  if (userSubcription && userSubcription.stripeSubscriptionId) {
    return await stripe.billingPortal.sessions.create({
      customer: userSubcription.stripeCustomerId,
      return_url: redirectURL,
    });
  } else {
    return await stripe.checkout.sessions.create({
      mode: "payment",
      billing_address_collection: "auto",
      customer_email: subbingUser.email,
      success_url: `https://user-lms.vercel.app/pricing`,
      cancel_url: `https://user-lms.vercel.app/catalog`,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: `${tierDetails.tier} ` },
            unit_amount: Number(tierDetails.price),
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId: subbingUser._id.toString(),
        amount: `${tierDetails.price}`,
        upgradeTo: `${tierDetails.correspondingTier}`,
      },
    });
  }
}
