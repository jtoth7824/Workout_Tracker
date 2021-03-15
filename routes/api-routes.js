const path = require('path');
const db =  require("../models");

module.exports = (app) => {

  // retrieve most recent workout (last workout)
  app.get("/api/workouts", (req, res) => {
    // using aggregate to sort in descending order, then limit result set to 7, add the total Duration field with sum of all durations
    db.WorkoutPlan.aggregate([{
        "$sort": {
          day: -1
        }
      },
      {
        "$limit": 7
      },
      {
        $addFields: {
          totalDuration: {
            $sum: "$exercises.duration"
          }
        }
      },
      {
        "$sort": {
          day: 1
        }
      },
    ], (err, result) => {
      if (err) {
        console.log(err);
        // return err if one occurs
        res.send(err);
      } else {
        console.log(result);
        // return json result set
        res.json(result);
      }
    })
  });

  // retrieve exercises
  app.get("/api/workouts", (req, res) => {
    console.log("in get exercise");
    // find all exercises
    db.Exercise.find({})
      .then(dbExercise => {
        console.log("in get exercise");
        // return json result set
        res.json(dbExercise);
      })
      .catch(err => {
        console.log(err);
        // return error if one occurs
        res.json(err);
      })
  });

  // create workout
  app.post("/api/workouts", (body, res) => {
    console.log("add workout");
    // create new workout plan
    db.WorkoutPlan.create(body)
      .then(dbWorkoutPlan => {
        console.log('in create workout');
        // return json result set
        res.json(dbWorkoutPlan);
      })
      .catch(err => {
        console.log(err);
        // return error if one occurs
        res.json(err);
      });
  });

  // save new exercise per correct workout
  app.put("/api/workouts/:id", (req, res) => {
    console.log(req.params.id);
    console.log(req.body);
    // find workout based upon ID and then update with new exercise information
    db.WorkoutPlan.findOneAndUpdate({
        _id: req.params.id
      }, {
        // pushes new exercise information to end of exercises array
        $push: {
          exercises: req.body
        }
      }, {
        new: true
      })
      .then(dbUser => {
        console.log(dbUser);
        // return json result set
        res.json(dbUser);
      })
      .catch(err => {
        console.log(err);
        // return error if one occurs
        res.json(err);
      });
  });

  // retrieve last 7 workouts
  app.get("/api/workouts/range", (req, res) => {
    // using aggregate to sort in descending order, then limit result set to 7, add the total Duration field with sum of all durations
    // and finally re-sort the 7 results in ascending order
    db.WorkoutPlan.aggregate([{
          "$sort": {
            day: -1
          }
        },
        {
          "$limit": 7
        },
        {
          $addFields: {
            totalDuration: {
              $sum: "$exercises.duration"
            }
          }
        },
        {
          "$sort": {
            day: 1
          }
        },
      ],
      (err, result) => {
        if (err) {
          console.log(err);
          // return error if one occurs
          res.send(err);
        } else {
          console.log(result);
          // return json result set
          res.json(result);
        }
      })
  })

}