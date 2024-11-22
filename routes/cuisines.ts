import express from "express";
import { initializedRedisClient } from "../utils/client.js";
import { cuisineKey, cuisinesKey, restaurantKeyById } from "../utils/keys.js";
import { successResponse } from "../utils/responses.js";
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const client = await initializedRedisClient();
    const cuisines = await client.sMembers(cuisinesKey);
    successResponse(res, cuisines);
  } catch (error) {
    next(error);
  }
});

router.get("/:cuisine", async (req, resolve, next) => {
  const { cuisine } = req.params;
  try {
    const client = await initializedRedisClient();
    const restaurantIds = await client.sMembers(cuisineKey(cuisine));
    const restaurants = await Promise.all(
      restaurantIds.map((id) => client.hGet(restaurantKeyById(id), "name"))
    );
    successResponse(resolve, restaurants);
  } catch (error) {
    next(error);
  }
});

export default router;
