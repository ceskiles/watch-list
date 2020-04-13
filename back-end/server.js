const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  displayName: String,
  watchList: [mongoose.Schema.Types.ObjectId],
  watchedList: [mongoose.Schema.Types.ObjectId],
});

const movieSchema = new mongoose.Schema({
  title: String,
  genre: String,
  company: String,
  director: String,
  producers: String,
  releaseDate: String,

  viewService: String,
  userId: mongoose.Schema.Types.ObjectId,
  userDisplayName: String,
});

// Create a models
const Movie = mongoose.model('Movie', movieSchema);
const User = mongoose.model('User', userSchema);

// connect to the database
mongoose.connect('mongodb://localhost:27017/the-list', {
  useNewUrlParser: true
});

// Create a new movie in The List
app.post('/api/movies', async (req, res) => {
  const movie = new Movie({
    title: req.body.title,
    genre: req.body.genre,
    company: req.body.company,
    director: req.body.director,
    producers: req.body.producers,
    releaseDate: req.body.releaseDate,
    viewService: req.body.viewService,
    userId: req.body.userId,
    userDisplayName: req.body.userDisplayName,
  });
  try {
    await movie.save();
    res.send(movie);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get a list of all moves in The List
app.get('/api/movies', async (req, res) => {
  try {
    let movies = await Movie.find();
    res.send(movies);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//Get a single movie from the list
app.get('/api/movie/:id', async (req, res) => {
  try {
    let movie = await Movie.findOne({
      _id: req.params.id
    });
    res.send(movie);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/movie/:id', async (req, res) => {
  try {
    await Movie.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Create a new user
app.post('/api/users', async (req, res) => {
  const user = new User({
    username: req.body.username,
    displayName: req.body.displayName,
    movieList: [],
  });
  try {
    await user.save();
    res.send(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//Get all users
app.get('/api/users', async (req, res) => {
  try {
    let users = await User.find();
    res.send(users);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//Get a user
app.get('/api/user/:id', async (req, res) => {
  try {
    let user = await User.findOne({
      _id: req.params.id
    });
    res.send(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//Delete a user
app.delete('/api/user/:id', async (req, res) => {
  try {
    await User.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//Update a user's watch list
app.put('/api/user/watch-list/:id', async (req, res) => {
  try {
    let user = await User.findOne({
      _id: req.params.id
    })
    if (user.watchList.includes(req.body._id)) {
      user.watchList.splice(user.watchList.indexOf(req.body._id),1);
    }
    else {
      user.watchList.push(req.body._id);
    }
    await user.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//Update a user's watched list
app.put('/api/user/watched-list/:id', async (req, res) => {
  try {
    let user = await User.findOne({
      _id: req.params.id
    });
    if (user.watchedList.includes(req.body._id)) {
      user.watchedList.splice(user.watchedList.indexOf(req.body._id),1);
    }
    else {
      user.watchedList.push(req.body._id);
    }
    await user.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(3001, () => console.log('Server listening on port 3001!'));
