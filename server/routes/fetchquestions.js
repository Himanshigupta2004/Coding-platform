const express = require('express');
const router = express.Router();
const { addCustomQuestion ,getAllCustomQuestions,getQuestionById} = require('../controllers/questionsController');

router.post('/add-question', addCustomQuestion);
router.get('/all-questions', getAllCustomQuestions);
router.get('/question/:id', getQuestionById);

module.exports = router;
