"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "../schema";
import * as z from "zod";
import { Login } from "@/actions/login";

import { useTransition } from "react";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export const LoginForm = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const [email, setEmail] = useState("");

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (email === undefined) {
      setError("Email is required");
      console.log("Email is required");
    }
  }, [email]);

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");

    // If it's not, proceed with the registration
    startTransition(() => {
      const registry = Login(values).then((data) => {
        if (data && data.error) {
          setError(data.error as string);
          console.log(data.error);
          throw new Error(data.error as string);
        }
        if (data instanceof z.ZodError) {
          setError(data.errors[0].message);
        }
        setSuccess(data?.message);
        console.log(data?.message);
        return data?.message;
      });
      toast.promise(registry, {
        loading: "Registering...",
        success: (data) => <b> {data} </b>,
        error: (err) => <b> {err.message} </b>,
      });
    });
  };

  return (
    <>
      <div className=" card lg:card flex flex-column border-spacing-0 ml-96">
        <Toaster position="bottom-right" reverseOrder={false} />
        {/* {error && <div className="text-red-500 text-2xl">{error}</div>} */}
        <div className=" shadow-inner p-2 rounded-sm border-b-4 border-r-4 border-t-4 border-l-4 border-t-neutral-200 border-l-neutral-200 bg-neutral-300  ">
          <div className=" grid-flow-col gap-2 card-title text-xl font-bold text-center outline outline-2 p-1 text-mikado_yellow-900 bg-neon_blue-200 ">
            <h1 className="">Login.exe</h1>
            <button
              className="ml-56 outline outline-1 outline-neutral-900 border  px-2 bg-neutral-400 font-light text-center text-neutral-900 border-t-neutral-50   border-l-neutral-50 tooltip"
              data-tip="Go back to dashboard"
            >
              <a href="/"> x </a>
            </button>
          </div>
          <div className="card-body">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space y-6">
              <div className="space y-4 ">
                <input
                  required
                  {...form.register("email")}
                  disabled={isPending}
                  type="text"
                  placeholder="example@seneca.com"
                  className="w-full p-2 my-2 "
                />
                <div className="flex flex-row">
                  <input
                    required
                    disabled={isPending}
                    {...form.register("password")}
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="w-full p-2 my-2"
                  />
                </div>
              </div>
              <div className=" my-1 p-1 outline outline-1 border-r-2 border-b-2 border-t-2 border-l-2 border-l-neutral-50 border-t-neutral-50 hover:bg-neutral-500 ">
                <button
                  disabled={isPending}
                  type="submit"
                  className=" card-action font-semibold text-xl card-action w-full text-white "
                >
                  {" "}
                  Login{" "}
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
          <div className="font-bold text-center hover: font-underlined ">
            Do have an account yet? No?{" "}
            <a className="font-light hover:text-zaffre-200" href="/register">
              Register here
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
