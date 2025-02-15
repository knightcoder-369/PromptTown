const mongoose = require('mongoose');

const MONGODB_URL = process.env.MONGODB_URL;

// Initialize cache object
let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = {
        conn: null,
        promise: null
    };
}

const connect = async () => {
    if (cached.conn) return cached.conn;

    cached.promise = cached.promise || mongoose.connect(MONGODB_URL, {
        dbName: "clerkauthv5",
        bufferCommands: false,
        connectTimeoutMS: 30000
    });

    cached.conn = await cached.promise;
    return cached.conn;
};

module.exports = { connect };