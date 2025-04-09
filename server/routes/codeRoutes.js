const express = require('express');
const router = express.Router();
const {runMultipleTestCases} = require('../controllers/codeControllers');
router.post("/run-multiple", runMultipleTestCases);

module.exports = router;
