const path = require('path');
let getQuery = require(path.join(process.env.ROOT, '/database/getQuery'));

// '문제점', 클라이언트의 의도대로 '동적인 리턴을 줄 수는 있지만',
// 모든 쿼리를 RDB에서 직접쿼리 하고있기 때문에 Graph DB와 같은 '응답 속도를 기대할 수는 없다'.
module.exports = {
	Query: {
		user: async (parent, args, context, info) => {
                  let id = args.id;
                  let user = JSON.parse(await context.redis.getAsync(id));
                  let type_id = user.user_id;
                  let query = await getQuery('img.xml', 'selectImgByTypeId', { type_id });
                  let img = (await context.dbPool.query(query, { type_id }))[0][0]; // type_id = user_id
                  console.log(img);
                  user.img = img;
                  return user;
            }
	},
	Mutation: {
		post: (parent, args, context, info) => {
                  // todo...
			const book = {
				title: args.title,
				author: args.author,
			}
			// books.push(book)
			return book
		}
	}
};
