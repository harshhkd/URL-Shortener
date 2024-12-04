const express = require("express");

const {
  handleGenrateNewShortURL,
  handleGetAnalytics,
  handleUpdateId,
} = require("../controllers/url");
const router = express.Router();

router.post("/", handleGenrateNewShortURL);
router.get("/:shortId", handleUpdateId);
router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router;
