import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AceEditor from "react-ace";
import {render} from 'react-dom';
import Signup from './pages/signup/Signup';
import Login from './pages/login/Login';
import Questions from './pages/questionss/AllQuestions';
import Compiler from './pages/compiler/Compiler';
import AddQuestion from './pages/questionss/Addquestion';
import SolveQuestion from './pages/questionss/SolveQuestion';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/compiler" element={<Compiler />} />
        <Route path="/add-question" element={<AddQuestion />} />
        <Route path="/questions/:id" element={<SolveQuestion />} />
      </Routes>
    </Router>
  );
}

export default App;