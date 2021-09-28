module.exports = async (req, res, next) => {
    console.log('Cookies: ', req.cookies);
    var visitors = req.cookies.visitors || 0;
        visitors++;
    res.cookie('visitors', visitors, { maxAge: 10000 });
    res.json({msg: 'hello test222' });
};
