import express from "express";
import { createUser } from "../repository/UserRepository.js";

const api = express.Router();

api.post("/", async (req, res) => {
  try {
    const user = req.body;
    const data = await createUser(user);
    res.send(data);
  } catch (error) {
    logger.error(error.message);
    res.status(503).send(error.message);
  }
});

export default api;
