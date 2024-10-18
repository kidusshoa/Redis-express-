import express from "express";

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());

app
  .listen(PORT, () => {
    console.log("listening on port ${PORT}");
  })
  .on("error", (error: any) => {
    throw new Error(error.message);
  });
