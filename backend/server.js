const express = require("express");
require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");

const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/goals", require("./routes/goalRoutes"));
app.use(errorHandler);

app.listen(port, () => {
  console.log(`backend running on port ${port}`);
});

app.get("/api", (req, res) => {
  res.status(200).json({ msg: "Besm Allah" });
});
