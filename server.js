// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var port = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// table data
// =============================================================
var lastRoute = 3;
var tables = [
  // {
  //   routeName: 1,
  //   name: "Anna",
  //   email: "",
  //   phoneNumber: ""
  // }
];
var waitlist = [
  // {
  //   routeName: 6,
  //   name: "Chanel",
  //   email: "",
  //   phoneNumber: ""
  // }
];
// functions
  function check(bool, name) {
    if(bool){
      alert("You made a reservation under the name '"+name+"'.");
    } else {
      alert("You are on the waitlist under the name '"+name+"'.");
    }
  }
// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});
// Get all tables
app.get("/all", function(req, res) {
  res.json(tables);
  res.json(waitlist);
});

app.get("/api/tables", function(req, res) {
  res.json(tables);
});

app.get("/api/waitlist", function(req, res) {
  res.json(waitlist);
});

// Search for Specific table (or all tables) - provides JSON
// app.get("/api/:tables?", function(req, res) {
//   var chosen = req.params.tables;

//   if (chosen) {
//     console.log(chosen);

//     for (var i = 0; i < tables.length; i++) {
//       if (chosen === tables[i]) {
//         return res.json(tables[i]);
//       }
//     }
//     return res.json(false);
//   }
//   return res.json(tables);
// });

// Create New tables - takes in JSON input
app.post("/api/new", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body-parser middleware
  var newtable = req.body;
  //newtable.routeName = newtable.name.replace(/\s+/g, "").toLowerCase();
  newtable.routeName = tables.length + waitlist.length;


  console.log(newtable);
  if (newtable.routeName < 6) {
    tables.push(newtable);
    check(true, newtable.name);

  }
  else {
    waitlist.push(newtable);
    check(false, newtable.name);
  }

  res.json(newtable);
});

// Starts the server to begin listening
// =============================================================
app.listen(port, function() {
  console.log("App listening on PORT " + port);
});