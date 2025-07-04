// MongoDB initialization script
db = db.getSiblingDB('sabaarchitect');

// Create collections
db.createCollection('contacts');
db.createCollection('projects');
db.createCollection('users');

// Create indexes for better performance
db.contacts.createIndex({ "email": 1 });
db.contacts.createIndex({ "createdAt": -1 });
db.contacts.createIndex({ "status": 1 });

db.projects.createIndex({ "title": "text", "description": "text" });
db.projects.createIndex({ "category": 1 });
db.projects.createIndex({ "createdAt": -1 });

db.users.createIndex({ "email": 1 }, { unique: true });

// Insert sample data (optional)
db.projects.insertMany([
  {
    title: "Modern Villa Design",
    description: "A stunning contemporary villa with minimalist design principles",
    category: "Residential",
    images: [],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Corporate Office Complex",
    description: "Modern office building with sustainable design features",
    category: "Commercial",
    images: [],
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

print('Database initialized successfully!');
