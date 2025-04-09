const runCode = require("../utils/runCode");

const runMultipleTestCases = async (req, res) => {
  const { code, language, testcases } = req.body;

  if (!code || !language || !testcases) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const results = [];

  for (const testcase of testcases) {
    const result = await runCode(code, language, testcase.input);

    results.push({
      type: testcase.type,
      input: testcase.input,
      expectedOutput: testcase.expectedOutput,
      output: result.output.trim(),
      isCorrect: result.output.trim() === testcase.expectedOutput.trim(),
    });
  }

  return res.json({ results });
};

module.exports = {
  runMultipleTestCases,
};
