import { PrismaClient } from "../generated/prisma/index.js"
import bcrypt from "bcrypt";
import generateToken from "../utils/jwt.js";

const prisma = new PrismaClient();

export const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashedPassword },
    });

    const token = generateToken(user.id);
    res.status(201).json({ user: { id: user.id, email: user.email }, token });
  } catch (error) {
    res.status(500).json({ message: "Registration failed" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: "Invalid credentials" });

    const token = generateToken(user.id);
    res.json({ user: { id: user.id, email: user.email }, token });
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
};
