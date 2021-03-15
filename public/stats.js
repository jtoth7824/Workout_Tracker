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
  console.log(data);
  let durations = data.map(({
    totalDuration
  }) => totalDuration);
  console.log(durations);
  let pounds = calculateTotalWeight(data);
  console.log("pounds = " + pounds);
  let workouts = workoutNames(data);
  console.log("workouts = " + workouts);
  const colors = generatePalette();
  let indD = individualDurations(data);
  let indW = calculateIndivWeight(data, workouts);
  console.log("indD = " + indD);
  console.log("indW = " + indW);

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
        //          data: indD
        data: durations,
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
        //          data: pounds,
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



function individualDurations(data) {
  let durations = [];

  data.forEach((workout) => {
    workout.exercises.forEach((exercise) => {
      durations.push(exercise.duration);
    });
  });

  return durations;
}

function calculateIndivWeight(data, names) {
  let total = [];

  var newname;
  names.forEach((exname) => {
    var sum = 0;
    newname = exname;
    data.forEach((workout) => {
      workout.exercises.forEach((exercise) => {
        if (newname == exercise.name) {
          sum = sum + exercise.weight;
        }
      })
    })
    total.push(sum);
  })

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