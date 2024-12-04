import axios from 'axios';
import { categorizeRating } from './categorizeRating.js';

// Function to get user solved stats
export async function getUserSolvedStats(handle) {
  const url = `https://codeforces.com/api/user.status?handle=${handle}`;
  try {
    const response = await axios.get(url);
    if (response.data.status !== 'OK') {
      return { status: 'Error', message: response.data.comment };
    }
    
    const submissions = response.data.result;
    
    // Using sets to ensure unique problem IDs
    const totalsolved = new Set();
    const easySolved = new Set();
    const mediumSolved = new Set();
    const hardSolved = new Set();
    const extremeSolved = new Set();
    const unratingsolved = new Set();

    submissions.forEach((submission) => {
      if (submission.verdict === 'OK') {
        const problemId = submission.problem.contestId + submission.problem.index; // Unique identifier for the problem
        totalsolved.add(problemId);

        // Categorizing based on rating and adding to respective sets
        const rating = submission.problem.rating;
        const category = categorizeRating(rating);

        if (category === 'easy') {
          easySolved.add(problemId);
        } else if (category === 'medium') {
          mediumSolved.add(problemId);
        } else if (category === 'hard') {
          hardSolved.add(problemId);
        } else if (category === 'extreme') {
          extremeSolved.add(problemId);
        } else if (category === 'unrated') {
          unratingsolved.add(problemId);
        }
      }
    });

    // Return the stats with counts based on set size
    return {
      totalsolved: totalsolved.size,
      easysolved: easySolved.size,
      mediumsolved: mediumSolved.size,
      hardsolved: hardSolved.size,
      extremesolved: extremeSolved.size,
      unratingsolved: unratingsolved.size,
    };
  } catch (error) {
    console.error('Error:', error.message);
    return { status: 'Error', message: error.message };
  }
}
