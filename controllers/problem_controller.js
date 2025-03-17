const Problem = require("../models/Problem");
const Section = require("../models/Section");

// Get problems of a section
exports.getProblemsBySectionId = async (req, res) => {
    try {
        const sectionId = req.params.sectionId;
        if (!sectionId) return res.status(400).json({ message: "Section ID is required" });

        const problems = await Problem.find({ sectionId, userId: req.user._id });

        return res.status(200).json(problems);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message ?? "Server error" });
    }
}

// Add a new problem to a section
exports.addProblemToSection = async (req, res) => {
    try {
        const { sectionId, questionName, leetcodeLink, description, sampleInput, sampleOutput, tags, difficulty, intuition, code, imageUrl } = req.body;

        if (!sectionId || !questionName || !leetcodeLink || !difficulty || !intuition || !code) return res.status(400).json({ message: "Missing required fields" });

        const problem = new Problem({ sectionId, questionName, leetcodeLink, description, sampleInput, sampleOutput, tags, difficulty, intuition, code, imageUrl, userId: req.user._id });
        await problem.save();

        // increment the number of problems count of the section 
        const updatedSection = await Section.findByIdAndUpdate(sectionId, { $inc: { numberOfQuestions: 1 } }, { new: true });
        if (!updatedSection) return res.status(404).json({ message: "Section not found" });
        await updatedSection.save();

        return res.status(201).json(problem);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message ?? "Server error" });
    }
}

// Get a problem by Id
exports.getProblemById = async (req, res) => {
    try {
        const problemId = req.params.id;
        if (!problemId) return res.status(400).json({ message: "Problem ID is required" });

        const problem = await Problem.findById(problemId);

        if (!problem) return res.status(404).json({ message: "Problem not found" });

        return res.status(200).json(problem);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message ?? "Server error" });
    }
}

// Update a problem by id

exports.updateProblemById = async (req, res) => {
    try {
        const problemId = req.params.id;
        if (!problemId) return res.status(400).json({ message: "Problem ID is required" });
        const { sectionId, questionName, leetcodeLink, description, sampleInput, sampleOutput, tags, difficulty, intuition, code, imageUrl } = req.body;

        if (!sectionId || !questionName || !leetcodeLink || !difficulty || !intuition || !code) return res.status(400).json({ message: "Missing required fields" });

        const updatedProblem = await Problem.findByIdAndUpdate(problemId, { sectionId, questionName, leetcodeLink, description, sampleInput, sampleOutput, tags, difficulty, intuition, code, imageUrl, userId: req.user._id }, { new: true });

        if (!updatedProblem) return res.status(404).json({ message: "Problem not found" });

        return res.status(200).json(updatedProblem);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message ?? "Server error" });
    }
}

// Delete a problem by id

exports.deleteProblemById = async (req, res) => {
    try {
        const problemId = req.params.id;
        if (!problemId) return res.status(400).json({ message: "Problem ID is required" });

        const problem = await Problem.findById(problemId);
        if (!problem) return res.status(404).json({ message: "Problem not found" });

        // decrement the number of problems count of the section 
        const section = await Section.findByIdAndUpdate(problem.sectionId, { $inc: { numberOfQuestions: -1 } }, { new: true });
        if (!section) return res.status(404).json({ message: "Section not found" });
        await section.save();

        const deletedProblem = await Problem.findByIdAndDelete(problemId);

        if (!deletedProblem) return res.status(404).json({ message: "Problem not found" });

        // status code 204 means the problem has been deleted and no content should be sent
        return res.status(204).json();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message ?? "Server error" });
    }
}
