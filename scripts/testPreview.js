const { exec } = require('child_process');
const http = require('http');

const server = exec('npm run preview -- --port 4173');

setTimeout(() => {
  http.get('http://localhost:4173/product/61b576d4-15e1-4a0a-8971-e3c88f323377?type=wholesale', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      console.log('Status:', res.statusCode);
      if (data.includes('Something went wrong')) {
        console.log('Crash detected in HTML!');
      } else {
        console.log('No crash detected in HTML.');
      }
      server.kill();
      process.exit(0);
    });
  }).on('error', (err) => {
    console.error('Request error:', err.message);
    server.kill();
    process.exit(1);
  });
}, 5000);
