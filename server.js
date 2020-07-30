const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

var corsOption = {
    origin: "http://localhost:8081"
}
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
  
const db = require("./models");
db.sequelize.sync({});

  require("./routes/tutorial.routes")(app);
  app.set('views', './views');
  app.set('view engine', 'pug');

  app.get('/', (req, res) => {
    res.render('index');
  });

  app.get('/member/:name/planet/:home', (req, res) => {
    const memberDetails = {
      member: req.params.name,
      planet: req.params.home
    }
    res.render('gardian', memberDetails);
  });

  // set port, listen for requests
  const PORT = process.env.PORT || 8081;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
