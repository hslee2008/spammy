const natural = require("natural");

const normal = require("./data/normal.json");
const spam = require("./data/spam.json");

function classify(text) {
  const classifier = new natural.BayesClassifier();

  normal.normal.forEach((sentence) => {
    classifier.addDocument(sentence, "normal");
  });

  Object.keys(spam).forEach((key) => {
    spam[key].forEach((sentence) => {
      classifier.addDocument(sentence, `spam (${key})`);
    });
  });

  classifier.train();

  const result = classifier.classify(text);
  return result;
}

module.exports = { classify };
