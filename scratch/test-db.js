const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Parse .env.local manually
const envPath = path.resolve(__dirname, '../.env.local');
let uri = '';
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const match = envContent.match(/^MONGODB_URI=(.+)$/m);
  if (match) {
    uri = match[1].trim();
  }
}

if (!uri) {
  uri = process.env.MONGODB_URI;
}

console.log('Attempting connection to MongoDB...');
if (!uri) {
  console.error('Error: MONGODB_URI could not be found in .env.local');
  process.exit(1);
}

// Obfuscate credentials for printing
const printUri = uri.replace(/\/\/[^:]+:[^@]+@/, '//***:***@');
console.log('URI:', printUri);

mongoose.connect(uri)
  .then(() => {
    console.log('\x1b[32m%s\x1b[0m', '=== CONNECTION SUCCESSFUL ===');
    console.log('Connected to Database:', mongoose.connection.name);
    console.log('Host:', mongoose.connection.host);
    process.exit(0);
  })
  .catch((err) => {
    console.log('\x1b[31m%s\x1b[0m', '=== CONNECTION FAILED ===');
    console.error('Error details:', err.message);
    process.exit(1);
  });
