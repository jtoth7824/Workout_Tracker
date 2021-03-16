// all required packages
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.PORT || 3000;

// include the db model
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

// connect to mongo db via mongoose
//mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
//  useNewUrlParser: true
//});

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/workout',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);

// import the html routes
require('./routes/html-routes.js')(app);
//import the api routes
require('./routes/api-routes.js')(app);

// start listening on the port
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});