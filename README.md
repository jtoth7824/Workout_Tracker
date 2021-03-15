[![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](https://www.mit.edu/~amini/LICENSE.md)

# Workout Tracker

The Workout Tracker is an application to allow a user to track their workout and exercise history.  A user can add exercises to an existing workout by hitting the continue button.  Alternatively, the user can create a new workout and add exercises to that workout.  The home page displays information about the last workout's exercises.  There is also a Dashboard link on home page that displays the statistics about the last 7 workouts.    There are 4 charts displayed.   The first is a line chart showing the total duration of exercises per workout.  The second chart is a bar chart showing the total amout of weight lifted per workout.  The third chart is a pie chart that reflects the total duration per exercise over the last 7 workouts.  These exercises have been de-duplicated.   The last chart is a donut chart that reflects the total weight lifted per exercise over the last 7 workouts.  These exercises have also been de-duplicated across workouts.

This application utilizes a no-sql database on the back end through the use of mongoose.  The total number of workouts returned from database is limited to the last 7.  The total durations per workout were aggregated on the back end with use of aggregate and addFields to publish the total durations to the front end.  In addition, the application has been deployed to Heroku.

## Table of Contents
* [Screenshots](#Screenshots)
* [Installation](#Installation)
* [Usage](#Usage)
* [Technologies](#Technologies)
* [Repository](#Repository)
* [Deployment](#Deployment)

## Screenshots
* [Home Page](#Home-Page)
* [Add Exercise](#Add-Exercise)
* [Stats](#Stats)

#### Home Page
The following is a screenshot of the Workout Tracker home page.

<p align="center">
  <img src="./assets/images/WorkoutTrackerHomePage.png" alt="Workout Tracker application home screen">
</p>

#### Add Exercise
The following is a screenshot of the Add Exercise page.

<p align="center">
  <img src="./assets/images/AddExercise.png" alt="workout tracker application add exercise screen">
</p>

#### Stats
The following is a screenshot of the Stats page.

<p align="center">
  <img src="./assets/images/Stats.png" alt="Workout tracker application stats screen">
</p>

## Installation

* Install node.js to computer, if not already present.
    * Node.js can be installed from [here](https://nodejs.org/en/)
* Copy all the application files locally to one's machine.
* In a terminal window where you copied the files, install 'mongoose', 'morgan', 'express.    These installations are accomplished by performing the following command: 

    * **npm install**

## Usage

This application requires Node.js to be installed.  It also requires the user to have 'mongoose', 'morgan' and 'express packages installed.  (See [Installation](#installation) section.)  Once these items have been installed, the user can launch the application from a terminal window as follows:

**node server.js**

Followed by entering localhost:3000 in your browser URL line.


## Technologies

* Mongoose
* Express
* Node.js
* Heroku
* Atlas

## Repository

Direct link to repository:  https://github.com/jtoth7824/workout_tracker

## Deployment

The Workout Tracker application was deployed to Heroku so that anyone can run the application.   The link to execute the application is as follows:

https://immense-coast-50151.herokuapp.com/
