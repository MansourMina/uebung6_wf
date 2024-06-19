const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const path = require('path');
const history = require('connect-history-api-fallback');
const { errorHandler, notFound } = require('./middleware/errorHandler');

require('colors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(history());

app.use(express.static(path.join(__dirname, '/public/browser')));

app.use('/', routes);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT ?? 5000;

app.listen(PORT);
