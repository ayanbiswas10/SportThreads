const mongoose = require('mongoose');
const Item = require('./models/Item');

const products = [
  {
    name: 'FC Barcelona Home Jersey 2025/26',
    category: 'Football',
    team: 'Barcelona',
    description: 'Official FC Barcelona home jersey with latest design and technology',
    price: 89.99,
    stock: 50,
    imageUrl: '/images/fcb2526.webp',
  },
  {
    name: 'Real Madrid Away Jersey 2024/25',
    category: 'Football',
    team: 'Real Madrid',
    description: 'Real Madrid away jersey featuring the iconic white design',
    price: 94.99,
    stock: 45,
    imageUrl: '/images/rm_2024a.avif',
  },
  {
    name: 'Spain National Team Jersey 2025/26',
    category: 'Football',
    team: 'Spain',
    description: 'Official Spain national team jersey for international matches',
    price: 79.99,
    stock: 30,
    imageUrl: '/images/spain2526.jpeg',
  },
  {
    name: 'Arsenal Emirates Jersey 2025/26',
    category: 'Football',
    team: 'Arsenal',
    description: 'Arsenal home jersey with Emirates sponsorship',
    price: 84.99,
    stock: 35,
    imageUrl: '/images/ars2526.jpeg',
  },
  {
    name: 'India National Cricket Team Jersey',
    category: 'Cricket',
    team: 'India',
    description: 'Official India cricket team jersey for international matches',
    price: 79.99,
    stock: 40,
    imageUrl: '/images/indc.jpeg',
  },
  {
    name: 'Australia National Cricket Team Jersey',
    category: 'Cricket',
    team: 'Australia',
    description: 'Official Australia cricket team jersey for international matches',
    price: 74.99,
    stock: 38,
    imageUrl: '/images/ausc.jpeg',
  },
  {
    name: 'Los Angeles Lakers Jersey',
    category: 'NBA',
    team: 'Lakers',
    description: 'Official Los Angeles Lakers NBA jersey',
    price: 89.99,
    stock: 25,
    imageUrl: '/images/laknba.jpeg',
  },
  {
    name: 'Golden State Warriors Jersey',
    category: 'NBA',
    team: 'Warriors',
    description: 'Official Golden State Warriors NBA jersey',
    price: 84.99,
    stock: 30,
    imageUrl: '/images/gsnba.jpeg',
  },
  {
    name: 'Manchester United Home Jersey 2024/25',
    category: 'Football',
    team: 'Manchester United',
    description: 'Official Manchester United home jersey with latest design',
    price: 88.99,
    stock: 40,
    imageUrl: '/images/mutd2425.jpeg',
  },
  {
    name: 'Chelsea Away Jersey 2024/25',
    category: 'Football',
    team: 'Chelsea',
    description: 'Official Chelsea away jersey with iconic blue design',
    price: 85.99,
    stock: 38,
    imageUrl: '/images/clsa2425.jpeg',
  },
  {
    name: 'England National Cricket Team Jersey',
    category: 'Cricket',
    team: 'England',
    description: 'Official England cricket team jersey for international matches',
    price: 78.99,
    stock: 35,
    imageUrl: '/images/engc.jpeg',
  },
  {
    name: 'South Africa National Cricket Team Jersey',
    category: 'Cricket',
    team: 'South Africa',
    description: 'Official South Africa cricket team jersey for international matches',
    price: 76.99,
    stock: 33,
    imageUrl: '/images/sac.jpeg',
  },
  {
    name: 'Chicago Bulls Jersey',
    category: 'NBA',
    team: 'Bulls',
    description: 'Official Chicago Bulls NBA jersey',
    price: 87.99,
    stock: 28,
    imageUrl: '/images/cbnba.jpeg',
  },
  {
    name: 'Miami Heat Jersey',
    category: 'NBA',
    team: 'Heat',
    description: 'Official Miami Heat NBA jersey',
    price: 83.99,
    stock: 27,
    imageUrl: '/images/mhnba.jpeg',
  },
  {
    name: 'Liverpool Home Jersey 2024/25',
    category: 'Football',
    team: 'Liverpool',
    description: 'Official Liverpool home jersey with latest design',
    price: 90.99,
    stock: 42,
    imageUrl: '/images/liv2425.jpeg',
  },
  {
    name: 'New Zealand National Cricket Team Jersey',
    category: 'Cricket',
    team: 'New Zealand',
    description: 'Official New Zealand cricket team jersey for international matches',
    price: 75.99,
    stock: 30,
    imageUrl: '/images/nzc.jpeg',
  },
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/sportthreads');
    console.log('Connected to MongoDB');

    // Clear existing items
    await Item.deleteMany({});
    console.log('Cleared existing items');

    // Insert new items
    const insertedItems = await Item.insertMany(products);
    console.log(`Seeded ${insertedItems.length} items`);

    // Log the ObjectIds for reference
    insertedItems.forEach((item, index) => {
      console.log(`Item ${index + 1}: ${item.name} - ID: ${item._id}`);
    });

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
}

seedDatabase();
