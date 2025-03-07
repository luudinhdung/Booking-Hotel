const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 6060;
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const jwtSecret = "aunasdfsdffsdjlksfdjl";
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
const db = require("./config/index");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const path = require("path");
const fs = require("fs");
const UserModel = require("./models/User");
const PlaceModel = require("./models/Places");
const BookingModel = require("./models/Booking");
const CommentModel = require("./models/Comment");
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
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
app.post("/avatar", upload.single("photos"), async (req, res) => {
  const files = req.file;
  let uploadFile = "";
  const { path, originalname } = files;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);
  uploadFile = newPath.replace("uploads/", "");
  res.json(uploadFile);
});
app.post("/upload", upload.array("photos", 100), async (req, res) => {
  const files = req.files;
  const uploadFile = [];
  for (let i = 0; i < files.length; i++) {
    const { path, originalname } = files[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    uploadFile.push(newPath.replace("uploads/", ""));
  }
  res.json(uploadFile);
});
app.post("/places", async (req, res) => {
  const {
    title,
    address,
    addedPhotos,
    desc,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, async (err, userData) => {
      if (err) throw err;
      const placeDoc = await PlaceModel.create({
        title,
        address,
        addedPhotos,
        desc,
        checkIn,
        checkOut,
        maxGuests,
        price,
      });
      return res.json(placeDoc);
    });
  }
});

app.get("/place", async (req, res) => {
  const data = await PlaceModel.find({});
  res.json(data);
});
app.get("/places/:id", async (req, res) => {
  const { id } = req.params;
  const data = await PlaceModel.findById(id);
  res.json(data);
});
app.put("/places", async (req, res) => {
  const { id, title, address, addedPhotos, desc, maxGuests, price } = req.body;
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, async (err, userData) => {
      if (err) throw err;
      const place = await PlaceModel.findById(id);
      if (place) {
        place.set({ title, address, addedPhotos, desc, maxGuests, price });
        await place.save();
      }
      res.json(place);
    });
  }
});
app.get("/detail", async (req, res) => {
  const data = await PlaceModel.find();
  return res.json(data);
});
app.post("/booking", async (req, res) => {
  const { id, userId, checkIn, checkOut } = req.body;
  const place = await PlaceModel.findOne({
    _id: id,
  });
  const booking = await BookingModel.create({
    place,
    userBooking: userId,
    checkIn: checkIn,
    checkOut: checkOut,
  });
  res.json(booking);
});
app.get("/booking", async (req, res) => {
  const data = await BookingModel.find({});
  return res.json(data);
});
app.post("/comment", async (req, res) => {
  const { comment, user, time, select } = req.body;
  const data = CommentModel.create({
    user: user,
    content: comment,
    time: time,
    bookingId: select,
  });
  res.json(data);
});

app.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  const data = await CommentModel.deleteOne({ _id: id });
  res.json(data);
});
app.put("/comment", async (req, res) => {
  const { content, id } = req.body;
  const data = await CommentModel.findById(id);
  if (data) {
    data.set({ content });
    await data.save();
  }
  res.json(data);
});
app.get("/comment", async (req, res) => {
  const data = await CommentModel.find({});
  res.json(data);
});
app.get("/user", async (req, res) => {
  const data = await UserModel.find({});
  res.json(data);
});
app.post("/logout", async (req, res) => {
  return res.cookie("token", "").json("dang xuat");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
