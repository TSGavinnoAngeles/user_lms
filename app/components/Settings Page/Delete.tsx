"use client";
import React from "react";
import { auth, signOut } from "@/auth";
import { delStudent, searchStudent } from "@/actions/student";

const Delete = () => {
  const handleDelete = async () => {
    await delStudent();
    window.location.reload();
  };
  return (
    <div className="justify-between">
      <button
        onClick={() => handleDelete()}
        type="submit"
        className="btn bg-bittersweet_shimmer text-uranian_blue-900 outline outline-2 "
      >
        {" "}
        Delete my Profile
      </button>
    </div>
  );
};

export default Delete;
