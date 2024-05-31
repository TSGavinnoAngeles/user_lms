import { auth, signOut } from "@/auth";

import React from "react";
import Navbar from "../components/Dashboard/Navbar";
import Footer from "../components/Footer";
import Side from "../components/Dashboard/Side";
const Dashboard = async () => {
  const session = await auth();

  const firstName = session?.user?.name?.split(" ")[0];

  return (
    <>
      <Navbar />
      <div className="flex">
        <Side />
        <div className="shadow-lg p-8 rounded-lg bg-zinc-300/10 flex flex-col gap-2 my-6 place-item-center ml-64">
          <div>
            <span className="font-bold"> Welcome Back, {firstName}!</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
