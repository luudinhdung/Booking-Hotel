const express = require("express");
const app = express();
const port = 6060;
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtSecret = "aunasdfsdffsdjlksfdjl";
const salt = bcrypt.genSaltSync(10);
const db = require("./config/index");
const UserModel = require("./models/User");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");



db.connect();
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
//xQYLaGDmO7JLesCq
app.post("/register", async (req, res) => {
  const { name, email, password, role, avatar } = req.body;
  try {
    const checkEmail = await UserModel.findOne({
      email: email,
    });
    if (checkEmail) {
      return res.json({
        mess: "tai khoan da ton tai",
      });
    } else if (!checkEmail) {
      await UserModel.create({
        name,
        email,
        password: bcrypt.hashSync(password, salt),
        role,
        avatar,
      });
      return res.json({
        mess: "dang ki thanh cong",
      });
    }
  } catch (error) {
    res.status(422).json(error);
  }
});
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      const checkPass = bcrypt.compareSync(password, user.password);
      if (checkPass) {
        jwt.sign(
          {
            email: user.email,
            id: user._id,
          },
          jwtSecret,
          (err, token) => {
            if (err) throw err;
            res
              .cookie("token", token, { httpOnly: true })
              .json({ user, mess: "Đăng nhập thành công" });
          }
        );
      } else {
        res.json({
          mess: "Sai mật khẩu",
        });
      }
    } else {
      res.json({
        mess: "email không tồn tại",
      });
    }
  } catch (error) {
    res.status(422).json(error);
  }
});
var checkLogin = (req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    const user = jwt.verify(token, jwtSecret);
    UserModel.findOne({
      _id: user.id,
    }).then((data) => {
      if (data) {
        req.data = data;
        next();
      }
    });
  } else {
    res.json([
      {
        pass: false,
        mess: "ban chua dang nhap",
      },
    ]);
  }
};
var checkLogin = (req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    const user = jwt.verify(token, jwtSecret);
    UserModel.findOne({
      _id: user.id,
    }).then((data) => {
      if (data) {
        req.data = data;
        next();
      }
    });
  } else {
    res.json([
      {
        pass: false,
        mess: "ban chua dang nhap",
      },
    ]);
  }
};
var checkAdmin = (req, res, next) => {
  if (req.data.role === "admin") {
    next();
  } else {
    res.json([
      {
        pass: false,
        mess: "ban khong du quyen",
      },
    ]);
  }
};
app.get("/test", checkLogin, checkAdmin, (req, res) => {
  console.log(1);
  res.json([
    {
      pass: true,
      data: req.data,
      mess: "ban du quyen",
    },
  ]);
});
app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, async (err, userData) => {
      if (err) throw err;
      const { name, email, _id, role, avatar } = await UserModel.findById(
        userData.id
      );
      res.json({ name, email, _id, role, avatar });
    });
  }
});
app.post("/logout", async (req, res) => {
  return res.cookie("token", "").json("dang xuat");
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
