import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export async function connectDB() {
  console.log("MONGO_URI:", process.env.MONGO_URI);
  const uri = process.env.MONGO_URI;

  if (!uri) {
    throw new Error("❌ No se encontró MONGO_URI en el archivo .env");
  }

  try {
    await mongoose.connect(uri);
    console.log("🔥 MongoDB Atlas conectado exitosamente");
  } catch (error) {
    console.error("❌ Error conectando a MongoDB Atlas:", error);
    process.exit(1);
  }
}
