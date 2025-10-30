import React from "react";
import { useParams, Link } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import { Calendar } from "lucide-react";

// --- SAME BLOG LIST as on main blog page ---
const blogData = [
  {
    id: 1,
    title: "Advancements in Hormone Replacement Therapy",
    date: "October 10, 2025",
    category: "Research & Development",
    image: "/images/blog/hormone-therapy.jpg",
    content: `
      Hormone replacement therapy (HRT) has come a long way in recent years.
      With advanced research in molecular biology, formulation precision,
      and safety testing, modern therapies are more effective and sustainable
      than ever before. At NovaTech, our focus remains on developing safe
      bio-identical hormones that enhance patient quality of life.
    `,
  },
  {
    id: 2,
    title: "Ensuring Quality in Pharmaceutical Manufacturing",
    date: "October 3, 2025",
    category: "Quality Control",
    image: "/images/blog/pharma-quality-assurance.jpg",
    content: `
      Quality assurance lies at the heart of NovaTech’s operations.
      Our WHO-GMP certified facilities follow stringent SOPs, regular audits,
      and precision analytics at every production stage.
      From raw materials to final packaging, quality drives every process.
    `,
  },
  {
    id: 3,
    title: "Sustainable Practices in Modern Pharma",
    date: "September 29, 2025",
    category: "Sustainability",
    image: "/images/blog/eco-sustainability-lab.jpg",
    content: `
      Sustainability is not an option—it's a responsibility.
      NovaTech integrates renewable energy systems, water recycling,
      and zero liquid discharge (ZLD) processes across facilities to
      reduce environmental impact while maintaining production excellence.
    `,
  },
  // ... add other blog objects here as needed
];

export default function BlogDetails() {
  const { id } = useParams();
  const blog = blogData.find((b) => b.id === parseInt(id));

  if (!blog) {
    return (
      <div className="max-w-4xl mx-auto mt-20 text-center">
        <Breadcrumbs />
        <h2 className="text-xl text-gray-600">Blog not found.</h2>
      </div>
    );
  }

  const related = blogData.filter((b) => b.id !== blog.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f5f9fb] via-[#f3f8fa] to-[#e8f3f8]">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-[#0b1e39] via-[#18487d] to-[#3386bc] text-white py-10 shadow-md mb-10">
        <div className="max-w-6xl mx-auto px-6">
          <Breadcrumbs />
          <h1 className="text-3xl md:text-4xl font-bold mt-2">{blog.title}</h1>
          <div className="flex items-center gap-3 text-white/80 mt-2 text-sm">
            <span className="bg-[#e6f4fa]/20 text-white px-3 py-1 rounded-full">
              {blog.category}
            </span>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{blog.date}</span>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden mb-16">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-[400px] object-cover"
        />
        <div className="p-8 text-left">
          <div className="prose prose-lg text-gray-700 max-w-none">
            {blog.content.split("\n").map((para, idx) => (
              <p key={idx} className="mb-4 leading-relaxed">
                {para.trim()}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* RELATED POSTS */}
      <div className="max-w-6xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Related Articles
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {related.map((b) => (
            <Link
              key={b.id}
              to={`/blog/${b.id}`}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <img
                src={b.image}
                alt={b.title}
                className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {b.title}
                </h3>
                <p className="text-sm text-gray-600">{b.category}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
