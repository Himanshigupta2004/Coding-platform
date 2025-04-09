import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

export const getAllQuestions = async () => {
  const res = await axios.get(`${API_BASE_URL}/api/questions/all-questions`);
  return res.data;
};

export const getQuestionById = async (id) => {
  const res = await axios.get(`${API_BASE_URL}/api/questions/question/${id}`);
  return res.data;
};