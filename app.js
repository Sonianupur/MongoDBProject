// const express = require("express");
// const mongoose = require("mongoose");
// const path = require("path");
// const bodyParser = require("body-parser");
// const app = express();
// const port = process.env.PORT || 3000;

// // Connect to MongoDB Atlas
//mongoose.connect('mongodb+srv://nupur9808012:admin@testcluster.u6sdkqo.mongodb.net/RecipieSharing')
//   .then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.error('Could not connect to MongoDB', err));

// // Set the view engine to EJS
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));

// // Serve static files
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // Define routes for the different pages
// app.get("/", (req, res) => {
//   res.render("home"); // Render the home.ejs view
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const methodOverride = require("method-override");

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://nupur9808012:admin@testcluster.u6sdkqo.mongodb.net/RecipieSharing"
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
const indexRoute = require("./routes/index");
const recipeRoutes = require("./routes/recipes");
const userRoutes = require("./routes/users");
app.use("/", indexRoute);
app.use("/recipes", recipeRoutes);
app.use("/auth", userRoutes);

// Additional static routes
app.get("/signup", (req, res) => {
  res.render("signup");
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/contact", (req, res) => {
  res.render("contact");
});
app.get("/faq", (req, res) => {
  res.render("faq");
});
app.get("/Healthyoptions", (req, res) => {
  res.render("Healthyoptions");
});
app.get("/moderntwist", (req, res) => {
  res.render("moderntwist");
});
app.get("/Communityfavourite", (req, res) => {
  res.render("Communityfavourite");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
