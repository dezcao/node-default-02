const cors = require('cors');
// 자세한 옵션을 넣을 수도 있습니다.
// cors({
// 	"origin": "*",
// 	"methods": "GET,HEAD,PUT,PATCH,POST,DELETE,OPTION",
// 	"preflightContinue": false,
// 	"optionsSuccessStatus": 204
// })
module.exports = cors();