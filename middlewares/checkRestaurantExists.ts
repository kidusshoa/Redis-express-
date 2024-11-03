import type { Request, Response, NextFunction } from "express";
import { initializedRedisClient } from "../utils/client.js";
import { restaurantKeyById } from "../utils/keys.js";
import { errorResponse } from "../utils/responses.js";

export const checkRestaurantExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { restaurantId } = req.params;
  if (!restaurantId) {
    errorResponse(res, 400, "Restaurant ID not found");
    return;
  }
  const client = await initializedRedisClient();
  const restaurantKey = restaurantKeyById(restaurantId);
  const exists = await client.exists(restaurantKey);
  if (!exists) {
    errorResponse(res, 404, "Restaurant Not Found");
    return;
  }
  next();
};
