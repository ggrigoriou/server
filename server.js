const express = require('express');
const connectDB = require('./db');
const apiRouter = require('./router');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const {
  hostname,
  port
} = require('./const');

const app = express();

app
  .use(
    bodyParser.json()
  )
  .use(
    bodyParser.urlencoded(
      {
        extended: true
      }
    )
  )
  .use(
    cors()
  );

connectDB();

app
  .use(
    '/api',
    apiRouter
  )
  .use(
    express.static(
      path.join(
        __dirname,
        '../distributable/education-app'
      )
    )
  );

app.get(
  '/*',
  (
    req,
    res
  ) => {
    res.sendFile(
      path.join(
        __dirname,
        '../distributable/education-app/index.html'
      )
    );
  }
);

app.listen(
  port,
  '0.0.0.0',
  () => {
    console.log(
      `Server running at ${hostname}:${port}`
    );
  }
);
