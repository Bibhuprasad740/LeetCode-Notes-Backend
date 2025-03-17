const mongoose = require('mongoose');

const problemSchema = mongoose.Schema({
  sectionId: {
    type: mongoose.Types.ObjectId,
    ref: "Section",
    required: true,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  questionName: {
    type: String,
    required: true,
  },
  leetcodeLink: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  sampleInput: {
    type: String,
    required: false,
  },
  sampleOutput: {
    type: String,
    required: false,
  },
  tags: {
    type: [String],
    required: false,
  },
  difficulty: {
    type: String,
    required: true,
  },
  intuition: {
    type: [String],
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: false,
  },
}, {
  timestamps: true,
});

const Problem = mongoose.model('Problem', problemSchema);

module.exports = Problem;