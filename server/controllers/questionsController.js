const fetchCodeforcesQuestions = require('../utils/fetchCodeforcesQuestions');
const db = require('../database/sql_db');

const insertCodeforcesQuestions = async (req, res) => {
  const questions = await fetchCodeforcesQuestions();

  if (!questions.length) {
    return res.status(500).json({ message: 'Failed to fetch questions' });
  }

  const insertPromises = questions.map((q) => {
    const title = q.name;
    const tags = q.tags.join(', ');
    const difficulty = q.rating || 'Unrated';
    const contestId = q.contestId || 0;
    const index = q.index || '';

    return db.query(
      'INSERT IGNORE INTO codeforces_questions (title, tags, difficulty, contest_id, problem_index) VALUES (?, ?, ?, ?, ?)',
      [title, tags, difficulty, contestId, index]
    );
  });

  await Promise.all(insertPromises);

  res.json({ message: 'Codeforces Questions Inserted Successfully', total: questions.length });
};


const getAllQuestions = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM codeforces_questions');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch questions' });
  }
};
  
module.exports = { insertCodeforcesQuestions ,getAllQuestions};
