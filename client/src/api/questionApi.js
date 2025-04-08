import axios from 'axios';
export const getAllQuestions = async () => {
  const res = await axios.get('http://localhost:3000/api/questions/all-questions');
  return res.data;
};
export const getQuestionById = async (id) => {
  const res = await axios.get(`http://localhost:3000/api/questions/question/${id}`);
  return res.data;
};
