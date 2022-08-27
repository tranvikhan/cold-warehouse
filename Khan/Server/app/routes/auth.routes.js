const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");

module.exports = function (app){
  /* Sign Up --------------------------------------------*/
  app.post(
    "/api/auth/signup",
    [verifySignUp.checkDuplicateUsernameOrEmail],
    controller.signup
  );
  
  /* Sign In --------------------------------------------*/
  app.post("/api/auth/signin", controller.signin);

  /* Refesh Token -------------------------------------- */
  
};
