
// /api/log-error.js

export default function handler(req, res) {
  // Allow requests from any origin
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    try {
      const { error, errorInfo } = req.body;
      
      // Log the error on the server side (Vercel logs)
      console.error('Client-side Error:', {
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo ? errorInfo.componentStack : 'N/A',
        timestamp: new Date().toISOString(),
      });

      res.status(200).json({ message: 'Error logged successfully' });
    } catch (e) {
      console.error('Error logging failed:', e);
      res.status(500).json({ message: 'Failed to log error' });
    }
  } else {
    res.setHeader('Allow', ['POST', 'OPTIONS']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
