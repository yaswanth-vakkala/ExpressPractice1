const express = require("express");
require("dotenv").config();
const path = require("path");
const members = require("./Members");
const logger = require("./middleware/logger");

const app = express();

//init middleware
// app.use(logger);
//everytime we make a request middleware runs so we can define a functionality inside it that can be useful

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

//set static folder - useful when our website has static html css js content
//automatically routes are created for html files in static folder , css is also supported
app.use(express.static(path.join(__dirname, "public")));

//get all members
app.get("/api/members", (req, res) => {
  res.json(members); //no need to even strigify
});

//get single member
app.get("/api/members/:id", (req, res) => {
  //:id is url parameter
  const found = members.some((member) => member.id === parseInt(req.params.id)); //normal js method
  if (found) {
    res.json(members.filter((member) => member.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: `Member ${req.params.id} not found` });
  }
});

//
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server running at port ${PORT}`);
});
