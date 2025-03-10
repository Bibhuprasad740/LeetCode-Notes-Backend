const Problem = require("../models/Problem")

// Get problems of a section
exports.getProblemsBySectionId = async (req, res) => {
    const sectionId = req.params.sectionId;
    if (!sectionId) return res.status(400).json({ message: "Section ID is required" });

    const problems = await Problem.find({ sectionId: sectionId });

    return res.status(200).json(problems);
}

// Add a new problem to a section
exports.addProblemToSection = async (req, res) => {
    const { sectionId, questionName, leetcodeLink, description, sampleInput, sampleOutput, tags, difficulty, intuition, code, imageUrl } = req.body;

    if (!sectionId || !questionName || !leetcodeLink || !difficulty || !intuition || !code) return res.status(400).json({ message: "Missing required fields" });

    const problem = new Problem({ sectionId, questionName, leetcodeLink, description, sampleInput, sampleOutput, tags, difficulty, intuition, code, imageUrl });
    await problem.save();

    return res.status(201).json(problem);
}

// Get a problem by Id
exports.getProblemById = async (req, res) => {
    const problemId = req.params.id;
    if (!problemId) return res.status(400).json({ message: "Problem ID is required" });

    const problem = await Problem.findById(problemId);

    if (!problem) return res.status(404).json({ message: "Problem not found" });

    return res.status(200).json(problem);
}

// Update a problem by id

exports.updateProblemById = async (req, res) => {
    const problemId = req.params.id;
    if (!problemId) return res.status(400).json({ message: "Problem ID is required" });
    const { sectionId, questionName, leetcodeLink, description, sampleInput, sampleOutput, tags, difficulty, intuition, code, imageUrl } = req.body;

    if (!sectionId || !questionName || !leetcodeLink || !difficulty || !intuition || !code) return res.status(400).json({ message: "Missing required fields" });

    const updatedProblem = await Problem.findByIdAndUpdate(problemId, { sectionId, questionName, leetcodeLink, description, sampleInput, sampleOutput, tags, difficulty, intuition, code, imageUrl }, { new: true });

    if (!updatedProblem) return res.status(404).json({ message: "Problem not found" });

    return res.status(200).json(updatedProblem);
}

// Delete a problem by id

exports.deleteProblemById = async (req, res) => {
    const problemId = req.params.id;
    if (!problemId) return res.status(400).json({ message: "Problem ID is required" });

    const deletedProblem = await Problem.findByIdAndDelete(problemId);

    if (!deletedProblem) return res.status(404).json({ message: "Problem not found" });

    // status code 204 means the problem has been deleted and no content should be sent
    return res.status(204).json();
}
