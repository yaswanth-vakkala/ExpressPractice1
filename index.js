const express = require("express");
require("dotenv").config();
const path = require("path");
const logger = require("./middleware/logger");
const exphbs = require("express-handlebars");
const members = require("./Members");

const app = express();

//init middleware
// app.use(logger);

//usually if we have react or vue or other frontend we build api that serves json or a server that just serves template files not both
//handlebars middleware
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Homepage route
app.get("/", (req, res) => {
  res.render("index", {
    title: "Member App",
    members,
  }); //showing coz first in file while static file is defined at last
});

//everytime we make a request middleware runs so we can define a functionality inside it that can be useful

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

//set static folder - useful when our website has static html css js content
//automatically routes are created for html files in static folder , css is also supported
app.use(express.static(path.join(__dirname, "public")));

//members api routes
app.use("/api/members", require("./routes/api/members"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server running at port ${PORT}`);
});
