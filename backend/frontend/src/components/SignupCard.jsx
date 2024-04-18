import React from "react";

const SignupCard = () => {
  return (
    <div className="flex justify-center w-full max-w-[1290px] container mt-[50px]">
      <div
        className="flex items-center justify-center max-w-[1000px] p-6 bg-gradient"
        style={{ backgroundImage: "linear-gradient(135deg, #273032, #274b53)" }}
      >
        <div className="flex flex-col items-start justify-start w-[55%] ml-1.5 gap-6">
          <div className="flex flex-col items-start justify-start w-full gap-7">
            <p className="tracking-[-0.50px] text-lg font-normal text-white">
              Heyy!!
            </p>
            <h1 className="tracking-[-0.50px] text-4xl font-bold text-white">
              Signup to know more!
            </h1>
          </div>
          <button className="tracking-[-0.50px] font-medium min-w-[155px] border-gray-50 border-2 border-solid text-gray-50 h-[49px] px-[35px] text-sm">
            Signup
          </button>
        </div>
        <img
          src="images/farmer.png"
          alt="image"
          className="w-[31%] mr-1.5 object-cover hidden sm:block"
        />
      </div>
    </div>
  );
};

export default SignupCard;
