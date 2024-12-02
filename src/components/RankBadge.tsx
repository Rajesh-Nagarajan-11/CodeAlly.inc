import { Trophy } from 'lucide-react';

interface RankBadgeProps {
  rank: {
    name: string;
    color: string;
    level: number;
  };
  experience: number;
  nextLevelExperience: number;
}

export default function RankBadge({ rank, experience, nextLevelExperience }: RankBadgeProps) {
  const progress = (experience / nextLevelExperience) * 100;

  return (
    <div className="bg-white rounded-lg p-4 border border-gray-300 shadow">
      <div className="flex items-center gap-3 mb-3">
        <div className={`p-2 rounded-lg ${rank.color}`}>
          <Trophy className="w-6 h-6 text-white" />
        </div>
        <div>
          <h4 className="text-gray-800 font-semibold">{rank.name}</h4>
          <p className="text-gray-600 text-sm">Level {rank.level}</p>
        </div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
        <div
          className={`h-full rounded-full ${rank.color.replace('bg-', 'bg-opacity-75 bg-')}`}
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-gray-600 text-xs">
        {experience} / {nextLevelExperience} XP to next level
      </p>
    </div>
  );
}
