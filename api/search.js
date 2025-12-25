import flights from '../flights.json' assert { type: 'json' };

export default function handler(req, res) {
  const question = (req.query.q || '').toLowerCase();

  const match = flights.find(f =>
    question.includes(f.airline.toLowerCase()) &&
    question.includes(f.from.toLowerCase()) &&
    question.includes(f.to.toLowerCase())
  );

  if (!match) {
    res.status(200).json({
      answer: "Sorry — I don’t have data for that route yet."
    });
    return;
  }

  const days = match.days.join(', ');
  res.status(200).json({
    answer: `${match.airline} flies from ${match.from} to ${match.to} on ${days}.`
  });
}
