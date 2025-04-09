import React, { useState, useEffect } from "react";
import AceEditor from "react-ace";
import axios from "axios";
import { useParams } from "react-router-dom";
import { getQuestionById } from "../../api/questionApi";
import './SolveQuestion.css';

import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";

const SolveQuestion = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [code, setCode] = useState("// Write your code here");
  const [language, setLanguage] = useState("cpp");
  const [output, setOutput] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const data = await getQuestionById(id);
        setQuestion(data);
      } catch (err) {
        setError("Failed to load question");
      }
    };
    fetchQuestion();
  }, [id]);

  const token = localStorage.getItem('token');
  const handleRunCode = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/code/run-multiple",
        {
          code,
          language,
          testcases: [
            { input: question.sample_input, expectedOutput: question.sample_output, type: "Sample Test Case" },
            { input: question.hidden_input, expectedOutput: question.hidden_output, type: "Hidden Test Case" },
          ],
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOutput(res.data.results);
    } catch (err) {
      setOutput([{ type: "Error", output: "Error while running code." }]);
    }
  };

  if (error) return <h2>{error}</h2>;
  if (!question) return <h2>Loading...</h2>;

  return (
    <div className="solve-question-container">
      {/* Left Side */}
      <div className="question-details">
        <h2>{question.title}</h2>
        <p><strong>Difficulty:</strong> {question.difficulty}</p>
        <p>{question.description}</p>
        <p><strong>Constraints:</strong> {question.constraints}</p>
        <div>
          <h4>Sample Input:</h4>
          <pre>{question.sample_input}</pre>
          <h4>Sample Output:</h4>
          <pre>{question.sample_output}</pre>
        </div>
      </div>

      {/* Right Side */}
      <div className="code-editor-section">
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="cpp">C++</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
        </select>

        <AceEditor
          mode={language === "cpp" ? "c_cpp" : language}
          theme="github"
          value={code}
          onChange={setCode}
          name="editor"
          editorProps={{ $blockScrolling: true }}
          width="100%"
          height="400px"
          className="ace-editor"
        />

        <button onClick={handleRunCode}>Run Code</button>

        <h3>Output:</h3>

        {output.length > 0 && (
          <div className="output-container">
            {output.map((test, idx) => (
              <div
                key={idx}
                className={`test-case ${test.isCorrect ? 'correct' : 'incorrect'}`}
              >
                <p><strong>{test.type}</strong></p>
                <p><strong>Input:</strong></p>
                <pre>{test.input}</pre>
                <p><strong>Expected Output:</strong></p>
                <pre>{test.expectedOutput}</pre>
                <p><strong>Your Output:</strong></p>
                <pre>{test.output}</pre>
                <p className={`status ${test.isCorrect ? 'correct' : 'incorrect'}`}>
                  {test.isCorrect ? "✅ Correct" : "❌ Incorrect"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SolveQuestion;