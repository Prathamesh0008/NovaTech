import React from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import { Calendar, ArrowRight } from "lucide-react";
import blog1 from '../assets/blogs/blog1.jpg'
import blog2 from '../assets/blogs/blog2.jpg'
import blog3 from '../assets/blogs/blog3.jpg'
import blog4 from '../assets/blogs/blog1.jpg'



export default function Blog() {
  const blogs = [
    {
      id: 1,
      title: "Advancements in Hormone Replacement Therapy",
      date: "October 10, 2025",
      category: "Research & Development",
      image: blog1,
      excerpt:
        "Discover the latest breakthroughs in safe and effective hormone therapies for balanced wellness.",
    },
    {
      id: 2,
      title: "Ensuring Quality in Pharmaceutical Manufacturing",
      date: "October 3, 2025",
      category: "Quality Control",
      image: blog2,
      excerpt:
        "How NovaTech maintains international WHO-GMP standards across every product line and facility.",
    },
    {
      id: 3,
      title: "Sustainable Practices in Modern Pharma",
      date: "September 29, 2025",
      category: "Sustainability",
      image: blog3,
      excerpt:
        "Learn about our Zero Liquid Discharge initiatives and renewable energy integration in production.",
    },
    {
      id: 4,
      title: "Steroid Manufacturing: Science & Safety",
      date: "September 21, 2025",
      category: "Pharmaceutical Insight",
      image: blog4,
      excerpt:
        "Understanding purity, safety, and performance aspects of steroid formulations for regulated use.",
    },
    {
      id: 5,
      title: "Pharmaceutical Exports from India to the EU",
      date: "September 14, 2025",
      category: "Global Trade",
      image: blog1,
      excerpt:
        "An inside look into how NovaTech ensures compliance for international exports to Europe and CIS markets.",
    },
    {
      id: 6,
      title: "Digital Authentication to Prevent Counterfeiting",
      date: "September 8, 2025",
      category: "Security & Technology",
      image: blog2,
      excerpt:
        "Explore our digital product verification system designed to protect authenticity and consumer trust.",
    },
    {
      id: 7,
      title: "Future of Nutraceuticals in Preventive Healthcare",
      date: "August 30, 2025",
      category: "Nutrition Science",
      image: blog3,
      excerpt:
        "How science-backed nutraceuticals are shaping the future of preventive wellness and holistic care.",
    },
    {
      id: 8,
      title: "Inside Our Sterile Injectable Unit",
      date: "August 20, 2025",
      category: "Manufacturing",
      image: blog4,
      excerpt:
        "A behind-the-scenes view of the sterile production environment ensuring precision and product integrity.",
    },
    {
      id: 9,
      title: "Why GMP Certification Matters",
      date: "August 10, 2025",
      category: "Compliance",
      image: blog1,
      excerpt:
        "Discover the international standards that ensure every NovaTech product meets global benchmarks.",
    },
    {
      id: 10,
      title: "Women’s Health & Hormonal Balance",
      date: "August 1, 2025",
      category: "Healthcare",
      image: blog2,
      excerpt:
        "Our focus on hormonal therapies designed specifically to support women’s well-being and vitality.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f5f9fb] via-[#f3f8fa] to-[#e8f3f8]">
      {/* ===== HEADER ===== */}
      <div className="bg-gradient-to-r from-[#0b1e39] via-[#18487d] to-[#3386bc] text-white py-10 shadow-md mb-10">
        <div className="max-w-6xl mx-auto px-6">
          <Breadcrumbs />
          <h1 className="text-3xl md:text-4xl font-bold mt-2">Our Blog</h1>
          <p className="text-white/80 mt-2 max-w-2xl">
            Stay informed with healthcare insights, innovation stories, and
            updates from NovaTech Sciences.
          </p>
        </div>
      </div>

      {/* ===== BLOG GRID ===== */}
      <div className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group"
            >
              {/* Blog Image */}
              <div className="overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Blog Content */}
              <div className="p-6 text-left">
                <div className="flex items-center justify-between mb-3 text-sm text-gray-500">
                  <span className="bg-[#e6f4fa] text-[#3386bc] px-3 py-1 rounded-full font-medium">
                    {blog.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>{blog.date}</span>
                  </div>
                </div>

                <h2 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-[#3386bc] transition-colors duration-300">
                  {blog.title}
                </h2>
                <p className="text-gray-600 text-sm mb-4">{blog.excerpt}</p>

                <Link
                  to={`/blog/${blog.id}`}
                  onClick={(e) => {
    if (e.ctrlKey || e.metaKey) {
      window.open(`/blog/${blog.id}`, "_blank");
      return;
    }
  }}
                  className="inline-flex items-center text-[#3386bc] font-medium hover:underline hover:gap-2 transition-all duration-300"
                >
                  Read More <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== FOOTER SPACER ===== */}
      <div className="h-8" />
    </div>
  );
}
