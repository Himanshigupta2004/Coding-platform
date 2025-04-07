const express = require('express');
const router = express.Router();

const { insertCodeforcesQuestions ,getAllQuestions} = require('../controllers/questionsController');
router.get('/fetch-codeforces', insertCodeforcesQuestions);
router.get('/all', getAllQuestions);
module.exports = router;
