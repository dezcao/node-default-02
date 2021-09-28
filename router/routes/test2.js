const { test2 } = require(`../../service/index.js`);

module.exports = () => {
    return {
        method: 'get',
        url: '/test2',
        logic: test2
    };
};
