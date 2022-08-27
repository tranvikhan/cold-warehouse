exports.showNotification= (title,content)=> {
    var options = {
    body: content,
    icon: "http://vikhan.tk/assets/img/logo1.png",
    dir: "ltr",
    timestamp: 3000
    };
    new Notification(title, options);
}