import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Zap, Shield, Workflow } from 'lucide-react';

const Uniqueness = () => {
  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            What Makes ServicEase Unique
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our innovative approach combines cutting-edge AI technology with deep industry expertise
            to deliver unparalleled value to BPO operations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {uniqueFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="p-8">
                <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                  <feature.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 mb-6">{feature.description}</p>
                <ul className="space-y-3">
                  {feature.points.map((point, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span className="text-gray-600">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-blue-600 text-white rounded-xl p-8 md:p-12"
        >
          <h2 className="text-3xl font-bold mb-6 text-center">Innovation at Every Level</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {innovationPoints.map((point, index) => (
              <div key={index} className="text-center">
                <div className="bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <point.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{point.title}</h3>
                <p className="text-blue-100">{point.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const uniqueFeatures = [
  {
    title: 'AI-Driven Workflow Automation',
    description: 'Our advanced AI engine transforms traditional BPO processes into intelligent, automated workflows.',
    icon: Brain,
    points: [
      'Real-time sentiment analysis for enhanced customer understanding',
      'Automated task prioritization based on machine learning',
      'Predictive analytics for resource optimization',
      'Continuous learning and improvement system'
    ]
  },
  {
    title: 'Smart Agent Support System',
    description: 'Empower your agents with AI-powered tools that enhance their capabilities and efficiency.',
    icon: Workflow,
    points: [
      'Real-time assistance with context-aware suggestions',
      'Adaptive solutions based on historical success rates',
      'Automated quality monitoring and feedback',
      'Personalized agent development paths'
    ]
  }
];

const innovationPoints = [
  {
    title: 'Cutting-Edge AI',
    description: 'Latest advancements in machine learning and natural language processing',
    icon: Brain
  },
  {
    title: 'Lightning Fast',
    description: 'Real-time processing and response generation',
    icon: Zap
  },
  {
    title: 'Enterprise Ready',
    description: 'Built for scale with enterprise-grade security',
    icon: Shield
  }
];

export default Uniqueness;