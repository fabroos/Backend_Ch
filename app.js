"use strict";

const express = require('express');

const {
  Server: httpServer
} = require('http');

const createWebScoketServer = require('./socket/webSocketServer.js');

const webRouter = require('./router/web.js');

const app = express();
app.use(express.static('public'));
app.use(webRouter);
const server = httpServer(app);
const io = createWebScoketServer(server);
const port = 8080;
server.listen(port, () => {
  console.log(`
Server is listening on port ${server.address().port}
Open up http://localhost:${port}/ in your browser
`);
});
