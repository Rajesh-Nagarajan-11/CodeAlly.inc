import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface PlatformData {
  name: string;
  easy: number;
  medium: number;
  hard: number;
  violet?: number;
}

interface PlatformStatsProps {
  data: PlatformData[];
  title?: string;
  className?: string;
}

export default function PlatformStats({ 
  data, 
  title = "Coding Platform Statistics",
  className = ""
}: PlatformStatsProps) {
  return (
    <div className={`w-full h-96 bg-white/25 backdrop-blur-lg rounded-xl p-6 ${className}`}>
      <h2 className="text-2xl font-bold text-black mb-6">{title}</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barCategoryGap="20%" // Remove gap between bar groups
          barGap={0} // Remove gap between bars in the same group
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
          <XAxis 
            dataKey="name" 
            stroke="#000" // Change XAxis text color to black
            tick={{ fill: '#000' }} // Change tick color to black
          />
          <YAxis 
            stroke="#000" // Change YAxis text color to black
            tick={{ fill: '#000' }} // Change tick color to black
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(17, 24, 39, 0.9)',
              border: 'none',
              borderRadius: '8px',
              color: '#000', // Change tooltip text color to black
              padding: '8px',
            }}
            cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }}
          />
          <Legend 
            wrapperStyle={{ color: '#000' }} // Change legend text color to black
          />
          <Bar 
            dataKey="easy" 
            stackId="a" 
            fill="#4ade80" 
            name="Easy"
            radius={[0, 0, 0, 0]} // Remove rounded corners
          />
          <Bar 
            dataKey="medium" 
            stackId="a" 
            fill="#fb923c" 
            name="Medium"
            radius={[0, 0, 0, 0]} // Remove rounded corners
          />
          <Bar 
            dataKey="hard" 
            stackId="a" 
            fill="#ef4444" 
            name="Hard"
            radius={[0, 0, 0, 0]} // Remove rounded corners
          />
          <Bar 
            dataKey="violet" 
            stackId="a" 
            fill="#a855f7" 
            name="Extreme"
            radius={[0, 0, 0, 0]} // Remove rounded corners
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
