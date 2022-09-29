const express = require('express');
const app = express();
const loginRoute = require('./api/routes/login');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { urlencoded } = require('body-parser');
mongoose.connect(
  "mongodb://localhost:27017/Login",
  (err, result) => {
    if (err)  {
      return console.log(
        "error")
    } else {
      return console.log(
        "Connected to database")
    }
  }
     
);

var cors = require('cors');
app.use(cors({
  origin:'http://localhost:4200'
}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/Auth',loginRoute)

app.use((req, res) => {
  // res.status(200).json({
  //   message: 'Welcome to the API'
  // });
  res.status(404).json({
    error: 'bad request'
  })
});

module.exports = app;