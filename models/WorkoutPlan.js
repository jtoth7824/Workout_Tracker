const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const subSchema = mongoose.Schema({
      type: {
        type: String,
      },
      name: {
        type: String
      },
      duration: {
        type: Number
      },
      weight: {
        type: Number
      },
      reps: {
        type: Number
      },
      sets: {
        type: Number
      },
      distance: {
        type: Number
      }
    },
    {_id : false})


const WorkoutPlanSchema = new Schema({
  exercises: [subSchema],
  day: {
    type: Date,
    default: new Date().setDate(new Date().getDate())
  },
});

const WorkoutPlan = mongoose.model("WorkoutPlan", WorkoutPlanSchema);

module.exports = WorkoutPlan;
