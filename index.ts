import express from "express";
import restaurantRouter from "./routes/restaurants.js";
import cuisinesRouter from "./routes/cuisines.js";
import { errorHandler } from "./middlewares/errorHandlers..js";

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use("/restaurants", restaurantRouter);
app.use("/cuisines", cuisinesRouter);

app.use(errorHandler);

app
  .listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
  })
  .on("error", (error: any) => {
    throw new Error(error.message);
  });
