const { hello } = require(`${process.env.ROOT}/businessLogicLayer/index.js`);

module.exports = () => {
    return {
        method: 'get',
        url: '/hello',
        func: hello,
        auth: true
    };
};
