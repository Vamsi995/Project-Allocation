//imports
const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
require("dotenv/config");

// start the server
const session = require("express-session");
const cors = require("cors");
const path = require("path");
const app = express();

app.use(cors());

//use body-parser
app.use(bodyparser.json());
mongoose.set("useFindAndModify", false);

var mongoConnect = process.env.MONGO_URL;
//connect to mongodb
mongoose
    .connect(mongoConnect, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("connected to mongodb");
    })
    .catch((err) => {
        console.log(err);
    });

//define all routes below this
const student = require("./routes/student");
app.use("/student", student);

const PORT = process.env.PORT || 8080;

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/btp-frontend/index.html"));
});

//start server
app.listen(PORT, () => {
    console.log("Server connected to port " + PORT);
});