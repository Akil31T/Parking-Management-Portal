import React from 'react';
import { ChevronDown } from 'lucide-react';

const FAQ = () => {
  const faqs = [
    {
      question: "What is TrueParking app?",
      answer: "The TrueParking app connects users with over 200,000 parking spaces across the UK, helping you find the perfect parking space when you need it."
    },
    {
      question: "What happens after I book a space?",
      answer: "After booking, you'll receive a confirmation email with all the details you need."
    },
    {
      question: "Will the parking space be available when I arrive?",
      answer: "Yes, your space is guaranteed to be available at your chosen time."
    },
    {
      question: "How do I cancel a booking?",
      answer: "You can cancel your booking through your account up to 24 hours before."
    }
  ];

  return (
    <div className="py-16 px-4 lg:px-20 bg-white">
      <h2 className="text-3xl font-bold mb-8 text-center">Have questions?</h2>
      <div className="max-w-3xl mx-auto">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b py-4">
            <button className="flex justify-between items-center w-full text-left">
              <span className="text-lg font-medium">{faq.question}</span>
              <ChevronDown className="text-emerald-500" />
            </button>
            <p className="mt-2 text-gray-600">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;