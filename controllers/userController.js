const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const pool = require('../config/db'); // Import the database connection
const { json, response } = require('express');
const { LoginResponse } = require('../models/login/Response');
const { successCode, successMsg, failureCode, failureMsg } = require('../config/constants');

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '1d' })
}
//login user
const loginUser = async (req, res) => {
    const {username, password} = req.body;
    console.log("Request Log : "+username,password);
    try { 
        const query = 'SELECT * FROM public.users where username = $1 and password = $2';
        const values = [username,password]
        console.log("Query Log : "+query); // Log the query
        const result = await pool.query(query,values);
        console.log("Response Log : "+JSON.stringify(result.rows)); // Log the query result
        if (result.rowCount > 0) {
            // create a token
            const token = createToken(result.rows[0].id);
            const response = new LoginResponse(successCode,successMsg,token);
            res.status(200).json(response)
            
        } else {
            const response = new LoginResponse(failureCode,"Invalid username or password!",null);
            res.status(200).json(response)
        }
    }
    catch (error)
    {
        res.status(400).json({error: error.message})
    }
}

// //signup user
// const signupUser = async (req, res) => {
//     const {email, password} = req.body;
    
//     try {
//         const user = await User.signup(email, password)

//         // create a token
//         const token = createToken(user._id);
//         res.status(200).json({email, token})
//     }
//     catch (error)
//     {
//         res.status(400).json({error: error.message})
//     }
// }

// const user = async (req, res) => {
//     try {
//       const query = 'SELECT * FROM public.user';
//       console.log(query); // Log the query
//       const result = await pool.query(query);
//       console.log(result.rows); // Log the query result
//       res.json(result.rows);
//     } catch (error) {
//       console.error(error); // Log the error
//       res.status(500).json({ error: 'An error occurred while fetching data' });
//     }
// };
  

module.exports = {
    //signupUser,
    loginUser,
    // user
}