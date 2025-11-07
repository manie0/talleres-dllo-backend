import express from "express";
import cors from "cors";

import taller1Routes from "./routes/taller1.routes";
import taller2Routes from "./routes/taller2.routes";
import taller3Routes from "./routes/taller3.routes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Montar rutas
app.use("/api/taller1", taller1Routes);
app.use("/api/taller2", taller2Routes);
app.use("/api/taller3", taller3Routes);

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
