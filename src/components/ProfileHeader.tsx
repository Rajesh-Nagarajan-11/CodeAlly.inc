
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
  cur_exp: number;
}

export default function ProfileHeader({ username, email, country, rank, cur_exp }: ProfileHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
        <div className="flex items-center gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-gray-900">{username}</h2>
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
