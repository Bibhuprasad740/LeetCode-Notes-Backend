const jwt = require('jsonwebtoken');

const checkAuthentication = (req, res, next) => {
    // check for authorization token in header
    if (!req.headers.authorization) {
        return res.status(401).json({ message: 'Authorization token is required' });
    }
    
    // extract token from header
    const token = req.headers.authorization.split(' ')[1];
    if(token == null) {
        return res.status(401).json({ message: 'Invalid authorization token' });
    }
    
    const user = jwt.verify(token, process.env.JWT_SECRET);
    // validate token
    if (!user) {
        return res.status(403).json({ message: 'Invalid authorization token' });
    }
    
    // if valid, continue to the next middleware
    // console.log(user);
    req.user = user;
    next();
}

module.exports = checkAuthentication;