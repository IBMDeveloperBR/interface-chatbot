require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const compress = require('compression');
const watson = require('./watson');

const ENV = process.env.NODE_ENV;
const app = express();

app.use(compress());

app.use(morgan(process.env.NODE_ENV || 'dev'));
app.use(cors());

// helmet config
app.use(helmet());
app.use(helmet.hidePoweredBy({ setTo: 'PHP 5.5.14' }));
app.use(helmet.xssFilter());
app.disable('x-powered-by');

// Point static path to dist
app.use(express.static(path.join(__dirname, '../client/dist/client/')));

// body-parser config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// production https redirect
if (ENV === 'production') {
  app.enable('trust proxy');

  app.use((req, res, next) => {
    if (req.secure || process.env.BLUEMIX_REGION === undefined) {
      next();
    } else {
      res.redirect(`https://${req.headers.host}${req.url}`);
    }
  });
}

// Rota que recebe a mensagem do front e retorna a resposta do assistant
app.post('/api/message', (req, res, next) => {
  if (req.body.credentials) {
    watson.custom_assistant(req.body.msg, req.body.ctx, req.body.credentials)
      .then(data => res.json(data))
      .catch(err => next({ err, msg: 'Erro no request ao custom assistant', status: 500 }));
  } else {
    watson.default_assistant.message(req.body.msg, req.body.ctx)
      .then(data => res.json(data))
      .catch(err => next({ err, msg: 'Erro no request ao default assistant', status: 500 }));
  }
});

// Call Angular
app.all('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/client/index.html'));
});

// Error handler
app.use((err, req, res, next) => {
  if (err.err) {
    // eslint-disable-next-line no-console
    console.error('\x1b[31m', `[SERVER] ${err.err}`);
    res.status(err.status || 500).json({ result: err.msg });
  }
  next();
});

module.exports = app;
