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

if (!uri) {
  console.error('Error: MONGODB_URI could not be found in .env.local');
  process.exit(1);
}

// Define Schema inline to insert
const WishSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true },
    name: { type: String, required: true },
    wish: { type: String, required: true },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    collection: 'wishes'
  }
);

const Wish = mongoose.models.Wish || mongoose.model('Wish', WishSchema);

console.log('Connecting and inserting a test wish to database...');
mongoose.connect(uri)
  .then(async () => {
    console.log('Connected. Inserting document...');
    const result = await Wish.create({
      slug: 'haris-icut',
      name: 'System Test',
      wish: 'Halo! Ini adalah pesan uji coba dari sistem untuk membuat database dan collection wishes.',
    });
    console.log('\x1b[32m%s\x1b[0m', '=== INSERT SUCCESSFUL ===');
    console.log('Inserted Document:', result);
    process.exit(0);
  })
  .catch((err) => {
    console.log('\x1b[31m%s\x1b[0m', '=== INSERT FAILED ===');
    console.error('Error details:', err.message);
    process.exit(1);
  });
