const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutPlanSchema = new Schema({
/*   name: {
    type: String,
    unique: true
  }, */
  exercises: [
    {
//      type: Schema.Types.ObjectId,
//      ref: "Exercise"
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
      },
    }
  ],
  day: {
    type: Date,
//    default: Date.now
  },
});

const WorkoutPlan = mongoose.model("WorkoutPlan", WorkoutPlanSchema);

module.exports = WorkoutPlan;
