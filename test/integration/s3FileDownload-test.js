const chai = require("chai"); // 테스트 어설션 및 http 테스팅 제공
const http = require("chai-http"); // npm i chai-http 
const tools = require("../tools");
chai.use(http);

// 테스트할 내용
describe("s3FileDownload Test", () => {
	
	it("/s3FileDownload Test", function (done) {
		// MaYiLi-1596523978383.jpg
		chai
		.request(tools.server)
		.get("/s3FileDownload/MaYiLi-1596523978383.jpg")
		.end((err, res) => {
			console.log(res);
			chai.expect(res).to.have.status(200);
			return done();
		});
		
	});
	

});