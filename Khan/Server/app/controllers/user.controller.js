const db = require("../models");
const fs = require("fs");
const result = require("../helps/result.helps");
const mailler = require("../helps/mailler.help");
const User = db.user;
var bcrypt = require("bcryptjs");
const Resize = require("../helps/resizeImage.help");
const path = require("path");
const config = require("../config/auth.config");

/* Get All On System -----------------------------------------*/
exports.getAllUser = (req, res) => {
  User.find({}, "fullname username _id avatar email status").exec(
    (err, users) => {
      if (err) {
        result.ServerError(res, err);
        return;
      }
      if (users) result.Ok(res, { users: users });
    }
  );
};

exports.getAvatar = (req, res) => {
  try {
    fs.readFile(
      "./uploads/UserAvatar/" + req.params.filename,
      function (err, data) {
        if (err) {
          try {
            fs.readFile(
              "./uploads/UserAvatar/default.jpg",
              function (err2, data) {
                if (err2) {
                  res.status(404).send("Not Found 1");
                } else {
                  res.writeHead(200, { "Content-Type": "image/jpeg" });
                  res.end(data); // Send the file data to the browser.
                }
              }
            );
          } catch (err) {
            res.status(404).send("Not Found 2");
          }
        } else {
          res.writeHead(200, { "Content-Type": "image/jpeg" });
          res.end(data); // Send the file data to the browser.
        }
      }
    );
  } catch (errs) {
    res.status(404).send("Not Found 3");
  }
};

/* Find User By string -------------------------------------*/
exports.findUser = (req, res) => {
  User.find(
    {
      $or: [
        { username: new RegExp(req.body.search_string, "i") },
        { email: new RegExp(req.body.search_string, "i") },
        { fullname: new RegExp(req.body.search_string, "i") },
      ],
    },
    "fullname username _id avatar email status"
  ).exec((err, users) => {
    if (err) {
      result.ServerError(res, err);
      return;
    }

    result.Ok(res, { users: users });
  });
};

exports.editUser = (req, res) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      result.ServerError(res, err);
      return;
    }

    if (req.body.fullname) {
      user.fullname = req.body.fullname;
    }
    if (req.body.phone) {
      user.phone = req.body.phone;
    }
    if (req.body.gender) {
      user.gender = req.body.gender;
    }
    if (req.body.address) {
      user.address = req.body.address;
    }
    if (req.body.dateOfBirth) {
      user.dateOfBirth = req.body.dateOfBirth;
    }

    user
      .save()
      .then((newUser) => {
        newUser.password = null;
        result.Ok(res, { user: newUser });
      })
      .catch((err) => {
        result.ServerError(res, err);
      });
  });
};

/* Forgot Password -------------------------------------*/
exports.forgotPassword = (req, res) => {
  User.findOne({
    username: req.body.username,
    email: req.body.email,
  }).exec((err, user) => {
    if (err) {
      result.ServerError(res, err);
      return;
    }
    if (user) {
      let newPassword = Math.random().toString(36).slice(-8);
      user.password = bcrypt.hashSync(newPassword, 8);
      user
        .save()
        .then(() => {
          mailler
            .sendMail(
              req.body.email,
              "ĐỔI MẬT KHẨU",
              htmlData(user, newPassword)
            )
            .then(() => {
              result.Ok(res, "Mật khẩu mới đã được gửi vào email của bạn");
            })
            .catch((err) => {
              result.ServerError(res, err);
            });
        })
        .catch((err) => {
          result.ServerError(res, err);
        });
    } else {
      result.NotFound(res, "Thông tin khôi phục mật khẩu không chính xác");
    }
  });
};

/* Change Password -------------------------------------*/
exports.changePassword = (req, res) => {
  User.findOne({
    _id: req.userId,
  }).exec((err, user) => {
    if (err) {
      result.ServerError(res, err);
      return;
    }
    if (user) {
      var passwordIsValid = bcrypt.compareSync(
        req.body.oldPassword,
        user.password
      );
      if (!passwordIsValid) {
        result.BadRequest(res, "Sai mật khẩu cũ");
        return;
      }
      user.password = bcrypt.hashSync(req.body.newPassword, 8);
      user
        .save()
        .then(() => {
          result.Ok(res, { password: req.body.newPassword });
        })
        .catch((err) => {
          result.ServerError(res, err);
        });
    } else {
      result.NotFound(res, "Không thể tìm thấy tài khoản");
    }
  });
};

