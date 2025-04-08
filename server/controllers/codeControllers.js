const axios = require('axios');

const languageMap = {
  cpp: 54,
  python: 71,
  java: 62,
  c: 50,
  javascript: 63,
  go: 60,
  ruby: 72,
  php: 68,
  rust: 73,
};

const runCode = async (req, res) => {
  const { code, language } = req.body;

  if (!languageMap[language]) {
    return res.status(400).json({ error: 'Language not supported' });
  }

  try {
    const response = await axios.post(
      'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true',
      {
        source_code: code,
        language_id: languageMap[language],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
          'X-RapidAPI-Host': process.env.RAPIDAPI_HOST,
        },
      }
    );

    res.json({ output: response.data.stdout || response.data.stderr || 'No Output' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error while executing code' });
  }
};

module.exports = { runCode };
