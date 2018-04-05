const express = require('express');
const history = require('connect-history-api-fallback');
const serveStatic = require('serve-static');

const port = 3002;
const dist = `${__dirname}/dist`;
const app = express();
app.use(history());
app.use(serveStatic(dist));
app.listen(port);
