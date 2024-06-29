import React from "react";
import { AiFillPhone, AiOutlineMail } from "react-icons/ai";
import { FaMapMarkerAlt } from "react-icons/fa";

const ContactScreen = () => {
  return (
    <div className="container mx-auto py-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold my-7">Contact Us</h1>
        <p className="text-gray-600 mb-8">
          We're here to help! Contact us using the form below or reach out
          directly using the information provided.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Contact Form</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-700">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-50"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-50"
                placeholder="Enter your email address"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-gray-700">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="3"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-50"
                placeholder="Enter your message"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-accent hover:bg-accentDark text-white px-6 py-3 rounded-md transition duration-300"
            >
              Submit
            </button>
          </form>
        </div> */}

        <div className="p-6 bg-white rounded-lg shadow-md m-auto">
          <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
          <div className="flex items-center space-x-4 mb-4">
            <AiFillPhone className="text-accentDark text-2xl" />
            <p className="text-gray-600">+1 123 456 7890</p>
          </div>
          <div className="flex items-center space-x-4 mb-4">
            <AiOutlineMail className="text-accentDark text-2xl" />
            <p className="text-gray-600">info@krishipal.com</p>
          </div>
          <div className="flex items-center space-x-4">
            <FaMapMarkerAlt className="text-accentDark text-2xl" />
            <p className="text-gray-600">123 Kathmandu, Nepal, 44600</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactScreen;
