import flights from "../flights.json";

export default function handler(req, res) {
  const query = (req.query.q || "").toLowerCase();

  if (!query) {
    return res.status(400).json({ error: "No airline provided" });
  }

  const matches = flights.filter(flight =>
    flight.airline.toLowerCase().includes(query)
  );

  if (matches.length === 0) {
    return res.json({
      airline: query,
      routes: []
    });
  }

  res.json({
    airline: matches[0].airline,
    routes: matches.map(flight => ({
      from: flight.from,
      to: flight.to,
      days: flight.days
    }))
  });
}
