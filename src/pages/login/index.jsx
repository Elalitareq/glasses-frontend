import React, { useState } from "react";
import { useSignIn } from "react-auth-kit";
import { useNavigate } from "react-router";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signIn = useSignIn();
  const navigate =useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn({
      token: "test",
      expiresIn:3000,
      tokenType: "Bearer",
      authState: {username:email},
    });
    navigate("/")
  };
  return (
    <main className=" bg-primary-gradient h-screen w-full flex items-center  justify-center">
      <div className="w-[360px] p-[8%_0_0] m-auto">
        <div className="relative z-10  bg-white max-w-[360px] m-[0_auto_100px] p-[45px] text-center shadow-md rounded-lg ">
          <h1 className="absolute -top-3 px-3 py-2 rounded text-2xl font-mono font-bold text-white bg-slate-500 ">
            {" "}
            Welcome
          </h1>
          <form className="login-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="username"
              className="focus:outline-none bg-[#f2f2f2] w-full border-none m-[0_0_15px] text-sm px-4 py-3 "
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              className="focus:outline-none bg-[#f2f2f2] w-full border-none m-[0_0_15px] text-sm px-4 py-3"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="outline-none bg-[#4ca2af] w-full border-none p-4 text-white text-sm transition-colors duration-300 hover:bg-[#438fa0] rounded">
              LOGIN
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
