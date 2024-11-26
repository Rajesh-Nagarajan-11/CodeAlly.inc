import { motion } from 'framer-motion';
import { Code, Brain, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { StatsCard } from '../components/StatsCard';

export default function Dashboard() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Welcome back, Alex!</h1>
            <Link 
              to="/code" 
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
            >
              Start Coding
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatsCard
              title="LeetCode Stats"
              value="62/455"
              icon={Code}
              color="text-blue-500"
            >
              <div className="mt-2 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Easy Problems:</span>
                  <span className="font-medium">20</span>
                </div>
                <div className="flex justify-between">
                  <span>Medium Problems:</span>
                  <span className="font-medium">25</span>
                </div>
                <div className="flex justify-between">
                  <span>Hard Problems:</span>
                  <span className="font-medium">17</span>
                </div>
              </div>
            </StatsCard>

            <StatsCard
              title="GeeksforGeeks Stats"
              value="34/200"
              icon={Brain}
              color="text-green-500"
            >
              <div className="mt-2 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Easy Problems:</span>
                  <span className="font-medium">10</span>
                </div>
                <div className="flex justify-between">
                  <span>Medium Problems:</span>
                  <span className="font-medium">15</span>
                </div>
                <div className="flex justify-between">
                  <span>Hard Problems:</span>
                  <span className="font-medium">9</span>
                </div>
              </div>
            </StatsCard>

            <StatsCard
              title="Recent Award"
              icon={Award}
              color="text-yellow-500"
              imageUrl="https://assets.leetcode.com/static_assets/marketing/2024-50.gif"
              imageAlt="LeetCode Achievement Badge"
              className="hover:shadow-lg transition-shadow duration-300"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white shadow rounded-lg p-6"
            >
              <h3 className="text-lg font-semibold mb-4">Skill Progress</h3>
              <ul className="space-y-3">
                <li className="flex justify-between items-center">
                  <span className="text-gray-600">Array Problems</span>
                  <span className="font-semibold">15/20</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-gray-600">String Manipulation</span>
                  <span className="font-semibold">12/15</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-gray-600">Tree Navigation</span>
                  <span className="font-semibold">8/10</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}