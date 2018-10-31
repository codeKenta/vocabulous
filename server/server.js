"use strict";
require("dotenv").config();
const express = require("express");
const server = express();
const port = process.env.PORT || "3005";
const path = require("path");
const dbConnection = require("./database");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const bodyParser = require("body-parser");
const passport = require("passport");
const figlet = require("figlet");
const api = require("./api/api");
const usersApi = require("./api/users");
server.set("port", port);

/*-*-*-*-*-*-*-*-*-*-*
 * M i d d l w a r e s
 *-*-*-*-*-*-*-*-*-*-*/
server.use(
  session({
    secret: "volo-voco-bulo-lush-ious",
    resave: false,
    store: new MongoStore({ mongooseConnection: dbConnection }),
    saveUninitialized: false
  })
);

// Passport
server.use(passport.initialize());
server.use(passport.session());
require("./passport")(passport);

// Body-parser
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

server.use(express.static(path.join(__dirname, "../client/build")));

/*-*-*-*-*-*-*-*
 * R o u t e s
 *-*-*-*-*-*-*/
server.use("/api", api);
server.use("/users", usersApi);

server.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

server.listen(port, () =>
  figlet("     Vocabulous\nServer Are Go \n", (err, data) =>
    console.log(`${data} \n PORT ${port}\n `)
  )
);
