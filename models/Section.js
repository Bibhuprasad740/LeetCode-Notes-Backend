const mongoose = require('mongoose');

const sectionSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  numberOfQuestions: {
    type: Number,
    default: 0,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  }
}, {
  timestamps: true,
});
const Section = mongoose.model('Section', sectionSchema);

module.exports = Section;
