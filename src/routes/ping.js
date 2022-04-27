import express from "express";
import { createUser } from "../repository/UserRepository.js";

const api = express.Router();

api.get("/", async (req, res) => {
  res.send("PONG");
});

export default api;
