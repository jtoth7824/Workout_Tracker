const mongoose = require("mongoose");
//const { TIME } = require("sequelize/types");
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
  name: String,
  type: String,
  weight: Number,
  sets: Number,
  reps: Number,
  duration: Number,
  distance: Number,
  day: {
    type: Date,
    default: Date.now
  },
});

const Exercise = mongoose.model("Exercise", ExerciseSchema);

module.exports = Exercise;
