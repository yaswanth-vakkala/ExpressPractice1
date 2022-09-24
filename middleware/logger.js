const moment = require("moment"); //to deal with date formatting

//middleware function - a func that has access to req,res objs and we have a stack of m funcs
const logger = (req, res, next) => {
  console.log(
    `${req.protocol}://${req.get("host")}${
      req.originalUrl
    }: ${moment().format()}`
  );
  next();
};

module.exports = logger;

//define middleware at start of main js file if used coz all paths should know about this func
