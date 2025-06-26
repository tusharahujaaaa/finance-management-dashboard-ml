import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import transaction from "./routes/transactionRoute.js"

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Finance API running"));
app.use("/api/auth", authRoutes);
app.use("/api/transaction", transaction);


const PORT = process.env.PORT || 3232;
app.listen(PORT, () =>
  console.log(`Server started on port ${PORT}`,)
);

