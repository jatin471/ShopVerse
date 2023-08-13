const { error } = require("console");
const mongoose = require("mongoose");

const connectToDatabase = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`Mongodb connected with server: ${data.connection.host}`);
    }).catch((error) => {
      console.error('Error connecting to MongoDB:', error);
    });
};

module.exports = connectToDatabase;

