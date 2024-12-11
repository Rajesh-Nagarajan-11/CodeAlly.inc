import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { StatsCard } from '../components/StatsCard';
import Navbar from '../components/Navbar';
import PlatformStats from '../components/PlatformStats';

// Define the interface for the response data
interface UserProfile {
  user: {
    fullName: string;
    email: string;
    leetcodeUsername: string;
    gfgUsername: string;
    codeforceUsername:string;
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

interface codeforcesStats{
    totalsolved:number,
    easysolved: number,
    mediumsolved: number,
    hardsolved: number,
    extremesolved: number,
    unratingsolved: number
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
interface motivational{
  date:Date;
  motivational:string
}
export default function Dashboard() {
  const [userData, setUserData] = useState<UserProfile | null>(null); // Type the state as UserProfile or null
  const [leetcodeStats, setLeetCodeStats] = useState<LeetCodeStats | null>(null);
  const[gfgstats,setgfgstats]=useState <GfGstats | null> (null);
  const[skillstats,setskillstats]=useState<SkillStats |null> (null);
  const[leetbadge,setleetbadge]=useState<leetbadger | null>(null);
  const[codeforcesStats,setcodeforcesStats]=useState<codeforcesStats |null>(null);
  const[motivational,setmotivational]=useState<motivational |null>(null);
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

        if(data.user.codeforceUsername)
        {
          fetch(`http://localhost:3000/codeforce/${data.user.codeforceUsername}`,{
            method:'GET',
          }).then((response)=>
          {
            if(!response.ok)
              throw new Error(`HTTP error ! status : ${response.status}`);
              return response.json()
          })
          .then((codeforcesStats)=>{
            setcodeforcesStats(codeforcesStats);
          })
          .catch((error)=>{
            console.log('Error Fecthing codeforces skill stats :'+error)
          })
        }
      //console.log(skillstats?.data.matchedUser.tagProblemCounts.fundamental);
      //fundamental?.forEach(element => {
      //console.log(element.tagName)
      //console.log(element.problemsSolved)
      // });
      function getCurrentDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const day = String(today.getDate()).padStart(2, '0');
    
        return `${year}-${month}-${day}`;
    }
    const date =getCurrentDate();
    
    fetch(`http://localhost:3000/motivational/${date}`, {
      method: 'GET'
      }).then((response)=>
        {
          if(!response.ok)
            throw new Error(`HTTP error ! status : ${response.status}`);
            return response.json()
        })
        .then((motivational)=>{
          setmotivational(motivational);
        })
        .catch((error)=>{
          console.log('Error Fecthing motivational :'+error)
        })
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
  const platformData = [
    {
      name: 'Leetcode',
      easy: leetcodeStats?.easySolved || 0,
      medium: leetcodeStats?.mediumSolved ||0,
      hard: leetcodeStats?.hardSolved || 0,
    },
    {
      name: 'GFG',
      easy: gfgstats?.details.EASY || 0,
      medium: gfgstats?.details.MEDIUM || 0,
      hard: gfgstats?.details.HARD || 0,
    },
    {
      name: 'Codeforces',
      easy: codeforcesStats?.easysolved || 0,
      medium: codeforcesStats?.mediumsolved || 0,
      hard: codeforcesStats?.hardsolved || 0,
      violet: codeforcesStats?.extremesolved || 0,
    },
  ];

  function calculateexp() {
    // Initialize exp to 0 initially, and retrieve the stored value from localStorage if it exists
    let exp = 0;  // Start with 0
  
    // Retrieve stored experience points from localStorage if available
    //const storedExp = localStorage.getItem("exp");
    //if (storedExp) {
      //exp = parseInt(storedExp);  // Parse the value if it's not null
    //}
  
    // Add experience points based on different stats
    exp += leetcodeStats ? leetcodeStats?.solvedProblem * 5 : 0;
    exp += gfgstats ? gfgstats.totalProblemsSolved * 5 : 0;
    exp += codeforcesStats ? codeforcesStats.totalsolved * 10 : 0;
    exp += fundamentalcnt * 2;
    exp += intermediatecnt * 5;
    exp += advancedcnt * 10;
  
    // Store the updated exp value back to localStorage
    localStorage.setItem("exp", exp.toString()); // Store exp as a string
  }
  
  // Call calculateexp on page load
  calculateexp();
  
  
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
            <div className="overflow-hidden whitespace-nowrap relative bg-white/10 max-w-[600px]">
  <div className="animate-marquee inline-block">
    <p className="text-lg font-bold text-red-600">
      {motivational?.motivational}
    </p>
  </div>
</div>

<Link
  to="/code"
  className="bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600 transition-colors mt-4 inline-block"
>
  Start Coding
</Link>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatsCard
              title="Leetcode Stats"
              value={leetcodeStats ? `${leetcodeStats.solvedProblem}/3368` : 'Loading...'}
              icon="https://cdn.iconscout.com/icon/free/png-512/free-leetcode-logo-icon-download-in-svg-png-gif-file-formats--technology-social-media-vol-4-pack-logos-icons-2944960.png?f=webp&w=256"
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
              title="Geeks for Geeks Stats"
              value={gfgstats ? `${gfgstats.totalProblemsSolved}` : 'Loading...'}
              icon="https://img.icons8.com/color/512/GeeksforGeeks.png"
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
              title="Codeforces Stats"
              value={codeforcesStats ? `${codeforcesStats.totalsolved}` : 'Loading...'}
              icon="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3LVEIg_6x2wqlPG8pruOUnUi-wEvnw1eC0w&s"
              color="text-purple-500"
              className="hover:shadow-lg transition-shadow duration-300">                     
              <div className="mt-2 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Easy Problems:</span>
                  <span className="font-medium">{codeforcesStats?.easysolved || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Medium Problems:</span>
                  <span className="font-medium">{codeforcesStats?.mediumsolved || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Hard Problems:</span>
                  <span className="font-medium">{codeforcesStats?.hardsolved || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Extreme Problems:</span>
                  <span className="font-medium">{codeforcesStats?.extremesolved || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>UnRated Problems:</span>
                  <span className="font-medium">{codeforcesStats?.unratingsolved || 0}</span>
                </div>
              </div>
            </StatsCard>

            <StatsCard
              title="Recent Award"
              icon="https://cdn-icons-png.flaticon.com/512/8092/8092389.png"
              color="text-yellow-500"
              imageUrl={leetbadge?.badges[0] != null ? isFullLink(leetbadge.badges[0].icon) ? leetbadge.badges[0].icon : "https://leetcode.com" + leetbadge.badges[0].icon : "https://static.vecteezy.com/system/resources/previews/008/255/803/non_2x/page-not-found-error-404-system-updates-uploading-computing-operation-installation-programs-system-maintenance-a-hand-drawn-layout-template-of-a-broken-robot-illustration-vector.jpg"}
              className="hover:shadow-lg transition-shadow duration-300">
              <span className="text-black text-center block">
                {leetbadge?.badges[0] != null ? leetbadge?.badges[0].displayName : ''}
              </span>

            </StatsCard>

            
   
  <div className="p-8 rounded-xl hover:shadow-lg transition-shadow duration-300 flex items-center justify-center  border " style={{ width: '500px', height: '400px' }}>
  <div className="w-full h-full bg-white/25 backdrop-blur-lg rounded-xl">
    <PlatformStats
      className="w-full h-full"
      data={platformData}
      title="Your Coding Progress"
    />
  </div>
</div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            <StatsCard
              title="Fundamentals"
              value={fundamentalcnt + ' Points'} // You can replace this with a dynamic value if needed
              icon="https://static.vecteezy.com/system/resources/previews/015/386/162/non_2x/line-icon-for-fundamental-vector.jpg"
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
              icon="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLAYydZD34xRKhxIJ80r43ZyVVlMfUtu-05A&s"
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
              icon="https://cdn-icons-png.flaticon.com/512/6671/6671884.png"
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
    </div>
    <footer className="bg-white text-black py-4 mt-8">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <p>&copy; {new Date().getFullYear()} CodeAlly.inc. All rights reserved.</p>
    <p>Contact: <span className="ml-2 text-blue-400 hover:underline">codeally.inc@gmail.com</span></p>
  </div>
</footer>


</>
  );
}