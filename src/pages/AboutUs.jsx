import React from "react";
import Breadcrumbs from "../components/Breadcrumbs";

export default function AboutUs() {
  return (
    <div className="max-w-3xl mx-auto mt-10 text-center">
      <Breadcrumbs/>
      <h1 className="text-3xl font-bold mb-4">About Us</h1>
      <p className="text-gray-600">
        MyCompany is committed to excellence and innovation. Our mission is to deliver quality products with authenticity and trust.
      </p>
    </div>
  );
}
