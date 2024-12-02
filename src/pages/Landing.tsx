import { motion, useScroll, useTransform } from 'framer-motion';
import {Trophy, Rocket, Target } from 'lucide-react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Landing() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);

  return (
    <><Navbar /><div className="relative overflow-hidden">
      {/* Hero Section with Parallax */}
      <div ref={ref} className="relative h-screen">
        <motion.div
          style={{ y, opacity }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/20 z-10" />
          <img
            src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97"
            alt="Hero"
            className="w-full h-full object-cover" />
        </motion.div>

        <div className="relative z-20 h-full flex items-center justify-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto px-4 text-center"
          >
            <h1 className="text-6xl font-bold mb-6">Master Your Coding Journey</h1>
            <p className="text-xl mb-8">
              Join thousands of developers who are leveling up their skills with CodeAlly
            </p>
            <div className="flex justify-center gap-4">
              <Link
                to="/register"
                className="bg-red-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-red-600 transition-all transform hover:scale-105"
              >
                Start Learning
              </Link>
              <Link
                to="/login"
                className="bg-white text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105"
              >
                Sign In
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Why Choose CodeAlly?</h2>
            <p className="text-xl text-gray-600">Everything you need to become a better developer</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Trophy,
                title: "Achievement System",
                description: "Track your progress and earn badges as you master new concepts"
              },
              {
                icon: Rocket,
                title: "Performance Analytics",
                description: "Detailed insights into your coding performance and areas for improvement"
              },

              {
                icon: Target,
                title: "Goal Tracking",
                description: "Set and achieve your coding goals with our structured approach"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <feature.icon className="h-12 w-12 text-red-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-24 bg-gray-900">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1516116216624-53e697fedbea"
            alt="Background"
            className="w-full h-full object-cover opacity-20" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of developers who are already improving their skills with CodeAlly
            </p>
            <Link
              to="/register"
              className="inline-block bg-red-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-red-600 transition-all transform hover:scale-105"
            >
              Get Started Now
            </Link>
          </motion.div>
        </div>
      </div>
    </div></>
  );
}