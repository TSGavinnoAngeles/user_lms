"use client";
import React, { useEffect, useState } from "react";
import Side from "../components/Dashboard/Side";
import TimeHeader from "../components/TimeHeader";
import { BsCheck2Circle, BsCircle } from "react-icons/bs";
import { getUserSub, Student } from "@/actions/student";
import { getPrices, Prices } from "@/actions/payment";
const Pricing = () => {
  const [loading, isloading] = useState(false);
  const [userSub, setUserSub] = useState<Student>();
  const [prices, setPrices] = useState<Prices[]>([]);

  const getUser = async () => {
    const result = await getUserSub();
    setUserSub(result);
  };
  const getPricings = async () => {
    const getPrice = await getPrices();
    setPrices(getPrice);
  };

  useEffect(() => {
    if (prices && userSub) {
      isloading(true);
    }
    getUser();
    getPricings();
  }, []);

  const subscribe = async (tier: string) => {
    try {
      const response = await fetch(`/api/stripe/${tier}/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      window.location.href = (await response.json()).url;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="min-h-screen">
        {" "}
        <div className="flex flex-col ">
          <TimeHeader />
          <div className="flex flex-row ml-5">
            <Side />
            <div className="m-10 w-screen">
              <p className="font-bold text-3xl mb-10">
                {" "}
                Ready to do more? You are on a {userSub?.tier} membership
              </p>
              <div className=" flex flex-row gap-10 m-50">
                {/* sub */}
                <div className=" card bg-mikado_yellow-800 transition-all shadow-[0px_10px_0px_black] outline outline-1 rounded-md h-[450px] w-2/6">
                  <div className="card-body -m-5">
                    <>
                      {" "}
                      <div className="flex flex-col gap-2  ">
                        <h2 className="card-content font-semibold  flex flex-col gap-1 text-3xl">
                          {prices[0]?.tier}
                        </h2>
                        <h1 className="card-content font-semibold  flex flex-col gap-1 text-5xl">
                          {prices[0]?.price ? (
                            `$${prices[0].price.slice(
                              0,
                              -2
                            )}.${prices[0].price.slice(-2)}`
                          ) : (
                            <></>
                          )}
                          <a className="text-base">/one time payment</a>
                        </h1>
                        <a className="font-semibold mx-8 mb-10">
                          {" "}
                          This is meant for those students that want to start
                          off with something new. Basic access is given.
                        </a>
                        <ul className="font-bold mb-10">
                          <li className="flex flex-row gap-2 ">
                            {" "}
                            <BsCheck2Circle className="mt-1" /> Access to
                            limited courses
                          </li>
                          <li className="flex flex-row gap-2">
                            {" "}
                            <BsCircle className="mt-1" /> Certificate of
                            Completion
                          </li>
                          <li className="flex flex-row gap-2">
                            {" "}
                            <BsCircle className="mt-1" /> Downloadable resources
                          </li>
                        </ul>
                        {userSub?.tier === "free" ||
                        "paid" ||
                        userSub?.role === "admin" ? (
                          <button
                            disabled={true}
                            className=" rounded-2xl border-2 border-dashed border-black bg-white px-6 py-3 font-semibold uppercase text-black transition-all duration-300  hover:translate-y-[-4px] hover:rounded-m active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none bg-neutral-900 text-mikado_yellow-800"
                          >
                            You are on this plan
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              subscribe(prices[0]?.tier);
                            }}
                            // disabled={true}
                            className=" rounded-2xl border-2 border-dashed border-black bg-white px-6 py-3 font-semibold uppercase text-black transition-all duration-300  hover:translate-y-[-4px] hover:rounded-m active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none hover:bg-neutral-900 hover:text-mikado_yellow-800"
                          >
                            Subscribe!
                          </button>
                        )}
                      </div>
                    </>
                  </div>
                </div>
                {/* Premium */}
                <div className=" card bg-mikado_yellow-800 transition-all shadow-[0px_10px_0px_black] outline outline-1 rounded-md h-[450px] w-2/6">
                  <div className="card-body -m-5">
                    <>
                      {" "}
                      <div className="flex flex-col gap-2  ">
                        <h2 className="card-content font-semibold  flex flex-col gap-1 text-3xl">
                          {prices[1]?.tier}
                        </h2>
                        <h1 className="card-content font-semibold  flex flex-col gap-1 text-5xl">
                          {prices[1]?.price ? (
                            `$${prices[1].price.slice(
                              0,
                              -2
                            )}.${prices[1].price.slice(-2)}`
                          ) : (
                            <></>
                          )}
                          <a className="text-base">/one time payment</a>
                        </h1>
                        <a className="font-semibold mx-10 mb-10">
                          {" "}
                          This is meant for those students that want to up their
                          game. Full access is given.
                        </a>
                        <ul className="font-bold mb-10">
                          <li className="flex flex-row gap-2 ">
                            {" "}
                            <BsCheck2Circle className="mt-1 " /> Unlimited
                            access to all courses
                          </li>
                          <li className="flex flex-row gap-2">
                            {" "}
                            <BsCheck2Circle className="mt-1" /> Certificate of
                            Completion on all courses
                          </li>
                          <li className="flex flex-row gap-2">
                            {" "}
                            <BsCheck2Circle className="mt-1" /> Downloadable
                            resources
                          </li>
                        </ul>
                        {userSub?.tier === "paid" ||
                        userSub?.role === "admin" ||
                        userSub?.tier === "admin" ? (
                          <button
                            disabled={true}
                            className=" rounded-2xl border-2 border-dashed border-black bg-white px-6 py-3 font-semibold uppercase text-black transition-all duration-300  hover:translate-y-[-4px] hover:rounded-m active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none bg-neutral-900 text-mikado_yellow-800"
                          >
                            You are on this plan
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              subscribe(prices[1]?.tier);
                            }}
                            // disabled={true}
                            className=" rounded-2xl border-2 border-dashed border-black bg-white px-6 py-3 font-semibold uppercase text-black transition-all duration-300  hover:translate-y-[-4px] hover:rounded-m active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none hover:bg-neutral-900 hover:text-mikado_yellow-800"
                          >
                            Subscribe!
                          </button>
                        )}
                      </div>
                    </>
                  </div>
                </div>
                {/* admin */}
                <div className=" card bg-mikado_yellow-800 transition-all shadow-[0px_10px_0px_black] outline outline-1 rounded-md h-[450px] w-2/6">
                  <div className="card-body -m-5">
                    <>
                      {" "}
                      <div className="flex flex-col gap-2  ">
                        <h2 className="card-content font-semibold  flex flex-col gap-1 text-3xl">
                          Admin Access
                        </h2>
                        <h1 className="card-content font-semibold  flex flex-col gap-1 text-5xl">
                          {prices[2]?.price ? (
                            `$${prices[2].price.slice(
                              0,
                              -2
                            )}.${prices[2].price.slice(-2)}`
                          ) : (
                            <></>
                          )}
                          <a className="text-base">/one time payment</a>
                        </h1>
                        <a className="font-semibold mx-10 mb-10">
                          {" "}
                          Wanna create courses and actually be the boss? This is
                          for you
                        </a>
                        <ul className="font-bold mb-10">
                          <li className="flex flex-row gap-2 ">
                            {" "}
                            <BsCheck2Circle className="mt-1 " /> Unlimited
                            access to all courses
                          </li>
                          <li className="flex flex-row gap-2">
                            {" "}
                            <BsCheck2Circle className="mt-1" /> Certificate of
                            Completion on all courses
                          </li>
                          <li className="flex flex-row gap-2">
                            {" "}
                            <BsCheck2Circle className="mt-1" /> Create your own
                            courses and earn money
                          </li>
                        </ul>
                        {userSub?.role === "admin" ||
                        userSub?.tier === "admin" ? (
                          <button
                            disabled={true}
                            className=" rounded-2xl border-2 border-dashed border-black bg-white px-6 py-3 font-semibold uppercase text-black transition-all duration-300  hover:translate-y-[-4px] hover:rounded-m active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none bg-neutral-900 text-mikado_yellow-800"
                          >
                            You are an Admin
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              subscribe(prices[2]?.tier);
                            }}
                            // disabled={true}
                            className=" rounded-2xl border-2 border-dashed border-black bg-white px-6 py-3 font-semibold uppercase text-black transition-all duration-300  hover:translate-y-[-4px] hover:rounded-m active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none hover:bg-neutral-900 hover:text-mikado_yellow-800"
                          >
                            Subscribe!
                          </button>
                        )}
                      </div>
                    </>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pricing;
