import client from "../config/redis-client.js";
import User from "../models/User.js";
import { searchEntry } from "../utils/utils.js";

const repo = client.fetchRepository(User);
await repo.createIndex();

export const searchUser = async (query) => {
  return searchEntry(client, "User", query);
};

export const createUser = async (data) => {
  let entry = repo.createEntity(data);
  const id = await repo.save(entry);
  return id;
};
