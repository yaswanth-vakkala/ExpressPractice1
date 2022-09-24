const express = require("express");
require("dotenv").config();
const path = require("path");
const logger = require("./middleware/logger");

const app = express();

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//init middleware
// app.use(logger);
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
