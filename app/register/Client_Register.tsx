"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "../schema";
import * as z from "zod";
import { Register } from "@/actions/register";
import { useTransition } from "react";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import toast, { Toaster } from "react-hot-toast";

export const RegiForm = () => {
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      toast.promise(
        Register(values).then((data) => {
          if (data && data.error) {
            setError(data.error as string);
            console.log(data.error);
            throw new Error(data.error as string);
          }
          setSuccess(data?.message || "");
          console.log(data?.message);
          return data?.message || "";
        }),

        {
          loading: "Registering...",
          success: (data: string) => <b> {data} </b>,
          error: (err) => <b> {err.message} </b>,
        }
      );
    });
  };

  return (
    <div>
      <Toaster position="bottom-right" reverseOrder={false} />
      <div className="card flex flex-column border-spacing-0">
        <div className=" shadow-inner p-2 rounded-sm border-b-4 border-r-4 border-t-4 border-l-4 border-t-neutral-50 border-l-neutral-50 bg-neutral-400  ">
          <div className=" card-title text-xl font-bold text-center outline outline-2 p-2 text-mikado_yellow-900 bg-neon_blue-200 ">
            <h1 className="">Register.exe</h1>
            <button
              className="ml-96 outline outline-1 outline-neutral-900 border  px-2 bg-neutral-400 font-light text-center text-neutral-900 hover:border-t-neutral-50  hover:border-l-neutral-50 tooltip"
              data-tip="Go back to dashboard"
            >
              <a href="/"> x </a>
            </button>
          </div>

          <div className="card-body">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space y-4 ">
                <input
                  {...form.register("name")}
                  disabled={isPending}
                  type="text"
                  placeholder="First and Last Name"
                  className="w-full p-2 my-2  shadow-lg outline outline-1 border-r-2 border-b-2 border-t-2 border-l-2 border-l-neutral-50 border-t-neutral-50 hover:bg-neutral-300"
                />
                <input
                  {...form.register("email")}
                  disabled={isPending}
                  type="text"
                  placeholder="E-mail Address"
                  className="w-full p-2 my-2  shadow-lg outline outline-1 border-r-2 border-b-2 border-t-2 border-l-2 border-l-neutral-50 border-t-neutral-50 hover:bg-neutral-300"
                />
                <div className="flex flex-row space-x-4">
                  <input
                    disabled={isPending}
                    {...form.register("password")}
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="w-full p-2 my-2  shadow-lg outline outline-1 border-r-2 border-b-2 border-t-2 border-l-2 border-l-neutral-50 border-t-neutral-50 hover:bg-neutral-300"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="card-action "
                  >
                    {!showPassword ? (
                      <svg
                        className="outline outline-1 border-r-2 border-b-2 border-t-2 border-l-2 border-l-neutral-50 border-t-neutral-50 hover:bg-neutral-300"
                        xmlns="http://www.w3.org/2000/svg"
                        width="35"
                        height="35"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M 4 12 C 4 12 5.6 7 12 7 M 12 7 C 18.4 7 20 12 20 12 M 12 7 V 4 M 18 5 L 16 7.5 M 6 5 L 8 7.5 M 15 13 C 15 14.6569 13.6569 16 12 16 C 10.3431 16 9 14.6569 9 13 C 9 11.3431 10.3431 10 12 10 C 13.6569 10 15 11.3431 15 13 Z"></path>
                      </svg>
                    ) : (
                      <svg
                        className="outline outline-1 border-r-2 border-b-2 border-t-2 border-l-2 border-l-neutral-50 border-t-neutral-50 hover:bg-neutral-300"
                        xmlns="http://www.w3.org/2000/svg"
                        width="35"
                        height="35"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        // color="rgb(255,0,0)" if i want to make it red instead?
                      >
                        <line
                          x1="0"
                          y1="0"
                          x2="200"
                          y2="200"
                          style={{ stroke: "rgb(255,0,0)", strokeWidth: "2" }}
                        />
                        <path d="M 4 12 C 4 12 5.6 7 12 7 M 12 7 C 18.4 7 20 12 20 12 M 12 7 V 4 M 18 5 L 16 7.5 M 6 5 L 8 7.5 M 15 13 C 15 14.6569 13.6569 16 12 16 C 10.3431 16 9 14.6569 9 13 C 9 11.3431 10.3431 10 12 10 C 13.6569 10 15 11.3431 15 13 Z"></path>
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              {/* {error && <div className="text-red-500 text-2xl">{error}</div>} */}
              <div className=" p-1 outline outline-1 border-r-2 border-b-2 border-t-2 border-l-2 border-l-neutral-50 border-t-neutral-50 hover:bg-neutral-500 ">
                <button
                  disabled={isPending}
                  type="submit"
                  className=" card-action font-semibold text-xl card-action w-full text-white "
                >
                  {" "}
                  Register{" "}
                </button>
              </div>
            </form>

            <div className=" card-action text-xl text-bold flex justify-center items-center ">
              {" "}
              - or -{" "}
            </div>
            <div className="flex flex-row items-center w-full my-2 text-xl font-semibold p-1 outline outline-1 border-r-2 border-b-2 border-t-2 border-l-2 border-l-neutral-50 border-t-neutral-50 hover:bg-neutral-500 ">
              <svg
                className=" hover: fill-current hover:fill-nyanza ml-2 mr-2"
                width="25"
                height="25 "
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid"
                fill="black"
              >
                <path d="M21.4166 10.3333C21.5166 10.9417 21.575 11.5667 21.575 12.225C21.575 15.2667 20.4916 17.8333 18.6083 19.575C16.9583 21.1 14.7 22 12 22C8.09164 22 4.71664 19.75 3.07497 16.4833C2.39164 15.1333 1.99997 13.6167 1.99997 12C1.99997 10.3833 2.39164 8.86667 3.07497 7.51667C4.71664 4.25 8.09164 2 12 2C14.7 2 16.9583 2.99167 18.6833 4.60833L15.8333 7.45834C14.7916 6.46667 13.475 5.95833 12 5.95833C9.39164 5.95833 7.1833 7.71667 6.39164 10.0917C6.19164 10.6917 6.07497 11.3333 6.07497 12C6.07497 12.6667 6.1833 13.3083 6.39164 13.9083C7.1833 16.2833 9.39164 18.0417 12 18.0417C13.35 18.0417 14.4916 17.675 15.3916 17.075C16.4416 16.3667 17.15 15.325 17.3916 14.0917H12V10.3333H21.4166Z" />
              </svg>
              <button
                onClick={() => {
                  signIn("google"),
                    {
                      callbackUrl: DEFAULT_LOGIN_REDIRECT,
                    };
                }}
                className="card-action font-semibold text-xl card-action w-full text-white  "
              >
                Sign up using Google
              </button>
            </div>
          </div>
          <div className="font-bold text-center hover: font-underlined">
            Already have an account?{" "}
            <a className="font-light hover:text-zaffre-200" href="/login">
              Login instead
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
