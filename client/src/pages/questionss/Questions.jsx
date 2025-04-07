import React, { useEffect, useState } from "react";
import { getAllQuestions } from "../../api/questionApi";

const Questions = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    getAllQuestions().then((data) => {
      setQuestions(data);
    });
  }, []);

  return (
    <div>
      <h1>All Codeforces Questions</h1>
      {questions.map((q, index) => (
        <div key={index}>
          <h3>{q.title}</h3>
          <p>Difficulty: {q.difficulty}</p>
          <p>Tags: {q.tags}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Questions;
