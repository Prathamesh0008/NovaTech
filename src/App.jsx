import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <Router>
      <ScrollToTop/>
      <Navbar />
      <div className="pt-15">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/products" element={<OurProducts />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/anti-counterfeit" element={<AntiCounterfeit />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element= {<BlogDetails/>}/>

          <Route path="/Contact" element={<ContactUs />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
