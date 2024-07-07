// const mongoose = require("mongoose");
// mongoose.set("strictQuery", true);
// async function connectToMongoDB(url) {
//   return mongoose.connect(url);
// }

// module.exports = {
//   connectToMongoDB,
// };
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

async function connectToMongoDB(url) {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    if (error.name === "MongoServerError" && error.code === 8000) {
      console.error("Authentication failed. Please check your MongoDB Atlas username and password.");
    }
    // Don't exit the process here, let the main application handle it
    throw error;
  }
}

module.exports = {
  connectToMongoDB,
};