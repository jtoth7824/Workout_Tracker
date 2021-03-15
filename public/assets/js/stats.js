function generatePalette() {
  const arr = [
    '#003f5c',
    '#2f4b7c',
    '#665191',
    '#a05195',
    '#d45087',
    '#f95d6a',
    '#ff7c43',
    'ffa600',
    '#003f5c',
    '#2f4b7c',
    '#665191',
    '#a05195',
    '#d45087',
    '#f95d6a',
    '#ff7c43',
    'ffa600',
  ];

  return arr;
}

function populateChart(data) {
  let durations = data.map(({totalDuration}) => totalDuration);
  let pounds = calculateTotalWeight(data);
  let workouts = workoutNames(data);
  const colors = generatePalette();
  // new functions to calculate values for pie & donut charts
  // Trilogy starter code did not work correctly for these charts
  let indD = individualDurations(data, workouts);
  let indW = calculateIndivWeight(data, workouts);

  let line = document.querySelector('#canvas').getContext('2d');
  let bar = document.querySelector('#canvas2').getContext('2d');
  let pie = document.querySelector('#canvas3').getContext('2d');
  let pie2 = document.querySelector('#canvas4').getContext('2d');

  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const labels = data.map(({
    day
  }) => {
    const date = new Date(day);
    return daysOfWeek[date.getDay()];
  });

  let lineChart = new Chart(line, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Workout Duration In Minutes',
        backgroundColor: 'red',
        borderColor: 'red',
        data: durations,
        fill: false,
      }, ],
    },
    options: {
      responsive: true,
      title: {
        display: true,
      },
      scales: {
        xAxes: [{
          display: true,
          scaleLabel: {
            display: true,
          },
        }, ],
        yAxes: [{
          display: true,
          scaleLabel: {
            display: true,
          },
        }, ],
      },
    },
  });

  let barChart = new Chart(bar, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Pounds',
        data: pounds,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      }, ],
    },
    options: {
      title: {
        display: true,
        text: 'Pounds Lifted',
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
          },
        }, ],
      },
    },
  });

  let pieChart = new Chart(pie, {
    type: 'pie',
    data: {
      labels: workouts,
      datasets: [{
        label: 'Exercises Performed',
        backgroundColor: colors,
        data: indD
      }, ],
    },
    options: {
      title: {
        display: true,
        text: 'Exercises Performed - Duration',
      },
    },
  });

  let donutChart = new Chart(pie2, {
    type: 'doughnut',
    data: {
      labels: workouts,
      datasets: [{
        label: 'Exercises Performed',
        backgroundColor: colors,
        data: indW,
      }, ],
    },
    options: {
      title: {
        display: true,
        text: 'Exercises Performed - Weight',
      },
    },
  });
}


// function to calculate the durations of each exercise while removing duplicate exercises
// this function was needed because pumping "durations" directly into pie chart did not work
// in the starter code.   This function successfully aggregates the values so pie chart displays
// correctly.
function individualDurations(data, names) {
  let durations = [];

  var newname;
  // loop over each de-duped exercise name
  names.forEach((exname) => {
    var sum = 0;
    // save off the name of exercise
    newname = exname;
    //  loop over each workout
    data.forEach((workout) => {
      // loop over each exercise in the workout
      workout.exercises.forEach((exercise) => {
        // check if exercise matches name of exercise in outer loop (de-duped names)
        if (newname == exercise.name) {
          // if exercise name found, then keep running sum of the duration for exercise name
          sum = sum + exercise.duration;
        }
      })
    })
    // push the total duration value per the exercise name to array
    durations.push(sum);
  })

  // return the durations array
return durations;
}

// function to calculate the weights of each exercise while removing duplicate exercises
// this function was needed because pumping "weights" directly into donut chart did not work
// in the starter code.  This function successfully aggregates the values so donut chart displays
// correctly.
function calculateIndivWeight(data, names) {
  let total = [];

  var newname;
  // loop over each de-duped exercise name
  names.forEach((exname) => {
    var sum = 0;
    // save off the name of exercise
    newname = exname;
    // loop over each workout
    data.forEach((workout) => {
      // loop over each exercise in the workout
      workout.exercises.forEach((exercise) => {
        // check if exercise matches name of exercise in outer loop (de-duped name)
        if (newname == exercise.name) {
          // if exercise name found, then keep running sum of the weights for exercise name
          sum = sum + exercise.weight;
        }
      })
    })
    // push the total weight vaue per the exercise name to array
    total.push(sum);
  })
  // return the total weights array
  return total;
}

function calculateTotalWeight(data) {
  let totals = [];

  data.forEach((workout) => {
    const workoutTotal = workout.exercises.reduce((total, {
      type,
      weight
    }) => {
      if (type === 'resistance') {
        return total + weight;
      } else {
        return total;
      }
    }, 0);

    totals.push(workoutTotal);
  });

  return totals;
}

function workoutNames(data) {
  let workouts = [];

  data.forEach((workout) => {
    workout.exercises.forEach((exercise) => {
      workouts.push(exercise.name);
    });
  });

  // return de-duplicated array with JavaScript `Set` object
  return [...new Set(workouts)];
}

// get all workout data from back-end
API.getWorkoutsInRange().then(populateChart);