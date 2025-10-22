
// /api/events.js

export default function handler(req, res) {
  // Set headers for Server-Sent Events
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow any origin
  res.flushHeaders(); // Flush the headers to establish the connection

  // Send a "connected" event immediately
  res.write('event: connected\n');
  res.write('data: {"message": "Connection established"}\n\n');

  // Send a "ping" event every 10 seconds to keep the connection alive
  const intervalId = setInterval(() => {
    res.write('event: ping\n');
    res.write(`data: {"timestamp": ${Date.now()}}\n\n`);
  }, 10000);

  // Clean up when the client closes the connection
  req.on('close', () => {
    clearInterval(intervalId);
    res.end();
  });
}
