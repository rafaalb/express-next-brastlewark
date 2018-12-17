const mongoose = require('mongoose');
require('dotenv').config();

const password = process.env.MONGO_KEY;
const mongoDB = `mongodb+srv://rafapro:${password}@cluster0-rcazy.mongodb.net/altran?retryWrites=true`;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;

module.exports = mongoose;
