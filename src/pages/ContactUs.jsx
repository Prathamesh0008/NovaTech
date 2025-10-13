import React from "react";
import Breadcrumbs from "../components/Breadcrumbs";

export default function ContactUs() {
  return (
    <div className="max-w-3xl mx-auto mt-10 text-center">
      <Breadcrumbs/>
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="text-gray-600 mb-4">We’d love to hear from you!</p>
      <form className="space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          className="border rounded-lg p-2 w-full"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="border rounded-lg p-2 w-full"
        />
        <textarea
          placeholder="Your Message"
          className="border rounded-lg p-2 w-full h-28"
        ></textarea>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
