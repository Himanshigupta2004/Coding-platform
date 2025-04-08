import React, { useState, useEffect } from "react";
import AceEditor from "react-ace";
import axios from "axios";
import { useParams } from "react-router-dom";
import { getQuestionById } from "../../api/questionApi";

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
  const [output, setOutput] = useState("");
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

  const handleRunCode = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/code/run", {
        code,
        language,
        input: question.sample_input, // optional
      });
      setOutput(res.data.output);
    } catch (err) {
      setOutput("Error while running code.");
    }
  };

  if (error) return <h2>{error}</h2>;
  if (!question) return <h2>Loading...</h2>;

  return (
    <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
      {/* Left side - Question */}
      <div style={{ flex: 1, borderRight: "1px solid gray", paddingRight: "20px" }}>
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

      {/* Right side - Compiler */}
      <div style={{ flex: 1 }}>
        <div style={{ marginBottom: "10px" }}>
          <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="cpp">C++</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
          </select>
        </div>

        <AceEditor
          mode={language === "cpp" ? "c_cpp" : language}
          theme="github"
          value={code}
          onChange={setCode}
          name="editor"
          editorProps={{ $blockScrolling: true }}
          width="100%"
          height="400px"
        />

        <button onClick={handleRunCode} style={{ marginTop: "10px" }}>Run Code</button>

        <h3>Output:</h3>
        <pre>{output}</pre>
      </div>
    </div>
  );
};

export default SolveQuestion;
