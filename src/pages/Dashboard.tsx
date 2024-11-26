import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Brain, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { StatsCard } from '../components/StatsCard';



// Define the interface for the response data
interface UserProfile {
  user: {
    fullName: string;
    email: string;
    leetcodeUsername: string;
    gfgUsername: string;
  };
}

interface LeetCodeStats {
  solvedProblem: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
}
interface GfGstats{
    userName: string,
    totalProblemsSolved: number,
    details: {
        School: number,
        Basic: number,
        Easy: number,
        Medium: number,
        Hard: number,
        userName: string,
        totalProblemsSolved: number
    }
}
interface leetbadger{
  activeBadge: {
    id: string,
    displayName: string,
    icon: string,
    creationDate: Date
}
}

export default function Dashboard() {
  const [userData, setUserData] = useState<UserProfile | null>(null); // Type the state as UserProfile or null
  const [leetcodeStats, setLeetCodeStats] = useState<LeetCodeStats | null>(null);
  const[gfgstats,setgfgstats]=useState <GfGstats | null> (null);
  const[leetbadge,setleetbadge]=useState<leetbadger | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user profile data
  useEffect(() => {
    const token = getJwtToken(); // Replace with the actual logic to get the token
    
    if (token) {
      // Fetch user profile data
      fetch('http://localhost:3000/api/user/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUserData(data);  // Store the whole response in userData
          
          // Fetch LeetCode stats using the username from the user data
          if (data.user.leetcodeUsername) {
            // No headers required for LeetCode stats
            fetch(`http://localhost:3000/leetcode/${data.user.leetcodeUsername}/solved`, {
              method: 'GET',
            })
              .then((response) => response.json())
              .then((leetcodeData) => {
                setLeetCodeStats(leetcodeData);  // Store LeetCode stats
              })
              .catch((error) => {
                console.error('Error fetching LeetCode stats:', error);
              });
          }
          if(data.user.gfgUsername)
          {
            fetch(`http://localhost:3000/gfg/?userName=${data.user.gfgUsername}`,{
              method:'GET',
            })
            .then((response)=>response.json())
            .then((gfgstats)=>{
              setgfgstats(gfgstats);
             })
            .catch((error) => {
             console.error('Error fetching LeetCode stats:', error);
             });
          }
        
        if (data.user.leetcodeUsername) {
          fetch(`http://localhost:3000/leetcode/${data.user.leetcodeUsername}/badges`, {
            method: 'GET',
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
              return response.json();
            })
            .then((leetbadge) => {
              setleetbadge(leetbadge); // Ensure setleetbadge is defined and usable
            })
            .catch((error) => {
              console.error('Error fetching LeetCode stats:', error);
            });
        }
    })
        .catch((error) => {
          console.error('Error fetching user profile:', error);
        })
        .finally(() => setLoading(false));
    }
  }, []);
  console.log(userData?.user.fullName);

  // Placeholder function for token retrieval (replace with your logic)
  const getJwtToken = () => {
    console.log(localStorage.getItem('token'));
    return localStorage.getItem('token'); // Change this to whatever method you prefer
  };

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
            <h1 className="text-2xl font-bold text-gray-900">
              {loading ? 'Loading...' : `Welcome back, ${userData?.user.fullName || 'User'}!`}
            </h1>
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
              value={leetcodeStats ? `${leetcodeStats.solvedProblem}/3368` : 'Loading...'}
              icon={Code}
              color="text-blue-500"
              className="hover:shadow-lg transition-shadow duration-300"
            >
              <div className="mt-2 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Easy Problems:</span>
                  <span className="font-medium">{leetcodeStats?.easySolved +' / 839'|| 'Loading...'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Medium Problems:</span>
                  <span className="font-medium">{leetcodeStats?.mediumSolved +' / 1760'|| 'Loading...'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Hard Problems:</span>
                  <span className="font-medium">{leetcodeStats?.hardSolved ==0?'0 / 769':leetcodeStats?.hardSolved+' / 769'}</span>
                </div>
              </div>
            </StatsCard>

            <StatsCard
              title="GeeksforGeeks Stats"
              value={gfgstats ? `${gfgstats.details.totalProblemsSolved}` : 'Loading...'}
              icon={Brain}
              color="text-green-500"
              className="hover:shadow-lg transition-shadow duration-300"
            >
              <div className="mt-2 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Easy Problems:</span>
                  <span className="font-medium">{gfgstats?.details.Easy==0?'0' :gfgstats?.details.Easy}</span>
                </div>
                <div className="flex justify-between">
                  <span>Medium Problems:</span>
                  <span className="font-medium">{gfgstats?.details.Medium==0?'0' :gfgstats?.details.Medium}</span>
                </div>
                <div className="flex justify-between">
                  <span>Hard Problems:</span>
                  <span className="font-medium">{gfgstats?.details.Hard==0?'0': gfgstats?.details.Hard}</span>
                </div>
              </div>
            </StatsCard>

            <StatsCard
              title="Recent Award"
              icon={Award}
              color="text-yellow-500"
              imageUrl={leetbadge?leetbadge.activeBadge.icon :'https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg'}
              imageAlt="LeetCode Achievement Badge"
              className="hover:shadow-lg transition-shadow duration-300">
              <span className="text-black text-center block">
              {leetbadge?leetbadge?.activeBadge.displayName:''}
              </span>

              </StatsCard>
            
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
