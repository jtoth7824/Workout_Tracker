const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.PORT || 3000;

const db = require("./models");
const { Console } = require("console");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));
app.use(express.static(path.join(__dirname, 'public')));
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

 db.WorkoutPlan.create({ name: "John" })
  .then(dbWorkout => {
    console.log(dbWorkout);
  })
  .catch(({ message }) => {
    console.log(message);
  }); 

  require('./routes/html-routes.js')(app);

app.get("/api/workouts", (req, res) => {
  console.log("in get workouts");
  db.WorkoutPlan.find({})
    .populate("exercises")
    .then(dbWorkoutPlan => {
      console.log("in retrieve workout");
      res.json(dbWorkoutPlan);
    })
    .catch(err => {
      res.json(err);
    });
});

app.get("/api/workouts", (req, res) => {
  console.log("in get exercise");
  db.Exercise.find({})
    .then(dbExercise => {
      console.log("in get exercise");
      res.json(dbExercise);
    });
});

app.put("api/workouts", ({body}, res) => {
  console.log("add exercise");
  console.log(body);
  db.WorkoutPlan.create(body)
    .then(dbWorkoutPlan => {
      console.log('in create workout');
      res.json(dbWorkoutPlan);
    })
    .catch(err => {
      res.json(err);
    });
});


app.put("/api/workouts/:id", ({ body }, res) => {
  console.log("body with id" + body);
  console.log(body.name);
//  console.log(_id);
//  console.log(body.params.id);
  db.Exercise.create(body)
    .then(({ _id }) => 
      db.WorkoutPlan.findOneAndUpdate({}, { $push: { exercises: _id } }, { new: true }))
    .then(dbWorkoutPlan => {
      console.log("inside promise");
      console.log(dbWorkoutPlan);
      res.json(dbWorkoutPlan);
    })
    .catch(err => {
      res.json(err);
    });
});

/*

app.get("/notes", (req, res) => {
  db.Note.find({})
    .then(dbNote => {
      res.json(dbNote);
    })
    .catch(err => {
      res.json(err);
    });
});

app.get("/user", (req, res) => {
  db.User.find({})
    .then(dbUser => {
      res.json(dbUser);
    })
    .catch(err => {
      res.json(err);
    });
});

app.post("/submit", ({ body }, res) => {
  db.Note.create(body)
    .then(({ _id }) => db.User.findOneAndUpdate({}, { $push: { notes: _id } }, { new: true }))
    .then(dbUser => {
      res.json(dbUser);
    })
    .catch(err => {
      res.json(err);
    });
});

app.get("/populateduser", (req, res) => {
  db.User.find({})
    .populate("notes")
    .then(dbUser => {
      res.json(dbUser);
    })
    .catch(err => {
      res.json(err);
    });
}); */

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
