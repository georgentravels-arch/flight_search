import flights from "../flights.json";

export default function handler(req, res) {
  const { q } = req.query;

  // 1️⃣ No query → return airline list
  if (!q) {
    const airlines = [...new Set(flights.map(f => f.airline))];
    res.status(200).json({ airlines });
    return;
  }

  // 2️⃣ Query present → return routes for airline
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
