const mongoose = require('mongoose');

const mongoConnect = () => {
    return mongoose.connect(process.env.MONGODB_URL);
}

module.exports = mongoConnect;