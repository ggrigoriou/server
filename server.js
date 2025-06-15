const express = require('express');
const connectDB = require('./db');
const apiRouter = require('./router');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const seedOnce = require('./src/scripts/seed');

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


async function start() {
  await connectDB();
  await seedOnce();   
}

start().catch(err => {
  console.error(err);
  process.exit(1);
});

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
