import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";

// Importa tu router
import userRouter from "./user/user.routes";
import bookRouter from "./book/book.routes";
import ReservationRouter from "./reservations/reservation.routes";
dotenv.config();

const app = express();
app.use(express.json());

// Ruta de prueba
app.get("/", (req, res) => res.send("API OK"));

// Monta el router de usuarios en /users
app.use("/users", userRouter);
app.use("/books", bookRouter);
app.use("/reservations", ReservationRouter); // Asegúrate de importar el router correcto para reservations

async function start() {
  await connectDB(); // conecta a Atlas
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`✔ Servidor corriendo en puerto ${port}`));
}

start();
