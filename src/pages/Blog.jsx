import React from "react";
import Breadcrumbs from "../components/Breadcrumbs";

export default function Blog() {
  return (
    <div className="max-w-3xl mx-auto mt-10 text-center">
      <Breadcrumbs/>
      <h1 className="text-3xl font-bold mb-4">Our Blog</h1>
      <p className="text-gray-600">
        Stay updated with the latest news and insights from MyCompany.
      </p>
    </div>
  );
}
