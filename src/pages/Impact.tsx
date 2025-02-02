import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Heart, DollarSign, PhoneCall, Star } from 'lucide-react';

const Impact = () => {
  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Measurable Impact on Your Business
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform delivers tangible results that transform your BPO operations
            and drive significant business value.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-lg text-center"
            >
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-4xl font-bold text-blue-600 mb-2">{stat.value}</h3>
              <p className="text-gray-600">{stat.title}</p>
            </motion.div>
          ))}
        </div>

        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.company}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-8 rounded-xl shadow-lg"
              >
                <div className="flex items-center mb-6">
                  <img
                    src={study.image}
                    alt={study.company}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <h3 className="text-xl font-bold text-gray-900">{study.company}</h3>
                    <p className="text-gray-600">{study.industry}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-6">{study.description}</p>
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400" />
                  <p className="ml-2 text-gray-600">{study.result}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-blue-600 text-white rounded-xl p-8 text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Operations?</h2>
          <p className="text-xl mb-8">Join the growing number of businesses achieving exceptional results with ServicEase.</p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-50 transition-colors duration-200">
            Schedule a Demo
          </button>
        </motion.div>
      </div>
    </div>
  );
};

const stats = [
  {
    title: 'Agent Time Saved',
    value: '40%',
    icon: Clock
  },
  {
    title: 'Customer Satisfaction',
    value: '30%',
    icon: Heart
  },
  {
    title: 'Reduced Costs',
    value: '25%',
    icon: DollarSign
  },
  {
    title: 'More Calls Handled',
    value: '50%',
    icon: PhoneCall
  }
];

const caseStudies = [
  {
    company: 'Global Support Solutions',
    industry: 'Customer Service',
    description: 'Implemented ServicEase across their 500+ agent workforce, resulting in dramatic improvements in handling time and customer satisfaction scores.',
    result: 'Achieved 45% reduction in average handling time',
    image: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80'
  },
  {
    company: 'TechCare BPO',
    industry: 'Technical Support',
    description: 'Leveraged our AI-powered agent assistance to enhance first-call resolution rates and reduce escalations significantly.',
    result: 'Improved first-call resolution by 35%',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
  }
];

export default Impact;