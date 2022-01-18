"use strict"

// Importing Packages
const express = require("express");
const cookieParser = require("cookie-parser");
const { port, secrets: { cookieSecret } } = require("./src/helper/config");

// Importing App Router
const appRouter = require("./src/app");

// Initializing Express Application 
const app = express();

// Using Middleware 
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser(cookieSecret));

// Using App Router
app.use(appRouter);

// Handling 404 Error
app.use((req, res, next) => {
    const error = new Error("This Request does not exist! ❌");
    error.status = 404;
    next(error);
});

// Handling Server Error
app.use((error, req, res, next) => {
    console.log(error.stack);
    const status = error.status || 500;
    const message = error.message || "Internal Server Error! 🚫";
    res.status(status).json({error: {message}});
})

// Run Server
app.listen(port, () =>{
    console.log(`Server Running at http://localhost:${port}`);
})

