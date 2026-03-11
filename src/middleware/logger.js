// US-007: Request logging middleware
function requestLogger(req, res, next) {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(
      JSON.stringify({
        method: req.method,
        url: req.originalUrl,
        status: res.statusCode,
        durationMs: duration,
        timestamp: new Date().toISOString(),
      })
    );
  });
  next();
}

module.exports = requestLogger;
