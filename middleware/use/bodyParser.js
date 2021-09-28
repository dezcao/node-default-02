const bodyParser = require('body-parser');
// extended: true then using qs modle. qs module is querystring modle's extended version npm package.
// app.use(bodyParser.json({limit: "10mb"})); // for parsing application/json
// app.use(bodyParser.urlencoded({ extended: true, limit: "10mb"})); // for parsing application/x-www-form-urlencoded
module.exports = bodyParser.urlencoded({ extended: true, limit: "25mb" });
