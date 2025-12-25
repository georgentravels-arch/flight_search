import flights from "../flights.json";

export default function handler(req, res) {
  const query = (req.query.q || "").toLowerCase();

  if (!query) {
    return res.status(400).json({ error: "No search query provided" });
  }

  const matches = flights.filter(flight =>
    flight.airline.toLowerCase().includes(query)
  );

  if (matches.length === 0) {
    return res.json({ answer: "No routes found for that airline." });
  }

  let response = `Routes operated by ${matches[0].airline}:\n`;

  matches.forEach(flight => {
    response += `\n${flight.from} → ${flight.to}\nDays: ${flight.days.join(", ")}\n`;
  });

  res.json({ answer: response });
}
