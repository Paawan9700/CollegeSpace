// using mongoose to connect to mongoDB
const mongoose = require('mongoose');


const mongoURI = "mongodb://127.0.0.1:27017/";

const connectToMongo = () => {
    mongoose.connect(mongoURI, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => console.log("Connected to MongoDB succesfully.."))
    .catch((err) => console.log(err));
}

module.exports = connectToMongo;