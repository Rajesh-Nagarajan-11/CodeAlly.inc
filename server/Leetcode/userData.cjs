const { UserData } = require('./types.cjs');

// Format User Data
const formatUserData = (data) => ({
  username: data.matchedUser.username,
  name: data.matchedUser.profile.realName,
  birthday: data.matchedUser.profile.birthday,
  avatar: data.matchedUser.profile.userAvatar,
  ranking: data.matchedUser.profile.ranking,
  reputation: data.matchedUser.profile.reputation,
  gitHub: data.matchedUser.githubUrl,
  twitter: data.matchedUser.twitterUrl,
  linkedIN: data.matchedUser.linkedinUrl,
  website: data.matchedUser.profile.websites,
  country: data.matchedUser.profile.countryName,
  company: data.matchedUser.profile.company,
  school: data.matchedUser.profile.school,
  skillTags: data.matchedUser.profile.skillTags,
  about: data.matchedUser.profile.aboutMe,
});

// Format Badges Data
const formatBadgesData = (data) => ({
  badgesCount: data.matchedUser.badges.length,
  badges: data.matchedUser.badges,
  upcomingBadges: data.matchedUser.upcomingBadges,
  activeBadge: data.matchedUser.activeBadge,
});

// Format Contest Data
const formatContestData = (data) => ({
  contestAttend: data.userContestRanking?.attendedContestsCount,
  contestRating: data.userContestRanking?.rating,
  contestGlobalRanking: data.userContestRanking?.globalRanking,
  totalParticipants: data.userContestRanking?.totalParticipants,
  contestTopPercentage: data.userContestRanking?.topPercentage,
  contestBadges: data.userContestRanking?.badge,
  contestParticipation: data.userContestRankingHistory.filter(
    (obj) => obj.attended === true
  ),
});



// Format Solved Problems Data
const formatSolvedProblemsData = (data) => ({
  solvedProblem: data.matchedUser.submitStats.acSubmissionNum[0].count,
  easySolved: data.matchedUser.submitStats.acSubmissionNum[1].count,
  mediumSolved: data.matchedUser.submitStats.acSubmissionNum[2].count,
  hardSolved: data.matchedUser.submitStats.acSubmissionNum[3].count,
  totalSubmissionNum: data.matchedUser.submitStats.totalSubmissionNum,
  acSubmissionNum: data.matchedUser.submitStats.acSubmissionNum,
});






// Export everything
module.exports = {
  formatUserData,
  formatBadgesData,
  formatContestData,
  formatSolvedProblemsData,
};
