const express = require('express');
const router = express.Router();

const problemController = require('../controllers/problem_controller');

// GET /api/problems/all
router.get('/all', problemController.getAllProblems);

// GET /api/problems/<SECTIONID>
router.get('/:sectionId', problemController.getProblemsBySectionId);

// GET /api/problems/<ID>
router.get('/:id', problemController.getProblemById);

// POST /api/problems/add
router.post('/add', problemController.addProblemToSection);

// PUT /api/problems/<ID>
router.put('/:id', problemController.updateProblemById);

// DELETE /api/problems/<ID>
router.delete('/:id', problemController.deleteProblemById);

module.exports = router;