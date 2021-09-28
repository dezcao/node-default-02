const { hello } = require(`../../service/index.js`);

module.exports = () => {
    return {
        method: 'get',
        url: '/auth',
        logic: hello,
        auth: true
    };
};
