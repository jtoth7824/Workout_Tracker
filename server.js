const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.PORT || 3000;

const db = require("./models");
const {
  Console
} = require("console");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

app.use(express.static("public"));
app.use(express.static(path.join(__dirname, 'public')));
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true
});

require('./routes/html-routes.js')(app);

// retrieve workout
app.get("/api/workouts", (req, res) => {
  console.log("in get workouts");
  db.WorkoutPlan.find({})
//    .populate("exercises")
    .then(dbWorkoutPlan => {
      console.log("in retrieve workout");
      res.json(dbWorkoutPlan);
    })
    .catch(err => {
      res.json(err);
    });
});

// retrieve exercises
app.get("/api/workouts", (req, res) => {
  console.log("in get exercise");
  db.Exercise.find({})
    .then(dbExercise => {
      console.log("in get exercise");
      res.json(dbExercise);
    });
});

// create workout
app.post("/api/workouts", (body, res) => {
  console.log("add workout");
//  console.log(body);
  db.WorkoutPlan.create(body)
    .then(dbWorkoutPlan => {
      console.log('in create workout');
      res.json(dbWorkoutPlan);
    })
    .catch(err => {
      res.json(err);
    });
});

/* //add exercise to workout plan
app.put("/api/workouts/:id", (body, res) => {
  console.log("body with id" + body);
  console.log(body.name);
  console.log(body.params.id);
const john = body.id;
  //  console.log(body.params.id);
  db.Exercise.create(body)
    .then(({
        _id
      }) =>
        db.WorkoutPlan.findOneAndUpdate({_id: john}, {
          $push: {
            exercises: _id
          }
        }, {
          new: true
        })
      )
    .then(dbWorkoutPlan => {
      console.log("inside promise");
      console.log(dbWorkoutPlan);
      res.json(dbWorkoutPlan);
    })
    .catch(err => {
      res.json(err);
    });
}); */


app.put("/api/workouts/:id", (req, res) => {
console.log(req.params.id);
console.log(req.body);
//  db.Exercise.create(req.body)
    db.WorkoutPlan.findOneAndUpdate({_id: req.params.id}, {$push: {exercises: req.body}}, {new: true})
    // .aggregate({
    //     $addFields: {
    //         totalDuration: {$sum: "$exercises.duration"}
    //     }
    // })
    .then(dbUser => {
      console.log(dbUser);
      res.json(dbUser);
    })
    .catch(err => {
      console.log(err);
      res.json(err);
    });
});


app.get("/api/workouts/range", (req, res) => {
      db.WorkoutPlan.aggregate([
          {
            "$sort": {day: -1}
          },
          {
            "$limit": 7
          },
          {
            $addFields: {
                totalDuration: {$sum: "$exercises.duration"}
            }
          },
          {
            "$sort": {day: 1}
          },
        ], (err, result) => {
          if (err) {
            console.log(err);
            res.send(err);
          } else {
            console.log(result);
            res.json(result);
          }
        })
})


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});