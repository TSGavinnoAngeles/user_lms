import React from "react";
import { LoginForm } from "./Client_Login";

const LoginPage = () => {
  return (
    <div
      className="grid place-items-center h-screen  bg-mikado_yellow-800 "
      style={{
        backgroundImage: "url('/dense_dots.svg')",
        backgroundRepeat: "repeat",
        backgroundSize: "cover",
      }}
    >
      <LoginForm />
    </div>
  );
};

export default LoginPage;
