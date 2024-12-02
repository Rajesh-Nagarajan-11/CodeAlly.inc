import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Brain, Award,Signal,SignalLowIcon,SignalMediumIcon} from 'lucide-react';
import { Link } from 'react-router-dom';
import { StatsCard } from '../components/StatsCard';
import Navbar from '../components/Navbar';



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
        SCHOOL: number,
        BASIC: number,
        EASY: number,
        MEDIUM: number,
        HARD: number;   
    }
}
interface leetbadger{
  badges:[
    {
      id:string,
      displayName:string,
      icon:string,
      CreationDate : string
    }
]
}

interface SkillStats {
  data: {
    matchedUser: {
      tagProblemCounts: {
        advanced: { tagName :string,tagSlug: string, problemsSolved: number }[];
        intermediate: { tagName:string,tagSlug: string, problemsSolved: number }[];
        fundamental: { tagName:string,tagSlug: string; problemsSolved: number }[];
      };
    };
  };
}
export default function Dashboard() {
  const [userData, setUserData] = useState<UserProfile | null>(null); // Type the state as UserProfile or null
  const [leetcodeStats, setLeetCodeStats] = useState<LeetCodeStats | null>(null);
  const[gfgstats,setgfgstats]=useState <GfGstats | null> (null);
  const[skillstats,setskillstats]=useState<SkillStats |null> (null);
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
          setUserData(data); 
          sessionStorage.setItem("username",data.user.fullName) // Store the whole response in userData
          
          // Fetch LeetCode stats using the username from the user data
          if (data.user.leetcodeUsername) {
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
             console.error('Error fetching GFG stats:', error);
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
              setleetbadge(leetbadge); 
            })
            .catch((error) => {
              console.error('Error fetching LeetCode Badge:', error);
            });
        }

        if(data.user.leetcodeUsername)
        {
          fetch(`http://localhost:3000/leetcode/skillStats/${data.user.leetcodeUsername}`,{
            method:'GET',
          }).then((response)=>
          {
            if(!response.ok)
              throw new Error(`HTTP error ! status : ${response.status}`);
              return response.json()
          })
          .then((skillstats)=>{
             setskillstats(skillstats);
          })
          .catch((error)=>{
            console.log('Error Fecthing leetcode skill stats :'+error)
          })
        }
      //console.log(skillstats?.data.matchedUser.tagProblemCounts.fundamental);
      //fundamental?.forEach(element => {
      //console.log(element.tagName)
      //console.log(element.problemsSolved)
      // });
      
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

  const isFullLink=(link:string)=>
  {
    const checklink:string="https://assets.leetcode.com";
    const checklink2:string="https://leetcode.com";
    return  link.match(checklink) ||link.match(checklink2)

  }
  const fundamental =skillstats?.data.matchedUser.tagProblemCounts.fundamental
  let fundamentalcnt=0;
  fundamental?.forEach(element => {
    fundamentalcnt+=element.problemsSolved;
  });
  
  const intermediate =skillstats?.data.matchedUser.tagProblemCounts.intermediate;
  let intermediatecnt=0;
  intermediate?.forEach(element=>{
    intermediatecnt+=element.problemsSolved;
  })
  const advanced =skillstats?.data.matchedUser.tagProblemCounts.advanced;
  let advancedcnt=0;
  advanced?.forEach(element =>{
    advancedcnt+=element.problemsSolved;
  })
  ; 
  return (
    <><Navbar /><div className="min-h-[calc(100vh-4rem)] bg-gray-50 py-8">
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
                  <span className="font-medium">{leetcodeStats?.easySolved == 0 ? '0 / 839' : leetcodeStats?.easySolved + ' / 839' || 'Loading...'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Medium Problems:</span>
                  <span className="font-medium">{leetcodeStats?.mediumSolved == 0 ? '0 / 1760 ' : leetcodeStats?.mediumSolved + '/ 1760' || 'Loading...'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Hard Problems:</span>
                  <span className="font-medium">{leetcodeStats?.hardSolved == 0 ? '0 / 769' : leetcodeStats?.hardSolved + ' / 769' || 'Loading'}</span>
                </div>
              </div>
            </StatsCard>

            <StatsCard
              title="GeeksforGeeks Stats"
              value={gfgstats ? `${gfgstats.totalProblemsSolved}` : 'Loading...'}
              icon={Brain}
              color="text-green-500"
              className="hover:shadow-lg transition-shadow duration-300"
            >
              <div className="mt-2 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Easy Problems:</span>
                  <span className="font-medium">{gfgstats?.details.EASY == 0 ? '0' : gfgstats?.details.EASY}</span>
                </div>
                <div className="flex justify-between">
                  <span>Medium Problems:</span>
                  <span className="font-medium">{gfgstats?.details.MEDIUM == 0 ? '0' : gfgstats?.details.MEDIUM}</span>
                </div>
                <div className="flex justify-between">
                  <span>Hard Problems:</span>
                  <span className="font-medium">{gfgstats?.details.HARD == 0 ? '0' : gfgstats?.details.HARD}</span>
                </div>
              </div>
            </StatsCard>

            <StatsCard
              title="Recent Award"
              icon={Award}
              color="text-yellow-500"
              imageUrl={leetbadge?.badges[0] != null ? isFullLink(leetbadge.badges[0].icon) ? leetbadge.badges[0].icon : "https://leetcode.com" + leetbadge.badges[0].icon : "https://static.vecteezy.com/system/resources/previews/008/255/803/non_2x/page-not-found-error-404-system-updates-uploading-computing-operation-installation-programs-system-maintenance-a-hand-drawn-layout-template-of-a-broken-robot-illustration-vector.jpg"}
              className="hover:shadow-lg transition-shadow duration-300">
              <span className="text-black text-center block">
                {leetbadge?.badges[0] != null ? leetbadge?.badges[0].displayName : ''}
              </span>

            </StatsCard>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            <StatsCard
              title="Fundamentals"
              value={fundamentalcnt + ' Points'} // You can replace this with a dynamic value if needed
              icon={SignalLowIcon}
              color="text-green-500"
              className="hover:shadow-lg transition-shadow duration-300"
            >
              <ul className="mt-2 text-sm space-y-1">
                {fundamental?.map((element, index) => (
                  <li key={index}>
                    {element.tagName} : {element.problemsSolved}
                  </li>
                ))}
              </ul>
            </StatsCard>


            <StatsCard
              title="Intermediate"
              value={intermediatecnt + ' Points'}
              icon={SignalMediumIcon}
              color="text-orange-500"
              className="hover:shadow-lg transition-shadow duration-300"
            >
              <ul className="mt-2 text-sm space-y-1">
                {intermediate?.map((element, index) => (
                  <li key={index}>
                    {element.tagName} : {element.problemsSolved}
                  </li>
                ))}
              </ul>
            </StatsCard>

            <StatsCard
              title="Advanced"
              value={advancedcnt + ' Points'}
              icon={Signal}
              color="text-red-500"
              className="hover:shadow-lg transition-shadow duration-300"
            >
              <ul className="mt-2 text-sm space-y-1">
                {advanced?.map((element, index) => (
                  <li key={index}>
                    {element.tagName} : {element.problemsSolved}
                  </li>
                ))}
              </ul>
            </StatsCard>
          </div>


        </motion.div>
      </div>
    </div></>
  );
}