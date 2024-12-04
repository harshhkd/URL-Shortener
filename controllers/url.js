const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenrateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required" });

  const shortID = shortid();
  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
  });
  0.0;
  return res.render("home", {
    id: shortID,
    path: "/url",
  });
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;

  const result = await URL.findOne({ shortId });

  return res.json({
    totalClicks: result.vistHistory.length,
    analytics: result.vistHistory,
  });
}

async function handleUpdateId(req, res) {
  const shortId = req.params.shortId;

  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        vistHistory: { timestamp: Date.now() },
      },
    }
  );
  res.redirect(entry.redirectURL);
}

module.exports = {
  handleGenrateNewShortURL,
  handleGetAnalytics,
  handleUpdateId,
};
