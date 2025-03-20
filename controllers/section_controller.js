const Section = require('../models/Section');

// Create a new section

exports.createSection = async (req, res) => {
    console.log('Tryig to create a new section');
    try {
        let { name } = req.body;
        name = name.trim();

        if (!name) return res.status(400).json({ message: 'Name is required' });

        const newSection = await Section({ name, userId: req.user._id });

        await newSection.save();

        res.status(201).json(newSection);

    } catch (error) {
        console.log('error in creting new section:', error);
        res.status(500).json({ message: 'Server Error' });
    }
}

// Edit section by id

exports.editSectionById = async (req, res) => {
    console.log('Trying to edit a section');
    try {
        const sectionId = req.params.id;
        let { name } = req.body;
        name = name.trim();

        if (!name) return res.status(400).json({ message: 'Name is required' });

        const updatedSection = await Section.findByIdAndUpdate(sectionId, { name }, { new: true });

        if (!updatedSection) return res.status(404).json({ message: 'Section not found' });

        res.status(200).json(updatedSection);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}


// Get all sections
exports.getAllSections = async (req, res) => {
    console.log('Trying to get all the sections');
    try {
        const sections = await Section.find({ userId: req.user._id });
        res.status(200).json(sections);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}

// Get a section by ID
exports.getSection = async (req, res) => {
    console.log('Trying to get a section by ID');
    try {
        const sectionId = req.params.id;

        const section = await Section.findById(sectionId);

        if (!section) return res.status(404).json({ message: 'Section not found' });

        res.status(200).json(section);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}

// Delete a section

exports.deleteSection = async (req, res) => {
    console.log('Trying to delete a section by id');
    try {
        const section = await Section.findByIdAndDelete(req.params.id);
        if (!section) return res.status(404).json({ message: 'Section not found' });
        // find all problems with this section id and delete them
        // await Problem.deleteMany({ sectionId: req.params.id });

        res.status(200).json({ message: 'Section deleted successfully' });

    } catch (error) {
        console.log('error in deleting section:', error);
        res.status(500).json({ message: 'Server Error' });
    }
}