// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import Home from "./pages/Home";
// import AboutUs from "./pages/AboutUs";
// import OurProducts from "./pages/OurProducts";
// import ContactUs from "./pages/ContactUs";
// import AntiCounterfeit from "./pages/AntiCounterfeit";
// import Blog from "./pages/Blog";
// import ProductDetails from "./pages/ProductDetails";
// import BlogDetails from "./pages/BlogDetails";
// import ScrollToTop from "./components/ScrollToTop";
// import NotFound from "./pages/NotFound";

// function App() {
//   return (
//     <Router>
//       <ScrollToTop/>
//       <Navbar />
//       <div className="pt-15">
//         <Routes>
//   <Route path="/" element={<Home />} />
//   <Route path="/about" element={<AboutUs />} />
//   {/* PRODUCTS LIST PAGE */}
//   <Route path="/products" element={<OurProducts />} />
//   {/* CATEGORY PAGE (optional but recommended) */}
//   <Route path="/products/:category" element={<OurProducts />} />
//   {/* NEW SEO PRODUCT DETAIL PAGE */}
//   <Route path="/products/:category/:productSlug" element={<ProductDetails />} />
//   <Route path="/anti-counterfeit" element={<AntiCounterfeit />} />
//   <Route path="/blog" element={<Blog />} />
//   <Route path="/blog/:id" element={<BlogDetails />} />
//   <Route path="/contact" element={<ContactUs />} />
//   <Route path="*" element={<NotFound />} />
// </Routes>
//       </div>
//       <Footer />
//     </Router>
//   );
// }

// export default App;

import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import OurProducts from "./pages/OurProducts";
import ContactUs from "./pages/ContactUs";
import AntiCounterfeit from "./pages/AntiCounterfeit";
import Blog from "./pages/Blog";
import ProductDetails from "./pages/ProductDetails";
import BlogDetails from "./pages/BlogDetails";
import ScrollToTop from "./components/ScrollToTop";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />

      <div className="pt-15">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />

          {/* Products */}
          <Route path="/products" element={<OurProducts />} />
          <Route path="/products/:category" element={<OurProducts />} />
          <Route
            path="/products/:category/:productSlug"
            element={<ProductDetails />}
          />

          {/* Other pages */}
          <Route path="/anti-counterfeit" element={<AntiCounterfeit />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetails />} />
          <Route path="/contact" element={<ContactUs />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      <Footer />
    </>
  );
}

export default App;
