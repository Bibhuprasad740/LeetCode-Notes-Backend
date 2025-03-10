const express = require('express');
const router = express.Router();

const sectionController = require('../controllers/section_controller');

// GET /api/sections/
router.get('/', sectionController.getAllSections);

// GET /api/sections/:id
router.get('/:id', sectionController.getSection);

// POST /api/sections/create
router.post('/create', sectionController.createSection);

// PUT /api/sections/<ID>
router.put('/:id', sectionController.editSectionById);

// DELETE /api/sections/<ID>
router.delete('/:id', sectionController.deleteSection);

module.exports = router;