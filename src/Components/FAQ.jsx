import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const AccordionItem = ({ question, answer, isOpen, onClick }) => (
  <div className="border-b border-gray-200 py-4">
    <button
      onClick={onClick}
      className="w-full flex justify-between items-center text-left focus:outline-none"
    >
      <span className="text-base font-medium text-gray-800">{question}</span>
      {isOpen ? <Minus size={20} className="text-gray-600" /> : <Plus size={20} className="text-gray-600" />}
    </button>
    {isOpen && (
      <div className="mt-3 text-gray-600">
        <p>{answer}</p>
      </div>
    )}
  </div>
);

const FAQ = ({ questions }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const midPoint = Math.ceil(questions.length / 2);
  const leftColumnQuestions = questions.slice(0, midPoint);
  const rightColumnQuestions = questions.slice(midPoint);

  return (
    <section className="bg-white py-12">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-gray-900 text-left mb-8">
          Frequently Asked Questions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-8">
          <div>
            {leftColumnQuestions.map((item, index) => (
              <AccordionItem
                key={index}
                question={item.question}
                answer={item.answer}
                isOpen={openIndex === index}
                onClick={() => handleClick(index)}
              />
            ))}
          </div>
          <div>
            {rightColumnQuestions.map((item, index) => {
                const actualIndex = index + midPoint;
                return (
                  <AccordionItem
                    key={actualIndex}
                    question={item.question}
                    answer={item.answer}
                    isOpen={openIndex === actualIndex}
                    onClick={() => handleClick(actualIndex)}
                  />
                );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ; 