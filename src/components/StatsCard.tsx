import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../lib/util';

interface StatsCardProps {
  title: string;
  value?: string | number;
  icon?: LucideIcon;
  color?: string;
  imageUrl?: string;
  imageAlt?: string;
  className?: string;
  children?: React.ReactNode;
}

export function StatsCard({
  title,
  value,
  icon: Icon,
  color = 'text-primary',
  imageUrl,
  imageAlt,
  className,
  children,
}: StatsCardProps) {
  return (
    <div className={cn('rounded-xl border bg-card p-6 shadow-sm', className)}>
      <div className="flex items-center justify-between space-x-4">
        <div className="flex items-center space-x-4">
          {Icon && (
            <div className={cn('p-2 rounded-lg', color)}>
              <Icon className="h-5 w-5" />
            </div>
          )}
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            {value && <p className="text-2xl font-bold">{value}</p>}
          </div>
        </div>
      </div>

      {(imageUrl || children) && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-4"
        >
          {imageUrl && (
            <div className="relative h-32 w-full overflow-hidden rounded-lg bg-muted">
              <motion.img
                src={imageUrl}
                alt={imageAlt || 'Award badge'}
                className="h-full w-full object-contain transition-transform duration-300 hover:scale-110"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          )}
          {children}
        </motion.div>
      )}
    </div>
  );
}