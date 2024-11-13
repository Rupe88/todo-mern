import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { CheckCircle, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Homepage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#E81C4F] to-[#ff4778]"
      >
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Manage Your Tasks with मेरो Task
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Stay organized, focused, and in charge of all your tasks with our powerful task management solution.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/register"
              className="px-8 py-3 bg-white text-[#E81C4F] rounded-lg font-semibold hover:bg-opacity-90 transition-colors inline-flex items-center justify-center space-x-2"
            >
              <span>Get Started Free</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/features"
              className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-[#E81C4F] transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose मेरो Task?</h2>
            <p className="text-lg text-gray-600">Powerful features to boost your productivity</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<CheckCircle className="h-8 w-8 text-[#E81C4F]" />}
              title="Easy Task Management"
              description="Create, organize, and track your tasks with intuitive tools"
            />
            <FeatureCard
              icon={<Star className="h-8 w-8 text-[#E81C4F]" />}
              title="Priority Setting"
              description="Set task priorities and never miss important deadlines"
            />
            <FeatureCard
              icon={<CheckCircle className="h-8 w-8 text-[#E81C4F]" />}
              title="Progress Tracking"
              description="Monitor your progress with visual charts and statistics"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
  >
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

// Add PropTypes validation for FeatureCard props
FeatureCard.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default Homepage;
