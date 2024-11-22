import { motion } from 'framer-motion';
import { Users, ArrowUp, ArrowDown } from 'lucide-react';

export default function PeerComparison() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Peer Comparison</h1>

        {/* Performance vs Peers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm p-6 mb-8"
        >
          <div className="flex items-center gap-2 mb-6">
            <Users className="h-6 w-6 text-blue-500" />
            <h2 className="text-xl font-semibold">Your Performance vs Peers</h2>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Problem Solving Speed</span>
                <span className="text-green-500 flex items-center gap-1">
                  Top 15% <ArrowUp className="h-4 w-4" />
                </span>
              </div>
              <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-black w-[85%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Solution Quality</span>
                <span className="text-green-500 flex items-center gap-1">
                  Top 20% <ArrowUp className="h-4 w-4" />
                </span>
              </div>
              <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-black w-[80%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Consistency</span>
                <span className="text-red-500 flex items-center gap-1">
                  Bottom 40% <ArrowDown className="h-4 w-4" />
                </span>
              </div>
              <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-black w-[60%]" />
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Weekly Rankings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <h3 className="text-xl font-semibold mb-4">Weekly Rankings</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Problems Solved</span>
                <span className="text-green-500">#12 of 156</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Study Hours</span>
                <span className="text-green-500">#8 of 156</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Achievements</span>
                <span className="text-green-500">#15 of 156</span>
              </div>
            </div>
          </motion.div>

          {/* Skill Comparison */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <h3 className="text-xl font-semibold mb-4">Skill Comparison</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Array Problems</span>
                  <span>Above Average</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-[75%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">String Manipulation</span>
                  <span>Top Performer</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 w-[90%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Dynamic Programming</span>
                  <span>Needs Improvement</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 w-[45%]" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Learning Pace */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <h3 className="text-xl font-semibold mb-4">Learning Pace</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Your Pace</span>
                <span className="text-blue-500">15 problems/week</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Average Pace</span>
                <span>10 problems/week</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Top Performers</span>
                <span>20 problems/week</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}