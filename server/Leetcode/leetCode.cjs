const query = require('./userProfilequery.cjs');
const UserData = require('./userData.cjs');
const fetchUserDetails = require('./fetchUserDetails.cjs');

// Handle user data
const userData = (req, res) => {
  fetchUserDetails(
    req.body,
    res,
    UserData.formatUserData,
    query
  );
};

// Handle user badges
const userBadges = (req, res) => {
  fetchUserDetails(
    req.body,
    res,
    UserData.formatBadgesData,
    query
  );
};

// Handle problems solved
const solvedProblem = (req, res) => {
  fetchUserDetails(
    req.body,
    res,
    UserData.formatSolvedProblemsData,
    query
  );
};

// Export functions
module.exports = {
  userData,
  userBadges,
  solvedProblem,
};