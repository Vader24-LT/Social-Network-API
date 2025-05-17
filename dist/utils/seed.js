// utils/seed.ts
import { User, Thought } from '../models/index.js'; // Adjust the import path as necessary
const seedData = async () => {
    try {
        // Delete existing data
        await User.deleteMany({});
        await Thought.deleteMany({});
        // Create some users
        const alice = await User.create({ username: 'alice', email: 'alice@example.com' });
        const bob = await User.create({ username: 'bob', email: 'bob@example.com' });
        // Create a thought from Alice
        const thought = await Thought.create({
            thoughtText: "Hello from Alice!",
            username: "alice"
        });
        // Add the thought to Alice's thoughts array
        await User.findOneAndUpdate({ _id: alice._id }, { $push: { thoughts: thought._id } }, { new: true });
        console.log('Seed data created!');
        process.exit(0);
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
};
seedData();
