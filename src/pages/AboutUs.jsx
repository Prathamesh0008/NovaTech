import React from "react";
import Breadcrumbs from "../components/Breadcrumbs";
import AboutBackground from "../components/AboutBackground";
import DNAOverlay from "../components/DNAOverlay";
import { Title, Meta, Link as LinkTag } from "react-head";


export default function AboutUs() {
  return (
    <div className="max-w-full mx-auto mt-5 text-center">
      <Title>About NovaTech Sciences | Pharmaceutical Steroid Products</Title>
<Meta name="description" content="Discover NovaTech Sciences, a leader in premium steroid formulations and performance-enhancing medicines, delivering trusted quality, innovation, and pharmaceutical excellence worldwide." />
<Meta name="keywords" content="Steroid Pharma Maker, steroid pharma company, injectable steroid manufacturer" />
<Meta name="robots" content="index, follow" />
<LinkTag rel="canonical" href="https://novatechsciences.com/about" />
<script type="application/ld+json">
{`
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://novatechsciences.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Blog",
      "item": "https://novatechsciences.com/blog"
    }
  ]
}
`}
</script>


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
