import { jwtDecode } from "jwt-decode";
import { PrismaClient } from "../generated/prisma/index.js";
import dotenv from "dotenv";
import { DatabaseError } from "pg";

dotenv.config();

const prisma = new PrismaClient();

export const addTransaction = async (req, res) => {
  try {
    // console.log(req.body);

    const { type, category, amount, note } = req.body;
    const transaction = await prisma.Transaction.create({
      data: {
        type,
        category,
        amount: parseFloat(amount),
        note,
        userId: req.userId,
        date: new Date(), // Or use new Date("2025-06-26T11:25:43.589Z") if specific date is needed
      },
    });

    console.log(transaction);

    res
      .status(200)
      .json({ message: "transaction created ", transaction: transaction });
  } catch (err) {
    console.log("error: ", err);
    res.status(500).json({ message: "Internal Server Error!", error: err });
  }
};

export const getTransactions = async (req, res) => {
  try {
    // const txn = await prisma.Transaction.findMany({
    //   where: { userId: req, userID },
    //   order: { date: decs },
    // });
    const txs = await prisma.transaction.findMany({
      where: { userId: req.userId },
      orderBy: { date: "desc" },
    });
    res.status(200).json({ message: "Fetched Successfully", data: txs });
  } catch (err) {
    console.log(DatabaseError);
    res.status(500).json({ message: "Internal Server Error!", error: err });
  }
};


// export const getTransactions = async (req, res) => {
//   try {
//     const txs = await prisma.transaction.findMany({
//       where: { userId: req.userId },
//       orderBy: { date: "desc" },
//     });
//     res.json(txs);
//   } catch (err) {
//     res.status(500).json({ message: "Error fetching transactions" });
//   }
// };