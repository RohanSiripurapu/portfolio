require('dotenv').config();
const mongoose = require('mongoose');
const Project = require('./models/Project');

const projects = [
  {
    title: 'OpusLink - Job Portal',
    description: 'Built a full-stack job portal connecting employers and job seekers, including job posting, application management, and REST APIs using Spring Boot and MySQL.',
    icon: 'fas fa-briefcase',
    techTags: ['Spring Boot', 'MySQL', 'JavaScript'],
    featured: true,
  },
  {
    title: 'Lost & Found Item Tracker',
    description: 'Developed a platform to report and track lost items across campuses. Implemented backend logic for efficient item matching and retrieval with a relational database schema.',
    icon: 'fas fa-search-location',
    techTags: ['Spring Boot', 'HTML/CSS', 'MySQL'],
    featured: true,
  },
  {
    title: 'TripNest - Travel Planner',
    description: 'Ongoing full-stack travel planning web app. Designing backend services and REST APIs for trip itineraries and booking workflows using OOP design principles.',
    icon: 'fas fa-plane',
    techTags: ['Spring Boot', 'MySQL', 'REST API'],
    featured: true,
  },
];

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
    await Project.deleteMany({});
    console.log('Cleared existing projects');
    const inserted = await Project.insertMany(projects);
    console.log(`Inserted ${inserted.length} projects`);
    await mongoose.connection.close();
    console.log('Done.');
    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
})();