/* Upload Avatar -------------------------------------*/
exports.uploadAvatar = function (req, res) {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      result.ServerError(res, err);
      return;
    }
    if (user) {
      let userAvatar = user.avatar.slice(
        user.avatar.lastIndexOf("/") + 1,
        user.avatar.length
      );
      if (userAvatar != config.avatarDefault) {
        fs.unlink("./uploads/UserAvatar/" + userAvatar, (err) => {});
      }
      const imagePath = path.join(__dirname, "../../uploads/UserAvatar");
      const fileUpload = new Resize(imagePath);
      if (!req.file) {
        result.BadRequest(res, "Không tìm thấy file upload");
        return;
      }
      fileUpload.save(req.file.buffer).then((filename) => {
        user.avatar = config.baseUrl + "api/user/avatar/" + filename;
        user
          .save()
          .then(() => {
            user.password = null;
            result.Ok(res, { user: user });
          })
          .catch((err) => {
            result.ServerError(res, err);
          });
      });
    }
  });
};

const htmlData = (user, newPassword) => {
  return `<p>&nbsp;</p>
  <div style="margin: 0; background-color: #f4f8f9;">
  <table style="font-family: Arial,Helvetica,sans-serif; font-size: 13px; color: #706f6f; line-height: 140%; width: 100%; background-color: #f4f8f9;" border="0" cellspacing="0" cellpadding="0">
  <tbody>
  <tr>
  <td>
  <table style="width: 524px;" border="0" cellspacing="0" cellpadding="0" align="center">
  <tbody>
  <tr>
  <td colspan="3" valign="bottom"><img class="CToWUd" style="vertical-align: bottom;" src="https://123host.vn/wp-content/uploads/email-top.jpg" alt="" width="524" height="24" /></td>
  </tr>
  <tr>
  <td width="524">
  <table border="0" cellspacing="0" cellpadding="0" align="center">
  <tbody>
  <tr>
  <td style="border-right: #f5f6f8 solid 1px; border-left: #f4f8f9 solid 1px;">
  <table border="0" cellspacing="0" cellpadding="0" align="center">
  <tbody>
  <tr>
  <td style="border-right: #f5f6f8 solid 1px; border-left: #f4f8f9 solid 1px;">
  <table border="0" cellspacing="0" cellpadding="0" align="center">
  <tbody>
  <tr>
  <td style="border-right: #f3f4f6 solid 1px; border-left: #f4f8f9 solid 1px;">
  <table border="0" cellspacing="0" cellpadding="0" align="center">
  <tbody>
  <tr>
  <td style="border-right: #f0f1f3 solid 1px; border-left: #f4f8f9 solid 1px;">
  <table border="0" cellspacing="0" cellpadding="0" align="center">
  <tbody>
  <tr>
  <td style="border-right: #ecedef solid 1px; border-left: #f4f8f9 solid 1px;">
  <table border="0" cellspacing="0" cellpadding="0" align="center">
  <tbody>
  <tr>
  <td style="border-right: #e6e7e9 solid 1px; border-left: #f6f7f9 solid 1px;">
  <table border="0" cellspacing="0" cellpadding="0" align="center">
  <tbody>
  <tr>
  <td style="border-right: #e1e2e4 solid 1px; border-left: #f5f6f8 solid 1px;">
  <table border="0" cellspacing="0" cellpadding="0" align="center">
  <tbody>
  <tr>
  <td style="border-right: #dadbdd solid 1px; border-left: #f3f7f8 solid 1px;">
  <table border="0" cellspacing="0" cellpadding="0" align="center">
  <tbody>
  <tr>
  <td style="border-right: #d2d6d7 solid 1px; border-left: #f1f5f6 solid 1px;">
  <table border="0" cellspacing="0" cellpadding="0" align="center">
  <tbody>
  <tr>
  <td style="border-right: #d2d3d5 solid 1px; border-left: #f0f1f3 solid 1px;">
  <table style="width: 504px;" border="0" cellspacing="0" cellpadding="0" align="center">
  <tbody>
  <tr>
  <td style="background-color: #ffffff;" valign="top" width="506">
  <table style="width: 504px;" border="0" cellspacing="0" cellpadding="0" align="left">
  <tbody>
  <tr>
  <td style="padding: 20px 0px; border-bottom: 3px solid #b6c2af; width: 172px;" align="center">
  <h1 style="border-right: #dedede solid 2px; margin: 0;"><img src="https://i.ibb.co/Ld2nm5z/icon.png" alt="" width="80" height="80" /></h1>
  </td>
  <td style="padding: 20px 0px; border-bottom: 3px solid #b6c2af; width: 326px;" align="center">
  <h3 style="margin: 0; color: #63bd68; font-weight: normal;"><span style="color: #2c3e50;"><strong>QUẢN L&Yacute; NHIỆT ĐỘ KHO LẠNH</strong></span></h3>
  </td>
  </tr>
  <tr>
  <td style="padding: 35px 30px 10px; background-color: #2c3e50; width: 440px;" colspan="2" valign="top"><span style="color: #ffffff;">K&iacute;nh ch&agrave;o <strong>${user.fullname}</strong>,</span><br /><br /><span style="color: #ffffff;"><strong>Mật khẩu đăng nhập mới của bạn l&agrave;</strong>:</span><br /><br />
  <h1><span style="color: #ffffff;"><strong>${newPassword}</strong></span></h1>
  <br /><span style="color: #ffffff;">Th&ocirc;ng tin c&aacute;c k&ecirc;nh hỗ trợ vui l&ograve;ng tham khảo tại <a style="color: #ffffff;" href="http://nqtoan.herokuapp.com/" target="_blank" rel="noopener">http://nqtoan.herokuapp.com/</a></span><br /><br /><span style="color: #ffffff;">Ch&acirc;n th&agrave;nh cảm ơn v&agrave; k&iacute;nh ch&agrave;o.</span></td>
  </tr>
  <tr>
  <td style="padding: 10px 0px 5px; width: 500px;" colspan="2" valign="middle">
  <table border="0" cellspacing="0" cellpadding="0">
  <tbody>
  <tr>
  <td width="140">&nbsp;</td>
  <td valign="middle" width="15" height="26"><a style="color: #706f6f; text-decoration: none;" href="http://nqtoan.herokuapp.com/" target="_blank" rel="noopener"><img class="CToWUd" style="border: 0; vertical-align: middle;" src="https://123host.vn/wp-content/uploads/facebook-icon-40x40.png" height="40" /></a></td>
  <td width="10">&nbsp;</td>
  <td><a style="color: #706f6f; text-decoration: none;" href="http://nqtoan.herokuapp.com/" target="_blank" rel="noopener"><img class="CToWUd" style="border: 0; vertical-align: middle;" src="https://123host.vn/wp-content/uploads/twitter-icon-40x40.png" height="40" /></a></td>
  <td width="10">&nbsp;</td>
  <td valign="middle" height="26"><a style="color: #706f6f; text-decoration: none;" href="http://nqtoan.herokuapp.com/" target="_blank" rel="noopener"><img class="CToWUd" style="border: 0; vertical-align: middle;" src="https://123host.vn/wp-content/uploads/icon-youtube40x40.png" height="40" /></a></td>
  <td width="10">&nbsp;</td>
  <td><a style="color: #706f6f; text-decoration: none;" href="http://nqtoan.herokuapp.com/" target="_blank" rel="noopener"><img class="CToWUd" style="border: 0; vertical-align: middle;" src="https://123host.vn/wp-content/uploads/googleplus40x40.png" height="40" /></a></td>
  </tr>
  </tbody>
  </table>
  </td>
  </tr>
  </tbody>
  </table>
  </td>
  </tr>
  </tbody>
  </table>
  </td>
  </tr>
  </tbody>
  </table>
  </td>
  </tr>
  </tbody>
  </table>
  </td>
  </tr>
  </tbody>
  </table>
  </td>
  </tr>
  </tbody>
  </table>
  </td>
  </tr>
  </tbody>
  </table>
  </td>
  </tr>
  </tbody>
  </table>
  </td>
  </tr>
  </tbody>
  </table>
  </td>
  </tr>
  </tbody>
  </table>
  </td>
  </tr>
  </tbody>
  </table>
  </td>
  </tr>
  </tbody>
  </table>
  </td>
  </tr>
  <tr>
  <td colspan="3" valign="top"><img class="CToWUd" style="vertical-align: top;" src="https://123host.vn/wp-content/uploads/email-but.jpg" alt="" width="524" height="24" /></td>
  </tr>
  </tbody>
  </table>
  </td>
  </tr>
  <tr>
  <td style="color: #9b9b9b; font-size: 11px; padding: 10px 0 20px;" align="center" valign="middle">Copyright &copy; Warehouse Temperature</td>
  </tr>
  </tbody>
  </table>
  <div class="yj6qo">&nbsp;</div>
  <div class="adL">&nbsp;</div>
  </div>`;
  /* return (
    `<h4 skip="true" style="text-align: left;"><span style="font-size: 18px;">Xin ch&agrave;o,` +
    user.fullname +
    `</span>
  <span style="font-size: 14px; font-family: Arial, Helvetica, sans-serif;"></span></h4><h3 style="text-align: left;
  "><span style="font-size: 24px;">Mật khẩu mới của bạn l&agrave;:</span></h3><p style="text-align: left;"><span style="font-size: 60px;">` +
    newPassword +
    `</span></p><p style="text-align: left;">Vui l&ograve;ng thay đổi mật khẩu khi đăng nhập th&agrave;nh c&ocirc;ng, xin cảm ơn <span class="fr-emoticon fr-deletable fr-emoticon-img" style="background:
  url(https://cdnjs.cloudflare.com/ajax/libs/emojione/2.0.1/assets/svg/1f600.svg);">&nbsp;</span></p>`
  ); */
};
