import { motion } from 'framer-motion';
import { Trophy, Code, Brain, Target } from 'lucide-react';
import ProgressCard from '../components/ProgressCard';
import StatsCard from '../components/StatsCard';

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
            <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
              Start Coding
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatsCard
              title="Problem Solving"
              value="62/455"
              icon={Code}
              color="text-blue-500"
            />
            <StatsCard
              title="Course Completion"
              value="45%"
              icon={Brain}
              color="text-green-500"
            />
            <StatsCard
              title="Current Streak"
              value="5 days"
              icon={Target}
              color="text-purple-500"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ProgressCard
              title="Weekly Progress"
              items={[
                { label: 'Problems Solved', value: '15', trend: 'up' },
                { label: 'Study Hours', value: '24h' },
                { label: 'Achievements', value: '3', trend: 'up' }
              ]}
            />
            <ProgressCard
              title="Skill Progress"
              items={[
                { label: 'Array Problems', value: '15/20' },
                { label: 'String Manipulation', value: '12/15' },
                { label: 'Tree Navigation', value: '8/10' }
              ]}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}