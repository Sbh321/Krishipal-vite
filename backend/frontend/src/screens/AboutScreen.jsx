import React from "react";

const AboutScreen = () => {
  return (
    <div className="container mx-auto py-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">About Krishipal</h1>
        <p className="text-gray-600 mb-8">
          Krishipal is your go-to platform for all things agriculture. Whether
          you are a farmer, agronomist, or gardening enthusiast, we provide a
          wide range of products and resources to support your agricultural
          needs.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="md:w-1/2">
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-gray-600">
            Our mission is to empower farmers and agriculturalists by providing
            them with high-quality products, expert advice, and a platform to
            connect and share knowledge.
          </p>
        </div>

        <div className="md:w-1/2">
          <img
            src="lady.png"
            alt="Mission Image"
            className="w-full h-auto object-cover rounded-md"
          />
        </div>
      </div>

      <div className="mt-8 flex flex-col md:flex-row gap-8 items-center">
        <div className="md:w-1/2">
          <img
            src="shed.png"
            alt="Vision Image"
            className="w-full h-auto object-cover rounded-md"
          />
        </div>

        <div className="md:w-1/2">
          <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
          <p className="text-gray-600">
            We envision a sustainable agricultural ecosystem where technology
            meets tradition, fostering innovation and growth in agriculture.
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Agriculture Blogs</h2>
        <p className="text-gray-600">
          Explore our collection of insightful agriculture blogs, covering a
          wide range of topics including farming techniques, crop management,
          agricultural news, and more.
        </p>
        <p className="text-gray-600 mt-4">
          Stay informed and connected with the latest trends and developments in
          agriculture through our dedicated blog section.
        </p>
      </div>
    </div>
  );
};

export default AboutScreen;
