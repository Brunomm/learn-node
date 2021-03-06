const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
  res.send('Hello world\n');
});

require('./controllers/authController')(app);
require('./controllers/projectsController')(app);

app.listen(3000, '0.0.0.0');