const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");
const upload = require('../middlewares/upload');

module.exports = function (app) {
  /* Get All On System -----------------------------------------*/
  /* Use for Dev */
  app.get("/api/user/",[authJwt.verifyToken], controller.getAllUser);

  /* Find User By string -------------------------------------*/
  app.get("/api/user/find", [authJwt.verifyToken],controller.findUser);

  /* User Get Avartar -------------------------------------*/
  app.get("/api/user/avatar/:filename", controller.getAvatar);

  /*Upload User Avartar -------------------------------------*/
  app.post("/api/user/avatar/",[authJwt.verifyToken,upload.single('image')], controller.uploadAvatar);

  /* Edit User Infomation -------------------------------------*/
  app.post("/api/user/edit",[authJwt.verifyToken], controller.editUser);

  /* Forgot Password -------------------------------------*/
  app.post("/api/user/forgotPassword", controller.forgotPassword);

  /* Change Password -------------------------------------*/
  app.post("/api/user/changePassword",[authJwt.verifyToken], controller.changePassword);
};
