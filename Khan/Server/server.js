/* Express --------------------------------------------*/
const express = require("express");
const app = express();
const server = require('http').createServer(app);
global.activate_trigger = 1;
/* Socket.io server------------------------------------*/
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
});

const socketController = require("./app/controllers/socket.controller").socketController;
io.on('connection', socket => {
  socketController(socket);
});

/* Body Parser (content-type - application/json) -----*/
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* Cors --------------------------------------------*/
const cors = require('cors')
app.use(cors());

/* dotEnv --------------------------------------------*/
require("dotenv").config();

/* Express Session------------------------------------*/
/* const session = require('express-session');
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
})); */

/* App Router------------------------------------*/
const routes = require("./app/routes");

app.use(function (req, res, next) {
  req.io = io;
  req.body = {...req.body,...req.query};
  res.header(
    "Access-Control-Allow-Headers",
    "*"
  );
  next();
})
app.get('/',(req,res)=>{
  res.send('Xin Chào, đây là phần mềm quản lý nhiệt độ kho lạnh');
})
routes(app);
/* Get real time data-----*/
const setRealtimeData = require('./app/controllers/data.controller').setRealtimeData;


/* Databasse Connect------------------------------------*/
const db = require("./app/models");
db.mongoose
  .connect(process.env.DB_CONECTION, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("MongoDB Connect Success");
    setRealtimeData(io);
  })
  .catch((err) => {
    console.error("Connect to MongoDB failed", err);
    process.exit();
  });


/* Run Server------------------------------------*/
app.set('port', process.env.PORT || 8080);
server.listen(app.get('port'), function() {
  console.log('I am nunning at port: ', app.get('port'));
});




