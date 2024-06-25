"use client";
import React from "react";

import { useState } from "react";
import SpringModal from "../Modals/DelModal";

const Delete = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="justify-between">
      <div className="py-1 rounded-sm outline outline-2 bg-mikado_yellow-600 grid place-content-center ">
        <button
          onClick={() => setIsOpen(true)}
          className=" text-white font-medium px-4 py-2 rounded hover:opacity-90 transition-opacity"
        >
          Delete Account
        </button>
        <SpringModal isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </div>
  );
};

export default Delete;
