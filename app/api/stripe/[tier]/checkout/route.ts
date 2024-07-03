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
  try {
    if (!session) {
      return NextResponse.redirect("https://user-lms.vercel.app/login");
    }
    const sesh = session.user;

    const subbingUser = await User.findOne({
      email: sesh?.email,
      name: sesh?.name,
    });

    const tierDetails = await Price.findOne({ tier: tier });
    if (!tierDetails) {
      return new NextResponse(JSON.stringify({ error: "Tier not found" }), {
        status: 404,
      });
    }

    if (subbingUser.tier === tierDetails.correspondingTier) {
      // Assuming you want to redirect to a "/home" page
      return NextResponse.redirect("/catalog");
    }

    let userId = subbingUser._id.toString();
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

      userId = subbingUser._id.toString();
    }

    if (userSubcription && userSubcription.stripeSubscriptionId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: userSubcription.stripeCustomerId,
        return_url: redirectURL,
      });

      return new Response(JSON.stringify({ url: stripeSession.url }));
    }

    const stripeSession = await stripe.checkout.sessions.create({
      mode: "payment",
      billing_address_collection: "auto",
      customer_email: subbingUser.email,
      success_url: `https://user-lms.vercel.app/pricing`,

      cancel_url: `https://user-lms.vercel.app/catalog`,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${tierDetails.tier} `,
            },
            unit_amount: Number(tierDetails.price),
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId,
        amount: `${tierDetails.price}`,
        upgradeTo: `${tierDetails.correspondingTier}`,
      },
    });

    return new NextResponse(JSON.stringify({ url: stripeSession.url }));
  } catch (error: any) {
    console.error("[STRIPE ERROR]", error.message);
    return NextResponse.json(`${error}`, { status: 500 });
  }
}
