import { motion } from 'framer-motion';
import { Clock, Database, Plus } from 'lucide-react';
import CodeEditor from '../components/CodeEditor';
import Navbar from '../components/Navbar';
import CopyrightFooter from '../components/CopyrightFooter';

export default function CodeOptimization() {
  return (
    <><Navbar/>
    <div className="min-h-screen bg-gray-50">
      <div className="bg-red-500 text-white py-4 px-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Code Optimization Analysis</h1>
        <div className="bg-white text-gray-900 px-4 py-1 rounded-full">23:45</div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm overflow-hidden mb-8"
        >
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold mb-2">Problem: Find Maximum Subarray</h2>
            <p className="text-gray-600">
              Given an integer array nums, find the subarray with the largest sum, and return its sum.
            </p>
            <span className="inline-block bg-red-100 text-red-800 text-sm px-3 py-1 rounded-full mt-2">
              Medium
            </span>
          </div>

          <CodeEditor />

          <div className="flex gap-4 p-4 border-t border-gray-200">
            <button className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors">
              Run Tests
            </button>
            <button className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors">
              Submit
            </button>
            <button className="ml-auto bg-white text-gray-900 px-6 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
              View Solution
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Optimization Score */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <h3 className="text-xl font-semibold mb-4">Optimization Score</h3>
            <div className="relative w-32 h-32 mx-auto">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#eee"
                  strokeWidth="3"
                />
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="3"
                  strokeDasharray="45, 100"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold">45%</div>
                  <div className="text-sm text-gray-500">Score</div>
                </div>
              </div>
            </div>
            <div className="text-center mt-4 text-gray-600">Needs Improvement</div>
          </motion.div>

          {/* Performance Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <h3 className="text-xl font-semibold mb-4">Performance Metrics</h3>
            <div className="space-y-4">
              <div className="bg-red-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-gray-700">
                  <Clock className="h-5 w-5" />
                  Time Complexity: O(n²)
                </div>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-gray-700">
                  <Database className="h-5 w-5" />
                  Space Complexity: O(1)
                </div>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-gray-700">
                  Runtime: 456ms
                </div>
              </div>
            </div>
          </motion.div>

          {/* Optimization Suggestions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <h3 className="text-xl font-semibold mb-4">Optimization Suggestions</h3>
            <div className="space-y-4">
              <div className="border border-red-200 rounded-lg">
                <button className="w-full flex items-center justify-between p-4 text-left">
                  <span className="font-medium">Use Kadane's Algorithm</span>
                  <Plus className="h-5 w-5" />
                </button>
                <div className="px-4 pb-4 text-sm text-gray-600">
                  <ul className="list-disc list-inside space-y-1">
                    <li>Reduce time complexity to O(n)</li>
                    <li>Track maximum sum using dynamic programming</li>
                  </ul>
                </div>
              </div>
              <div className="border border-red-200 rounded-lg">
                <button className="w-full flex items-center justify-between p-4 text-left">
                  <span className="font-medium">Memory Optimization</span>
                  <Plus className="h-5 w-5" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
    <CopyrightFooter /></>
  );
}