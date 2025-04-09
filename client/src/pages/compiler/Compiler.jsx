import React, { useState } from "react";
import AceEditor from "react-ace";
import axios from "axios";

import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";

const Compiler = () => {
  const [code, setCode] = useState("// Write your code here");
  const [language, setLanguage] = useState("cpp");
  const [output, setOutput] = useState("");

  const handleRunCode = async () => {
    try {
      const res = await axios.post('http://localhost:3000/api/code/run', {
        code,
        language
      });
      setOutput(res.data.output);
    } catch (error) {
      setOutput("Error while running code.");
    }
  };

  return (
    <div>
      <h2>Online Compiler</h2>

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
      />

      <button onClick={handleRunCode}>Run Code</button>

      <h3>Output:</h3>

{output.includes('error') || output.includes('Error') || output.includes('Exception') ? (
  <pre style={{ color: 'red', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
    {output}
  </pre>
) : (
  <pre style={{ color: 'green', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
    {output}
  </pre>
)}

    </div>
  );
};

export default Compiler;
