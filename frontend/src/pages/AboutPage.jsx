import { motion } from 'framer-motion';
import { Laptop, PenTool, Users, Briefcase, ChartLine, Layout } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="max-w-md mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-[#E81C4F] to-[#FF4D7D] bg-clip-text text-transparent">About Mero Todo</h1>

      <div className="space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center space-x-4"
        >
          <Laptop size={32} className="text-[#E81C4F]" />
          <div>
            <h3 className="text-xl font-medium">Powerful Todo Management</h3>
            <p className="text-gray-500">Mero Todos intuitive interface and advanced features help you stay on top of your tasks, from simple to-do lists to complex projects.</p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="flex items-center space-x-4"
        >
          <Users size={32} className="text-[#FF4D7D]" />
          <div>
            <h3 className="text-xl font-medium">Streamlined Collaboration</h3>
            <p className="text-gray-500">Mero Todo makes it easy to work with your team, share tasks, and stay aligned on project progress.</p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="flex items-center space-x-4"
        >
          <PenTool size={32} className="text-[#E81C4F]" />
          <div>
            <h3 className="text-xl font-medium">Customizable Workflows</h3>
            <p className="text-gray-500">Tailor Mero Todo to your unique needs with personalized views, custom tags, and automated workflows.</p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="flex items-center space-x-4"
        >
          <Briefcase size={32} className="text-[#FF4D7D]" />
          <div>
            <h3 className="text-xl font-medium">Enterprise-Grade Security</h3>
            <p className="text-gray-500">Mero Todos robust security features and data encryption ensure your information stays safe and compliant.</p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="flex items-center space-x-4"
        >
          <ChartLine size={32} className="text-[#E81C4F]" />
          <div>
            <h3 className="text-xl font-medium">Powerful Analytics</h3>
            <p className="text-gray-500">Gain insights into your teams productivity, task completion, and project performance with Mero Todos advanced analytics.</p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="flex items-center space-x-4"
        >
          <Layout size={32} className="text-[#FF4D7D]" />
          <div>
            <h3 className="text-xl font-medium">Flexible Integrations</h3>
            <p className="text-gray-500">Seamlessly connect Mero Todo with your existing tools and workflows, from project management to communication apps.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;