const express = require("express");
const { classify } = require("./natural");
const fs = require("fs");
const router = express.Router();

router.get("/detect/:spam", (req, res) => {
  const result = classify(decodeURI(req.params.spam));
  res.send(result);
});

router.post("/new/normal/:text", (req, res) => {
  const text = decodeURI(req.params.text);

  const data = require(`./data/normal.json`);

  data.push(text);

  try {
    fs.writeFileSync("./data/normal.json", JSON.stringify(data));
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/new/spam/:text", (req, res) => {
  const [category, spam] = req.params.text.split(",");

  const data = require(`./data/spam.json`);

  if (data[category]) {
    data[category].push(spam);
  } else {
    data[category] = [spam];
  }

  try {
    fs.writeFileSync("./data/spam.json", JSON.stringify(data));

    res.send("ok");
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
