const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const passport = require("passport");
require("dotenv").config();
app.use(express.json());
app.use(cors());
const userRoute = require("./routes/users");
const uri = process.env.MONGODB_URI;
mongoose
  .connect( uri, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() =>
    console.log("The connection to MongoDB is established successfully")
  )
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", userRoute);
const port = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.json({ message: "The app is running" });
});
app.listen(port, () => {
  `Server is running at ${port}`;
});
