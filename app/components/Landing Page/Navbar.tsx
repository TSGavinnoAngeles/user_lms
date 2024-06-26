"use client";
import React from "react";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="navbar bg-citypop-300 bg-no-repeat bg-center text-black border-b-rich_black-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-color-white"
          >
            <li className="">
              <a>Item 1</a>
            </li>
            <li>
              <a>Parent</a>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">
          <img
            alt="logo"
            src="/Logo/logo2.png"
            className="w-[125%]  h-[125%] z=50"
            width={500}
            height={200}
          />
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a>Item 1</a>
          </li>
          <li>
            <details>
              <summary>Parent</summary>
              <ul className="p-2 ">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <a>Item 3</a>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <a
          href="/login"
          className="btn mx-5 outline outline-3 bg-citypop-600 text-neutral-100 "
        >
          Log in{" "}
        </a>

        <a
          href="/register"
          className="btn mx-5 outline outline-3 bg-citypop-600 text-neutral-100"
        >
          Create an account
        </a>
      </div>
    </div>
  );
};
export default Navbar;
