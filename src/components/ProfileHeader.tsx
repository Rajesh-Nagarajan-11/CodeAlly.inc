import { Users, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import CountryFlag from './CountryFlag';
import RankBadge from './RankBadge';
import { countries } from '../lib/countries';

interface ProfileHeaderProps {
  username: string;
  email: string;
  country: string;
  rank: {
    current: {
      name: string;
      color: string;
      level: number;
    };
    nextLevelExperience: number;
  };
  cur_exp:number;
  onShare: () => void;
}

export default function ProfileHeader({ username, email, country, rank,cur_exp ,onShare }: ProfileHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
        <div className="flex items-center gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-gray-900">{username}</h2>
              <button
                onClick={onShare}
                className="inline-flex items-center p-1.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
                title="Share Profile"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
            <p className="text-gray-600">{email}</p>
            {country && (
              <div className="flex items-center gap-2 mt-2">
                <CountryFlag countryCode={country} size="sm" />
                <span className="text-gray-600">
                  {countries.find(c => c.code === country)?.name}
                </span>
              </div>
            )}
          </div>
          <Link
            to="/friends"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
          >
            <Users className="w-4 h-4 mr-2" />
            My Friends
          </Link>
        </div>
        <div className="w-full md:w-64">
          <RankBadge
            rank={rank.current}
            experience={cur_exp}
            nextLevelExperience={rank.nextLevelExperience}
          />
        </div>
      </div>
    </div>
  );
}