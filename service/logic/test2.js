let moment = require('moment');
module.exports = async (req, res, next) => {
    let data = 'check please, database connection infomation. ebe57845';
    console.log('Cookies: ', req.cookies);
    var visitors = req.cookies.visitors || 0;
        visitors++;
    res.cookie('visitors', visitors, { maxAge: 10000 });
    res.json({msg: 'hello test222' });
};
