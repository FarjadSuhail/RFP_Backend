require('dotenv').config()
const express = require('express');
const pool = require('./config/db'); // Import the database connection

// const express = require('express')
// const mongoose = require('mongoose')
// const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')

// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
  // console.log(req.path, req.method)
  next()
})

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
// // routes
// // app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)

// // connect to mongoDB
// // mongoose.connect(process.env.MONGO_URI)
// //   .then(() => {
// //     // console.log('connected to database')
// //     // listen to port
// //     app.listen(process.env.PORT, () => {
// //       // console.log('listening for requests on port', process.env.PORT)
// //     })
// //   })
// //   .catch((err) => {
// //     // console.log(err)
// //   }) 

// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'WP_RFP',
//   password: 'passw0rd',
//   port: 5432, // Default PostgreSQL port
// });



//const app = express();
const PORT = process.env.PORT || 3000;

// Your routes and middleware will go here

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});