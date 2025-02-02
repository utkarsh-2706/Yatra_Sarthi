import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Clock, Heart, Database, Bot, BarChart, MessageSquare } from 'lucide-react';

const Features = () => {
  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Powerful Features for Modern BPOs
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive suite of AI-powered tools revolutionizes how BPO operations handle customer service,
            delivering efficiency and excellence at every touchpoint.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <feature.icon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600 mb-4">{feature.description}</p>
              <ul className="space-y-2">
                {feature.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span className="text-gray-600">{benefit}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const features = [
  {
    title: 'Intelligent Callback Scheduling',
    description: 'Smart prioritization system that optimizes follow-up calls based on urgency and customer preferences.',
    icon: Clock,
    benefits: [
      'AI-driven priority assessment',
      'Automated scheduling optimization',
      'Real-time availability management',
      'Customer preference integration'
    ]
  },
  {
    title: 'Sentiment Analysis for Live Calls',
    description: 'Real-time emotion detection and analysis to enhance agent-customer interactions.',
    icon: Heart,
    benefits: [
      'Live emotion tracking',
      'Tone analysis and suggestions',
      'Risk detection alerts',
      'Customer satisfaction prediction'
    ]
  },
  {
    title: 'Dynamic Knowledge Base',
    description: 'Context-aware solution database that learns and evolves with each interaction.',
    icon: Database,
    benefits: [
      'Self-learning documentation',
      'Contextual search capabilities',
      'Automated content updates',
      'Integration with CRM systems'
    ]
  },
  {
    title: 'RPA-Powered Task Automation',
    description: 'Streamline repetitive tasks and data entry processes with intelligent automation.',
    icon: Bot,
    benefits: [
      'Automated data entry',
      'Form processing',
      'System integration',
      'Error reduction'
    ]
  },
  {
    title: 'Performance Analytics Dashboard',
    description: 'Comprehensive insights into operational efficiency and agent performance.',
    icon: BarChart,
    benefits: [
      'Real-time performance tracking',
      'Custom KPI monitoring',
      'Trend analysis',
      'Predictive analytics'
    ]
  },
  {
    title: 'AI-Powered Agent Assistants',
    description: 'Intelligent support system providing real-time guidance and insights to agents.',
    icon: Brain,
    benefits: [
      'Real-time suggestions',
      'Predictive responses',
      'Process guidance',
      'Learning from top performers'
    ]
  }
];

export default Features;