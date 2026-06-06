require('dotenv').config();
const mongoose = require('mongoose');

const Artist = require('../models/Artist');
const Album = require('../models/Album');
const Song = require('../models/Song');
const User = require('../models/User');
const Playlist = require('../models/Playlist');

async function seed() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected!');

    await Artist.deleteMany({});
    await Album.deleteMany({});
    await Song.deleteMany({});
    await User.deleteMany({});
    await Playlist.deleteMany({});

    const artist = await Artist.create({
      name: 'Daft Punk',
      genre: 'Electronic',
      bio: 'French electronic music duo.'
    });

    const album = await Album.create({
      title: 'Discovery',
      releaseYear: 2001,
      artist: artist._id
    });

    const song = await Song.create({
      title: 'One More Time',
      duration: 320,
      album: album._id,
      artist: artist._id
    });

    const user = await User.create({
      username: 'music_fan_01',
      email: 'fan@example.com',
      password: 'hashed_password'
    });

    await Playlist.create({
      name: 'Gym Jams',
      user: user._id,
      songs: [song._id],
      description: 'High energy tracks'
    });

    console.log('✅ Seeding Complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding Failed:', error);
    process.exit(1);
  }
}

seed();
