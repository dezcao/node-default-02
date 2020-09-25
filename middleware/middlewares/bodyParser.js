const bodyParser = require('body-parser');
// extended: true면 qs 모듈을 사용하여 쿼리스트링을 해석한다. qs모듈은 내장 모듈이 아니라 npm패키지이며, querystring모듈의 기능을 조금 더 확장한 모듈이다.
// app.use(bodyParser.json({limit: "10mb"})); // for parsing application/json
// app.use(bodyParser.urlencoded({ extended: true, limit: "10mb"})); // for parsing application/x-www-form-urlencoded
module.exports = bodyParser.urlencoded({ extended: true, limit: "25mb" });
