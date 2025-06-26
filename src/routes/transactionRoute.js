import express from "express";
import {
  addTransaction,
  getTransactions,
} from "../controller/transactionController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", addTransaction);
router.get("/", getTransactions);

export default router;
