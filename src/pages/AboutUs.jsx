import React from "react";
import Breadcrumbs from "../components/Breadcrumbs";
import AboutBackground from "../components/AboutBackground";
import DNAOverlay from "../components/DNAOverlay";

export default function AboutUs() {
  return (
    <div className="max-w-full mx-auto mt-5 text-center">
      <Breadcrumbs/>
      <AboutBackground/>
      <DNAOverlay/>
      {/* <h1 className="text-3xl font-bold mb-4">About Us</h1>
      <p className="text-gray-600">
        MyCompany is committed to excellence and innovation. Our mission is to deliver quality products with authenticity and trust.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores modi at ipsum qui quia ullam beatae placeat fuga culpa labore aliquid optio quis possimus, commodi dolore quae rem iste architecto!
      </p> */}
    </div>
  );
}
