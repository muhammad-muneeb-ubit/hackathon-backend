import mongoose from "mongoose";

// Cache connection across hot reloads/serverless invocations
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export const connectDB = async () => {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    const uri = process.env.MONGODB_URL;
    if (!uri) throw new Error("MONGODB_URL is not set in environment");
    cached.promise = mongoose
      .connect(uri, {
        // Add recommended options if needed
        // serverSelectionTimeoutMS: 5000,
      })
      .then((mongooseInstance) => {
        console.log("MongoDB connected");
        return mongooseInstance;
      })
      .catch((err) => {
        console.error("MongoDB connection error:", err);
        throw err;
      });
  }
  cached.conn = await cached.promise;
  return cached.conn;
};
