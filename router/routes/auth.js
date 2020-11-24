const { hello } = require(`${process.env.ROOT}/service/index.js`);

module.exports = () => {
    return {
        method: 'get',
        url: '/auth',
        logic: hello,
        auth: true
    };
};
