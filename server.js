const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
require("dotenv").config();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Initialized");
});

app.listen(process.env.PORT, () => {
    console.log("Server Running!")
})

