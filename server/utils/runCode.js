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

const runCode = async (code, language, input) => {
  try {
    const res = await axios.post(
      "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true",
      {
        source_code: code,
        language_id: languageMap[language],
        stdin: input,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Key": process.env.RAPID_API_KEY,
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        },
      }
    );

    let output = "";

    if (res.data.stdout) {
      output = res.data.stdout;
    } else if (res.data.stderr) {
      output = "Runtime Error:\n" + res.data.stderr;
    } else if (res.data.compile_output) {
      output = "Compilation Error:\n" + res.data.compile_output;
    } else {
      output = "Unknown Error!";
    }

    return { output };

  } catch (err) {
    return { output: "Error while executing code:\n" + err.message };
  }
};

module.exports = runCode;
