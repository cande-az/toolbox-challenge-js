const express = require("express");
const router = express.Router();
const filesRouter = require("./files");

// Routes
router.get("/", (req, res) => {
  res.json({ message: "Files API is running" });
});
router.use("/files", filesRouter);

module.exports = router;