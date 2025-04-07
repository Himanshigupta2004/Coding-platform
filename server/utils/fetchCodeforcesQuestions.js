const axios = require('axios');

const fetchCodeforcesQuestions = async () => {
  try {
    const res = await axios.get('https://codeforces.com/api/problemset.problems');
    return res.data.result.problems;
  } catch (err) {
    console.error('Error fetching Codeforces questions:', err);
    return [];
  }
};

module.exports = fetchCodeforcesQuestions;
