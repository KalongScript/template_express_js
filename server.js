require("dotenv").config();
const env = process.env;
const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("express-flash");
const helmet = require("helmet");
// const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const upload = multer();
const app = express();
const port = env.PORT || 4000;

const webRouter = require("./routes/web");
const apiRouter = require("./routes/api");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(upload.array());
app.use(helmet());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// setting session
app.use(
  session({
    cookie: { maxAge: 60000 },
    store: new session.MemoryStore(),
    saveUninitialized: true,
    resave: "true",
    secret: "secret",
  })
);

app.use(flash());
// app.use(cors());

app.use("/", webRouter);
app.use("/api", apiRouter);

// Prevent access public folder
app.get("/stylesheets/*", (req, res, next) => {
  res.send("Access not allowed");
});
app.get("/javascripts/*", (req, res, next) => {
  res.send("Access not allowed");
});
app.get("/bootstrap/*", (req, res, next) => {
  res.send("Access not allowed");
});

app.listen(port, () => {
  console.log(`Rest api listening to http://localhost:${port}`);
});
