const express = require('express');
const router = express.Router();
const evaluationController = require('../controllers/evaluationController');
const authenticateToken = require('../middleware/auth');

router.get('/', authenticateToken, evaluationController.getEvaluations);
router.post('/', authenticateToken, evaluationController.insertEvaluation);

module.exports = router;