// Dependencies
const path = require('path');

// Routes
module.exports = (app) => {
  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads index.html
  app.get('/exercise', (req, res) => {
    console.log("in html route");
    res.sendFile(path.join(__dirname, '../public/exercise.html'))
    }
  );
}
 