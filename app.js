const express = require('express');
const logger = require('morgan');
const rootRouter = require('./routes/root');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', rootRouter);

// noinspection JSUnusedLocalSymbols
app.use(function(err, req, res, next){
  console.error(err);
  res.status(500);
  res.send({
    message: err.message,
    status: 500
  });
});

module.exports = app;
