import React from 'react';
import { Star } from 'lucide-react';

const FeedbackCard = ({ name, rating, comment, avatar }) => (
  <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200">
    <div className="flex items-center mb-4">
      <img src={avatar} alt={name} className="w-12 h-12 rounded-full mr-4" />
      <div>
        <h4 className="font-semibold text-gray-900">{name}</h4>
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={18}
              className={i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
            />
          ))}
        </div>
      </div>
    </div>
    <p className="text-gray-700">"{comment}"</p>
  </div>
);

const Feedback = ({ feedbackItems }) => {
  return (
    <section className="bg-white py-12">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {feedbackItems.map((item, index) => (
            <FeedbackCard
              key={index}
              name={item.name}
              rating={item.rating}
              comment={item.comment}
              avatar={item.avatar}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Feedback; 