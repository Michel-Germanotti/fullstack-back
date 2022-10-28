const express = require("express");
const cors = require("cors");
const API_KEY = "b79b08236e3a246947a51fcd41889b2f-8845d1b1-1232a9d3";
const DOMAIN = "sandbox3f46ae4927d44f788982ab8a4eab79ea.mailgun.org";
const formData = require("form-data");
const Mailgun = require("mailgun.js");
require("dotenv").config();


const app = express();
app.use(express.json());
app.use(cors());

/* MAILGUN CONFIGURATION */
const mailgun = new Mailgun(formData);
const client = mailgun.client({ username: "api", key: API_KEY });

app.get("/", (req, res) => {
  res.send("server is up");
});

app.post("/form", async (req, res) => {
  try {
    const messageData = {
      from: `${req.body.firstname} ${req.body.lastname} <${req.body.email}>`,
      to: "michel.gmv3@gmail.com",
      subject: req.body.subject,
      text: req.body.message,
    };

    const result = await client.messages.create(DOMAIN, messageData);
    // console.log(result);
    res.json(result);
  } catch (error) {
    // console.error(error);
    res.status(400).json(error.message);
  }
});

app.listen(3000, () => {
  console.log("server is listening");
});