# Redis DB

### 우분투에 redis db 설치하기
```
sudo apt-get install redis-server
redis-server
```
기본설정은 localhost로만 접속이 가능하며 포트는 6379이다.  
외부 서버에서 redis에 접속하려면 redis.conf를 변경해야 합니다. //https://dejavuqa.tistory.com/154
```
sudo vi /etc/redis/redis.conf 
sudo systemctl restart redis-server.service // 재시작
netstat -nlpt | grep 6379   // 확인 0.0.0.0.0:6379로 Listen 중인지 확인
```
`requirepass`를 찾아 foobared라고 되어 있는부분을 지우고 설정하려는 암호를 넣습니다.  vi에서 찾기 명령 /foobared --> mypassword
`bind`를 찾아 127.0.0.1로 되어있는 부분을 0.0.0.0으로 수정합니다.  
환경바꾸면 재시작 해줘야 합니다.   sudo systemctl restart redis-server.service
잘 되었는지 확인한다. netstat -nlpt | grep 6379   
`AWS`에서는 레디스 포트에 대한 `인바운드` 여는것도 잊지마세요.

### 기본 백엔드 코드 리뷰
라이브러리 설치
```
npm i redis
```
초기 설정,  
비동기적인 사용을 위해 프로미스하게 감싼 get 요청에 대해서만 getAsync라고 명명지어 세팅해 두었다.
get, redis.js 설정에서 미리 프로미스하게 해둔 함수를 호출하면, 기다릴 수 있다.
let user = await redis.getAsync(accesstoken);
(npm redis 라이브러리 설명을 참조.)
.env 설정 파일을 참조하는데, 이 환경파일 설정을 돕는 dotenv라이브러리를 사용했다.

redis.js
```
const fromRedis = require('redis');
const { promisify } = require("util");
const redis = fromRedis.createClient({
			host: process.env.REDIS_HOST,
			port: 6379,
			password: process.env.REDIS_PASS
        });
redis.getAsync = promisify(redis.get).bind(redis);
module.exports = redis;
```

// set, 만료시간을 설정함.
redis.setex(accessToken, 60 * 60 * 24, JSON.stringify({msg: "hellow"}), function(err, result) {
    console.log(result);
});    

// del
redis.del(accessToken);
```