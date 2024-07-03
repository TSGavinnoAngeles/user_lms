"use server";
import { connectToDB } from "@/app/lib/db";
import Price from "@/models/pricing";

export interface Prices {
  tier: string;
  price: string;
  correspondingTier: string;
}

export const subscribe = async () => {
  try {
    const response = await fetch("api/stripe", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    window.location.href = (await response.json()).url;
  } catch (error) {
    console.log(error);
  }
};

export const getPrices = async () => {
  try {
    await connectToDB();
    const prices = await Price.find();
    console.log(prices);
    const data = JSON.parse(JSON.stringify(prices));
    return data;
  } catch (error) {
    console.error(error);
  }
};
