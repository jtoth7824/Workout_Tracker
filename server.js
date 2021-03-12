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
//    .then(({ _id }) => db.WorkoutPlan.findOneAndUpdate({_id: req.params.id}, { $push: { exercises: _id } }, { new: true }))
    .then(dbUser => {
      console.log(dbUser);
      res.json(dbUser);
    })
    .catch(err => {
      console.log(err);
      res.json(err);
    });
});

//get workouts in range
/* app.get("/api/workouts/range", (req, res) => {
  db.WorkoutPlan.find({})
    .populate({
    path: "WorkoutPlan",
      options: {
       limit: 3
      }
    })
    /*     .aggregate([{
          $addFields: {
            totalDuration: {
              $sum: "$exercises.duration"
            }
          }
        }]) */
/*     .then(dbWorkoutPlan => {
      console.log(dbWorkoutPlan);
      res.json(dbWorkoutPlan);
    });
});  */


app.get("/api/workouts/range", (req, res) => {
      db.WorkoutPlan.aggregate([
          // {
          //   "$unwind": "$exercises"
          // },
          // {
          //   "$lookup": {
          //     "from": "exercises",
          //     "localField": "exercises",
          //     "foreignField": "_id",
          //     "as": "exercises_joined"
          //   }
          // },
          // {
          //   "$unwind": "$exercises_joined"
          // },
          {
            "$limit": 7
          },
          {
            $addFields: {
                totalDuration: {$sum: "$exercises.duration"}
            }
          },
/*          {
            "$group": {
              "_id": "$exercises_joined.duration",
              "totalDuration": {
                "$sum": "$exercises_joined.duration"
              }
            }
          } */
        ], (err, result) => {
          if (err) {
            res.send(err);
          } else {
            console.log(result);
            res.json(result);
          }
        })
})


/*  app.get("/api/workouts/range", (req, res) => {
      db.WorkoutPlan.find({}).populate("exercises").limit(5).exec((err, docs) => {
        if (err) { return console.error(err); }
        console.log(`array has ${docs.length} docs.`);
        console.log(docs);
        console.log("return docs");
        res.json(docs);
      });
    }) */

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});