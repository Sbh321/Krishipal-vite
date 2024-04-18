import React from "react";
import { Link } from "react-router-dom";

const RegisterScreen = () => {
  return (
    <div className="flex h-screen">
      <img
        className="w-1/2 hidden lg:block object-cover"
        src="https://img.freepik.com/free-photo/superfood-background-with-green-vegetables_53876-106104.jpg?w=826&t=st=1683029587~exp=1683030187~hmac=8d6f38ac6002119be48b7bdd8e625d490e0a98ca60f3af2ace90ab7b644589a9"
        alt="image from freepik"
      />
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2">
        <div>
          <div className="text-xl text-center font-bold lg:text-left">
            <span className="text-green-600">&#9650;</span>
            <span>KrishiPal</span>
          </div>
          <div className="text-3xl text-center font-bold lg:text-left mt-4">
            <h2>Hello,</h2>
            <h2>Welcome!</h2>
          </div>

          <form action="" className="mt-8 w-[80%] lg:w-96 mx-auto space-y-4">
            <h4>Register to create an account</h4>
            <input
              type="text"
              placeholder="Full Name"
              className="border w-full px-4 py-2"
            />
            <input
              type="email"
              placeholder="Email"
              className="border w-full px-4 py-2"
            />
            <input
              type="password"
              placeholder="Password"
              className="border w-full px-4 py-2"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="border w-full px-4 py-2"
            />

            <button className="w-full text-white rounded bg-green-600 py-2 font-bold hover:bg-green-500">
              Register
            </button>
          </form>
        </div>
        <div className="text-center space-y-4 mt-4">
          <span>or</span>
          <div className="flex justify-center items-center gap-8">
            <h4>Google</h4>
            <h4>Facebook</h4>
            <h4>GitHub</h4>
          </div>
        </div>
        <div className="mt-4">
          Already have an account?{" "}
          <span className="text-blue-600 cursor-pointer hover:text-blue-400">
            <Link to={"/login"}>Sign in here</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;
