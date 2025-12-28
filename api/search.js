const flights = require("../flights.json");

module.exports = function handler(req, res) {
  try {
    // If frontend asks for all data
    if (req.query.all === "true") {
      res.status(200).json({ flights });
      return;
    }

    const question = (req.query.q || "").toLowerCase();

    const match = flights.find(f =>
      question.includes(f.airline.toLowerCase()) &&
      question.includes(f.from.toLowerCase()) &&
      question.includes(f.to.toLowerCase())
    );

    if (!match) {
      res.status(200).json({
        answer: "Sorry – I don’t have data for that route yet."
      });
      return;
    }

    res.status(200).json({
      answer: `${match.airline} flies from ${match.from} to ${match.to} on ${match.days.join(", ")}.`
    });

  } catch (error) {
    res.status(500).json({
      error: "Server error",
      details: error.message
    });
  }
};

