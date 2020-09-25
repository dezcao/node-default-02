const { logout } = require(`${process.env.ROOT}/businessLogicLayer/index.js`);

module.exports = () => {
    return {
        method: 'get',
        url: '/logout',
        func: logout
    };
};
