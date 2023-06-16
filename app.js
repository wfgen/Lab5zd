const http = require('http');
const os = require('os');

const hostname = os.hostname();
const port = process.env.PORT || 3000;
const version = process.env.VERSION || '1.0.0';

const getServerIP = () => {
  const interfaces = os.networkInterfaces();
  for (const key in interfaces) {
    for (const iface of interfaces[key]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'Unknown';
};

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end(`Server IP: ${getServerIP()}\nHostname: ${hostname}\nApplication Version: ${version}`);
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
