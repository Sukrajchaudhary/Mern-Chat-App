const mongoose = require("mongoose");

exports.connectToDb = async () => {
  try {
   console.log(process.env.MongooseURI)
    await mongoose.connect(process.env.MongooseURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database Connected Successfully");
  } catch (error) {
    console.error("Database connection error:", error.message);
  }
};
