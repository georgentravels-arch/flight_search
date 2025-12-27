import flights from "../flights.json";

export default function handler(req, res) {
  const { q, all } = req.query;

  // Return all flights for filtering
  if (all === "true") {
    res.status(200).json({ flights });
    return;
  }

  // Airline list
  if (!q) {
    const airlines = [...new Set(flights.map(f => f.airline))];
    res.status(200).json({ airlines });
    return;
  }

  // Airline routes
  const airline = q.toLowerCase();
  const routes = flights.filter(
    f => f.airline.toLowerCase() === airline
  );

  if (routes.length === 0) {
    res.status(404).json({ message: "No routes found" });
    return;
  }

  res.status(200).json({
    airline: routes[0].airline,
    routes
  });
}
