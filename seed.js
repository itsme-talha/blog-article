require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Post = require('./models/Post');

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected for Seeding...');

        // 1. Create or Find the Master Admin Account
        let adminUser = await User.findOne({ email: 'admin@muhmmadt.com' });
        
        if (!adminUser) {
            adminUser = new User({
                name: 'Muhammad Talha',
                email: 'admin@muhmmadt.com',
                password: 'password123', // Yeh database mein save hone se pehle hash ho jayega
                role: 'admin'
            });
            await adminUser.save();
            console.log('✅ Admin account created: admin@muhmmadt.com / Password: password123');
        } else {
            console.log('✅ Admin account already exists.');
        }

        // 2. Clear existing posts
        await Post.deleteMany();
        console.log('Existing posts cleared.');

        // 3. Premium Dummy Data with reliable Picsum HD images
        const dummyPosts = [
            {
                title: "The Future of AI in Modern UI Design",
                content: "<p>Artificial Intelligence is no longer just a buzzword; it's actively reshaping how we approach <b>User Interface</b> and <b>User Experience</b> design. By automating repetitive tasks, AI allows designers to focus on complex problem-solving and empathy-driven design.</p>",
                image: "https://picsum.photos/id/2/1000/600", 
                author: adminUser._id,
                tags: ["UI/UX Design", "Technology"]
            },
            {
                title: "Mastering Node.js and Express for Scalable Apps",
                content: "<p>Building high-ticket architectures requires a solid understanding of the backend ecosystem. <i>Node.js</i> paired with <i>Express</i> provides a lightweight yet incredibly powerful foundation for building RESTful APIs.</p>",
                image: "https://picsum.photos/id/119/1000/600", 
                author: adminUser._id,
                tags: ["Software Engineering", "Web Tech"]
            },
            {
                title: "Why Glassmorphism is the Trend of 2026",
                content: "<p>Glassmorphism has evolved from a Dribbble trend to a staple in modern web design. By using semi-transparent backgrounds with a subtle blur, designers can create a hierarchy that feels both premium and accessible.</p>",
                image: "https://picsum.photos/id/160/1000/600", 
                author: adminUser._id,
                tags: ["UI/UX Design", "Design"]
            },
            {
                title: "Building High-Ticket SaaS Architectures",
                content: "<p>When targeting enterprise clients, your software architecture must be flawless. From multi-tenant databases to zero-downtime deployments, enterprise clients demand the best.</p>",
                image: "https://picsum.photos/id/180/1000/600", 
                author: adminUser._id,
                tags: ["Software Engineering", "Business"]
            },
            {
                title: "The Ultimate Guide to Database Relations in MongoDB",
                content: "<p>NoSQL doesn't mean no relations. Using Mongoose's <code>.populate()</code> method allows developers to create complex relational queries while maintaining the flexibility of a document database.</p>",
                image: "https://picsum.photos/id/367/1000/600", 
                author: adminUser._id,
                tags: ["Database", "Backend"]
            }
        ];

        // Insert new posts
        await Post.insertMany(dummyPosts);
        console.log(`✅ Successfully seeded ${dummyPosts.length} premium posts!`);

        mongoose.connection.close();
        process.exit(0);

    } catch (error) {
        console.error('Seeding Error:', error);
        process.exit(1);
    }
};

seedDatabase();