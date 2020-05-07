const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const userHandler = require("./controllers/user");

require("dotenv").config();

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("MongoDB database connection established successfully.");
});

const app = express();
const port = process.env.PORT || 5000;

const FRONTENDURL =
  process.env.NODE_ENV == "development"
    ? "http://localhost:3000"
    : process.env.CLIENT_URL;

const corsOptions = {
  origin: FRONTENDURL,
  methods: "GET,HEAD,POST,PATCH,DELETE,PUT,OPTIONS",
  credentials: true,
  allowedHeaders: "Content-Type, Authorization, X-Requested-With",
};
app.use(cors(corsOptions));

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


if (process.env.NODE_ENV == "production") {
  const path = require("path");
  app.use(express.static(path.join(__dirname, "build")));
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });
}

app.use("/bugs", userHandler.authUser);

app.use("/user", userHandler.authUser);

const bugsRouter = require("./routes/bugs");
const userRouter = require("./routes/user");

app.post("/login", userHandler.login);
app.post("/register", userHandler.register);

app.use("/bugs", bugsRouter);
app.use("/user", userRouter);

app.use(function (error, req, res, next) {
  console.log(error.toString());
  res.json({ message: error.message });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
