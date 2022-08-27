var io = require("socket.io-client");
var socket = io.connect("http://vikhan.herokuapp.com/");
var myUser = "5fc05b70d2b6a82f10235ded";
var myToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYzA1YjcwZDJiNmE4MmYxMDIzNWRlZCIsImlhdCI6MTYwNzU2OTc5NSwiZXhwIjoxNjA3NjU2MTk1fQ.gUWKqEHuHHqnhqB8Q5zTfZCdnVThVR7FJqVoSyqwvHY";

console.log("run socket client");
socket.on("connect", function () {
  console.log("connect");
  socket.emit("login", myToken);
});
socket.on("data_room", function (data) {
  //console.log(data);
});

socket.on("data_sensor", function (data) {
  //console.log(data);
});

socket.on("data_cube_room", function (data) {
  console.log(data);
});
socket.on("log", function (data) {
  console.log(data);
});

socket.on("data_area", function (data) {
  //console.log(data);
});

socket.on("notification", function (data) {
  //console.log(data);
});

socket.on("access", function (data) {
  console.log(data);
  if (data.message == "accepted") {
  }
  if (data.message == "invite") {
  }
  if (data.message == "add") {
  }
  if (data.message == "edit") {
  }
  if (data.message == "delete") {
  }
});

socket.on("area", function (data) {
  if (data.message == "add") {
    console.log(data);
  }
  if (data.message == "edit") {
    console.log(data);
  }
  if (data.message == "delete") {
    console.log(data);
  }
  if (data.message == "add-monitor") {
    console.log(data);
  }
  if (data.message == "edit-monitor") {
    console.log(data);
  }
  if (data.message == "switch-monitor") {
    console.log(data);
  }
  if (data.message == "delete-monitor") {
    console.log(data);
  }
});

socket.on("activate", function (data) {
  if (data.message == "add") {
    console.log(data);
  }
  if (data.message == "delete") {
    console.log(data);
  }
});

socket.on("room", function (data) {
  if (data.message == "edit") {
  }
  if (data.message == "delete") {
  }
});

socket.on("structure", function (data) {
  if (data.message == "add") {
    console.log(data);
  }
  if (data.message == "update") {
    console.log(data);
  }
  if (data.message == "delete") {
    console.log(data);
  }
});

socket.on("disconnect", function () {});
