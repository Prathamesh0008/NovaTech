import React from "react";
import { Link } from "react-router-dom";
import errimg from "../assets/errimg.png";
import { Title, Meta } from "react-head";


export default function NotFound() {
  return (
    <div className=" flex flex-col items-center justify-center bg-[#f3f7fa] px-6 py-10">
      <>
  <Title>Page Not Found | NovaTech Sciences</Title>
  <Meta name="robots" content="noindex, nofollow" />
  

  {/* Your 404 UI */}
</>

      {/* Header Bar (Professional Look) */}
      <div className="w-full bg-gradient-to-r from-[#0b1e39] via-[#18487d] to-[#3386bc] py-10 shadow-md mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-wide">
          Page Not Found
        </h1>
        <p className="text-white/80 mt-2 text-sm md:text-base">
          The page you’re looking for is not available or may have been moved.
        </p>
      </div>

      {/* Center Card */}
      <div className="bg-white rounded-2xl shadow-xl p-10 max-w-xl text-center border border-gray-100">
        
        {/* Illustration */}
        <img
          src={errimg}
          alt="404 Illustration"
          className="w-64 md:w-72 mx-auto mb-6 opacity-95"
        />

        {/* Error Code */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#18487d] mb-3">
          404
        </h2>

        {/* Message */}
        <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8">
          We can’t seem to find the page you were looking for.  
          Please return to the homepage or explore other sections.
        </p>

        {/* Button */}
        <Link
          to="/"
          className="px-8 py-3 bg-[#18487d] text-white rounded-lg font-semibold shadow-md 
                     hover:bg-[#0d2d47] hover:shadow-lg transition-all duration-300 inline-block"
        >
          Go Back Home
        </Link>
      </div>

      {/* Footer Space */}
      <div className="h-10" />
    </div>
  );
}
