// config/connection.ts
import mongoose from 'mongoose';
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialNetworkDB';
// No longer passing { useNewUrlParser, useUnifiedTopology }
mongoose.connect(MONGODB_URI);
mongoose.connection.on('connected', () => console.log('Mongoose connected to MongoDB'));
mongoose.connection.on('error', (err) => console.error(err));
export default mongoose;
