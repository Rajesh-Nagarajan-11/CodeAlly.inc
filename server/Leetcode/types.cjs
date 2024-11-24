const { Request } = require('express');

// User Data
const UserDataProfile = {
  aboutMe: String,
  company: String,
  countryName: String,
  realName: String,
  birthday: String,
  userAvatar: String,
  ranking: Number,
  reputation: Number,
  school: String,
  skillTags: Array,
  websites: Array,
};

const MatchedUser = {
  activeBadge: Object, // Badge object
  badges: Array, // Array of Badge objects
  githubUrl: String,
  linkedinUrl: String,
  profile: UserDataProfile,
  upcomingBadges: Array, // Array of Badge objects
  username: String,
  twitterUrl: String,
  submissionCalendar: String,
  submitStats: {
    totalSubmissionNum: [
      {
        difficulty: String,
        count: Number,
        submissions: Number
      }
    ],
    acSubmissionNum: [
      {
        difficulty: String,
        count: Number,
        submissions: Number
      }
    ],
    count: Number
  }
};

const UserData = {
  userContestRanking: null || {
    attendedContestsCount: Number,
    badge: Object, // Badge object
    globalRanking: Number,
    rating: Number,
    totalParticipants: Number,
    topPercentage: Number
  },
  userContestRankingHistory: [
    {
      attended: Boolean,
      rating: Number,
      ranking: Number,
      trendDirection: String,
      problemsSolved: Number,
      totalProblems: Number,
      finishTimeInSeconds: Number,
      contest: {
        title: String,
        startTime: String
      }
    }
  ],
  matchedUser: MatchedUser,
  recentAcSubmissionList: Array,
  recentSubmissionList: Array // Submission array
};

const Badge = {
  name: String,
  icon: String
};

const Difficulty = ['All', 'Easy', 'Medium', 'Hard'];

const FetchUserDataRequest = {
  params: { username: String },
  body: { username: String, limit: Number }
};

const TransformedUserDataRequest = {
  body: { username: String, limit: Number }
};

// Problem Data
const ProblemSetQuestionListData = {
  problemsetQuestionList: {
    total: Number,
    questions: Array
  }
};



// Export everything
module.exports = {
  UserData,
  Badge,
  Difficulty,
  FetchUserDataRequest,
  TransformedUserDataRequest,
  ProblemSetQuestionListData,
  };
