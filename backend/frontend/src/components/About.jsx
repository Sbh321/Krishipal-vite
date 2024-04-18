import React from "react";

const About = () => {
  return (
    <div className="flex flex-row justify-center w-full px-14 py-[75px] intro">
      <div className="flex flex-row justify-between items-center w-full my-[5px] max-w-[1290px]">
        <div className="flex flex-col items-start justify-start w-[48%] gap-[30px]">
          <div className="flex flex-col items-start justify-start w-full gap-[26px]">
            <p
              // size="lg"
              className="text-white tracking-[-0.50px] text-xl"
            >
              Namaste, Krishi Pal.
            </p>
            <p
              // size="2xl"
              className="text-white tracking-[-0.50px]"
            >
              <span className="text-white-A700 font-raleway font-bold text-4xl">
                Welcome to Krishi Pal, your premier agricultural advisory
                platform, connecting farmers with experts for collaborative
                farming solutions and support.
              </span>
            </p>
          </div>
          <button
            // size="9xl"
            className="tracking-[-0.50px] h-14 text-white font-bold text-xl border-green-700 bg-green-700 rounded-full border-2 border-solid min-w-[218px] hover:bg-white hover:border-green-700 hover:text-green-700 transition duration-300 ease-in-out"
          >
            Explore
          </button>
        </div>
        <img
          src="Tree.jpg"
          alt="img"
          className="w-[48%] object-cover rounded-xl h-[500px]"
        />
      </div>
    </div>
  );
};

export default About;
