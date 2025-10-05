const mongoose = require('mongoose');

const uri = "mongodb+srv://aniketteltu_db_user:gT4Opb5Iy0QUPvzO@cluster0.e869fat.mongodb.net/movie-app";

console.log('Testing connection...');

mongoose.connect(uri, {
    serverSelectionTimeoutMS: 30000,
})
    .then(() => {
        console.log('✅ SUCCESS! Connection works!');
        process.exit(0);
    })
    .catch(err => {
        console.error('❌ FAILED! Error:', err.message);
        process.exit(1);
    });