import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface ProgressItem {
  label: string;
  value: string;
  trend?: 'up' | 'down';
}

interface ProgressCardProps {
  title: string;
  items: ProgressItem[];
}

export default function ProgressCard({ title, items }: ProgressCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-xl shadow-sm"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className="text-gray-600">{item.label}</span>
            <div className="flex items-center space-x-2">
              <span className="font-semibold">{item.value}</span>
              {item.trend === 'up' && (
                <ArrowUpRight className="h-4 w-4 text-green-500" />
              )}
              {item.trend === 'down' && (
                <ArrowDownRight className="h-4 w-4 text-red-500" />
              )}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}