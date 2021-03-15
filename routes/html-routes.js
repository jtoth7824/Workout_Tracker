// Dependencies
const path = require('path');

// Routes
module.exports = (app) => {
  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads index.html
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/exercise.html'))
  }
  );
  // route to load exercise.html file
  app.get('/exercise', (req, res) => {
    console.log("in exercise html route");
    res.sendFile(path.join(__dirname, '../public/exercise.html'))
    }
  );
  // route to load stats.html file
  app.get('/stats', (req, res) => {
    console.log("in stats html route");
    res.sendFile(path.join(__dirname, '../public/stats.html'))
    }
  );

}
 