
// Config | Configure Express app.
const express = require('express');
// Config | Configure MongoDB  
const mongoose = require('mongoose')
// Config | Configure Passport
const passport = require('passport');
// Config | Configure Session
const session = require('express-session');
// Config | Configure Routes
const authRoute = require('./routes/auth');
// Config | Configure Path
const path = require('path');
// Config | Configure Passport
require('./config/passportConfig');

const app = express();


// Database Connection
const mongoURI = 'mongodb://localhost:27017/';
mongoose.connect(mongoURI,{
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB connected');
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
})


// Middleware | Configure Express app.
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());



// Routes
const authRoutes = require('./routes/auth');
 
// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/', authRoutes);

// Error handling for non-existing routes
app.use((req, res, next) => {
  res.status(404).send('Sorry, can\'t find that!');
});


// Server
app.listen(3000, () => {
  console.log('Server started on port 3000');
})