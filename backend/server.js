const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/hackathon", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const RegistrationSchema = new mongoose.Schema({
  name: String,
  email: String,
  teamName: String,
});

const Registration = mongoose.model("Registration", RegistrationSchema);

app.post("/register", async (req, res) => {
  try {
    const newReg = new Registration(req.body);
    await newReg.save();
    res.status(200).send("Registration successful");
  } catch (err) {
    res.status(500).send("Error registering");
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));