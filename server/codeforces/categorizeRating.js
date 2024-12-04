// categorizeRating.js
export  function categorizeRating(rating) {
    if (rating >= 800 && rating < 1300) {
      return 'easy';
    } else if (rating >= 1300 && rating < 1800) {
      return 'medium';
    } else if (rating >= 1900 && rating < 2700) {
      return 'hard';
    } else if (rating >= 2700) {
      return 'extreme';
    } else {
      return 'unrated';
    }
  }
  