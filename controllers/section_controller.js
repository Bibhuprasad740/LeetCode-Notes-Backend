const Section = require('../models/Section');

// Create a new section

exports.createSection = async (req, res) => {
    let { name } = req.body;
    name = name.trim();

    if (!name) return res.status(400).json({ message: 'Name is required' });

    const newSection = new Section({ name });

    await newSection.save();

    res.status(201).json(newSection);
}

// Edit section by id

exports.editSectionById = async (req, res) => {
    const sectionId = req.params.id;
    let { name } = req.body;
    name = name.trim();

    if (!name) return res.status(400).json({ message: 'Name is required' });

    const updatedSection = await Section.findByIdAndUpdate(sectionId, { name }, { new: true });

    if (!updatedSection) return res.status(404).json({ message: 'Section not found' });

    res.status(200).json(updatedSection);
}


// Get all sections
exports.getAllSections = async (req, res) => {
    const sections = await Section.find({});

    res.status(200).json(sections);
}

// Get a section by ID
exports.getSection = async (req, res) => {
    const sectionId = req.params.id;

    const section = await Section.findById(sectionId);

    if (!section) return res.status(404).json({ message: 'Section not found' });

    res.status(200).json(section);
}

// Delete a section

exports.deleteSection = async (req, res) => {
    const section = await Section.findByIdAndDelete(req.params.id);

    if (!section) return res.status(404).json({ message: 'Section not found' });

    res.status(200).json({ message: 'Section deleted successfully' });
}