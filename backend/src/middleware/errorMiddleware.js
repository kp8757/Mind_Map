export function notFoundHandler(_req, res) {
  return res.status(404).json({ message: 'Route not found' });
}

export function errorHandler(err, _req, res, _next) {
  console.error(err);
  return res.status(err.status || 500).json({
    message: err.message || 'Internal server error'
  });
}
