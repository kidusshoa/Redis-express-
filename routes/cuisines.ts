import express from "express";
import { initializedRedisClient } from "../utils/client.js";
import { cuisineKey, cuisinesKey } from "../utils/keys.js";
import { successResponse } from "../utils/responses.js";
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const client = await initializedRedisClient();
    const cuisines = await client.sMembers(cuisinesKey);
    successResponse(res, cuisines);
  } catch (error) {}
});

export default router;
