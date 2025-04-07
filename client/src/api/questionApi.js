export const fetchCodeforcesQuestions = async () => {
    const res = await fetch('http://localhost:3000/api/questions/fetch-codeforces');
    if (!res.ok) {
      throw new Error('Failed to fetch Codeforces questions');
    }
    return res.json();
  };
  
  export const getAllQuestions = async () => {
    const res = await fetch('http://localhost:3000/api/questions/all');
    if (!res.ok) {
      throw new Error('Failed to fetch questions');
    }
    return res.json();
  };
  