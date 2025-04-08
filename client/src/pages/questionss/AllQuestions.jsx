import React, { useEffect, useState } from "react";
import { getAllQuestions } from "../../api/questionApi";
import { useNavigate } from "react-router-dom";

const AllQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await getAllQuestions();
        setQuestions(data);
      } catch (err) {
        setError("Failed to fetch questions");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  if (loading) return <h2>Loading...</h2>;

  if (error) return <h2>{error}</h2>;

  return (
    <div>
      <h1>All Questions</h1>

      {questions.map((q) => (
        <div key={q.id}>
          <h3>{q.title}</h3>
          <p>Difficulty: {q.difficulty}</p>
          <button onClick={() => navigate(`/questions/${q.id}`)}>View & Solve</button>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default AllQuestions;
