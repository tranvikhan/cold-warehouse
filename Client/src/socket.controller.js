import { showNotification } from "helpers/webNotification";
import {
  getAreaDataSuccess,
  getCubeDataSuccess,
  getCurrentDataSuccess,
  getSensorData,
  pushNotification,
  updateNotification,
} from "redux/actions";

const MySocket = (socket, dispatch, user, addToast) => {
  socket.on("connect", function () {
    console.log("Socket io Client", "connect");
    socket.emit("login", user.accessToken);
  });

  socket.on("data_cube_room", function (data) {
    if (currenr.room._id === data.room) {
      dispatch(getCubeDataSuccess(data));
    }
    console.log("Socket io Client Cube", data);
  });

  socket.on("data_room", function (data) {
    if (currenr.room._id === data.room) {
      dispatch(getSensorData(user, data.room));
      dispatch(getCurrentDataSuccess(data));
    }
    console.log("Socket io Client Curent Data", data);
  });
  socket.on("log", function (data) {
    console.log("Socket io Client Log", data);
  });

  socket.on("data_area", function (data) {
    if (currenr.room._id === data.room) dispatch(getAreaDataSuccess(data));

    console.log("Socket io Client Area", data);
  });

  socket.on("notification", function (data) {
    if (data.message == "add") {
      dispatch(pushNotification(data.data));

      if (Notification.permission == "granted") {
        showNotification("Quản lý nhiệt độ kho lạnh", data.data.content);
      } else {
        addToast(data.data.content, {
          appearance: "warning",
          autoDismiss: true,
        });
      }
    }
    if (data.message == "update") {
      dispatch(updateNotification(data.data._id, data.data));
    }
    //console.log('Socket io Client Notification',data);
  });

  socket.on("access", function (data) {
    console.log("Socket io Client", data);
    if (data.message == "add") {
      socket.emit("join-room", "room" + data.data.access.room);
      if (Notification.permission == "granted") {
        showNotification("Quản lý nhiệt độ kho lạnh", data.data.content);
      } else {
        addToast(data.data.content, {
          appearance: "warning",
          autoDismiss: true,
        });
      }
    }
    if (data.message == "edit") {
      //do something
    }
    if (data.message == "delete" && data.data.access.user == user.user._id) {
      socket.emit("leave-room", "room" + data.data.access.room);
    }
  });
  /*


    socket.on('area', function(data){
        if(data.message == 'add'){
            console.log('Socket io Client',data);  
        }
        if(data.message == 'edit'){
            console.log('Socket io Client',data);  
        }
        if(data.message == 'delete'){
            console.log('Socket io Client',data);  
        }
        if(data.message == 'add-monitor'){
            console.log('Socket io Client',data);  
        }
        if(data.message == 'edit-monitor'){
            console.log('Socket io Client',data);  
        }
        if(data.message == 'switch-monitor'){
            console.log('Socket io Client',data);  
        }
        if(data.message == 'delete-monitor'){
            console.log('Socket io Client',data);  
        }
    })


    socket.on('activate', function(data){
        if(data.message == 'add'){
            console.log('Socket io Client',data); 
        }
        if(data.message == 'delete'){
            console.log('Socket io Client',data);  
        }
    }); */

  socket.on("room", function (data) {
    /*    if(data.message == 'delete'){
            let defaultRoom = getRoomCookieDefault();
            if(defaultRoom)
                if(defaultRoom.room._id === data.data.room._id){
                    setRoomCookieDefault(null);
                }
            dispatch(getRoomList(user));
            socket.emit('leave-room', 'room'+data.data.room._id); 
        }
        if(data.message == 'edit'){
            console.log('Socket io Client',data);
            let defaultRoom = getRoomCookieDefault();
            dispatch(getRoomList(user));
            if(defaultRoom.room._id === data.data._id){
                setRoomCookieDefault({...defaultRoom,room:{
                    _id:    data.data._id,
                    name:   data.data.name
                }});
                dispatch(setDefaultRoom(getRoomCookieDefault()));
                dispatch(getcurrenr.room(data.data._id,user.accessToken));
            }
        } */
  });

  /*  socket.on('structure', function(data){
        if(data.message == 'add'){
            console.log('Socket io Client',data); 
        }
        if(data.message == 'update'){
            console.log('Socket io Client',data);  
        }
    });
 */

  socket.on("disconnect", function () {});
};

export default MySocket;
