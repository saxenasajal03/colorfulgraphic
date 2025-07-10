import React from "react";

const blogPosts = [
  {
    image: "/images/blog1.jpg", // Replace with your actual image path
    title: "From eco-friendly labels to AR-powered prints - discover the top 5 custom printing trends redefining 2025.",
    summary: "From eco-friendly labels to AR-powered prints - discover the top 5 custom printing trends redefining 2025.",
    link: "#",
  },
  {
    image: "/images/blog2.jpg", // Replace with your actual image path
    title: "Summer's here, and so are the coolest ways to print your brand into every moment. Curious? Dive in.",
    summary: "Summer's here, and so are the coolest ways to print your brand into every moment. Curious? Dive in.",
    link: "#",
  },
];

const Blog = () => {
  return (
    <section className="max-w-screen-xl mx-auto px-4 sm:px-6 py-12 flex flex-col md:flex-row gap-8 items-stretch">
      {/* Left Side */}
      <div className="md:w-1/3 flex flex-col justify-center mb-6 md:mb-0">
        <h2 className="text-3xl font-bold text-blue-700 mb-2">From the blog.</h2>
        <p className="font-semibold text-lg text-gray-900 mb-2">Join us in exploring the world of print through our blog.</p>
        <p className="text-gray-700 mb-2">
          From choosing the ideal paper to creating remarkable prints, our articles are your compass to navigate the world of print. Whether you're creating cherished memories or business materials, we're here to guide you!{' '}
          <a href="#" className="text-blue-700 underline hover:text-blue-900">Read More</a>
        </p>
      </div>
      {/* Right Side */}
      <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {blogPosts.map((post, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col h-full">
            <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
            <div className="p-4 flex flex-col flex-1">
              <h3 className="font-semibold text-lg text-gray-900 mb-2">{post.title}</h3>
              {/* <p className="text-gray-700 mb-4 flex-1">{post.summary}</p> */}
              <div className="flex-1" />
              <a href={post.link} className="text-blue-700 underline hover:text-blue-900 mt-2 self-end">Read More</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Blog; 