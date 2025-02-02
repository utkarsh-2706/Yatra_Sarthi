import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart, Clock, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
            >
              Revolutionizing Claims Processing with AI
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
            >
              Transform your BPO operations with our AI-powered workflow automation platform.
              Enhance efficiency, reduce costs, and deliver exceptional customer experiences.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Link
                to="/features"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center"
              >
                Learn More <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/contact"
                className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-50 transition-colors duration-200"
              >
                Book a Demo
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center p-6 rounded-xl bg-blue-50"
            >
              <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-4xl font-bold text-gray-900 mb-2">40%</h3>
              <p className="text-gray-600">Agent Time Saved</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center p-6 rounded-xl bg-green-50"
            >
              <Heart className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-4xl font-bold text-gray-900 mb-2">30%</h3>
              <p className="text-gray-600">Increased Customer Satisfaction</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-center p-6 rounded-xl bg-purple-50"
            >
              <BarChart className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-4xl font-bold text-gray-900 mb-2">50%</h3>
              <p className="text-gray-600">More Calls Handled</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Powerful Features for Modern BPOs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform combines cutting-edge AI technology with intuitive workflow automation
              to transform your operations.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                <feature.icon className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const features = [
  {
    title: 'Intelligent Callback Scheduling',
    description: 'Automatically prioritize follow-ups based on urgency and customer preferences.',
    icon: Clock
  },
  {
    title: 'Sentiment Analysis',
    description: 'Real-time analysis of customer emotions to enhance agent communication.',
    icon: Heart
  },
  {
    title: 'Performance Analytics',
    description: 'Comprehensive dashboard tracking productivity and resolution times.',
    icon: BarChart
  }
];

export default Home;