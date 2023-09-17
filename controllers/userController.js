// const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const pool = require('../utilities/db'); // Import the database connection
const { json, response } = require('express');
const { Response } = require('../utilities/response');
const constants = require('../utilities/constants');
const { hashPassword } = require('../utilities/common');
const { SignUp } = require('../models/signup/SignUp');

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
            let data = {
                username,
                token
            }
            const response = new Response(data,constants.HTTP_RESPONSE.OK,constants.STATUS_MESSAGES.SUCCESS);
            res.status(200).json(response)
            
        } else {
            const response = new Response(data,constants.HTTP_RESPONSE.INAVALID_DATA,constants.STATUS_MESSAGES.FAILURE);
            res.status(200).json(response)
        }
    }
    catch (error)
    {
        res.status(400).json({error: error.message})
    }
}

// //signup user
const signupUser = async (req, res) => {
    
    var {username, password, email, phoneNumber} = req.body;
    try {
        if (!constants.CONFIG.emailPattern.match(email)) {
            res.status(constants.HTTP_RESPONSE.BAD_REQUEST).json(new Response({error:"Email is not correct."},constants.HTTP_RESPONSE.BAD_REQUEST,constants.STATUS_MESSAGES.FAILURE));
            return;
        }
        var hashedPassword = await hashPassword(password);
        
        const query = "insert into users(username,password,email,phone_number) values($1,$2,$3,$4)";
        const values = [username,hashedPassword,email,phoneNumber];
        const insertUserResult = await pool.query(query,values);
        
        console.log("Insert User Log : ",insertUserResult)
        
        if (insertUserResult.rowCount > 0) {

            const getUser = "SELECT * FROM users WHERE username = $1 AND password = $2";
            const getUserValues = [username,hashedPassword];
            const getUserResult = await pool.query(getUser,getUserValues);
            
            console.log("Get User Log : ",getUserResult);
            
            if (getUserResult.rowCount > 0) {
                const userResponse = new Response(new SignUp(username,"",email,phoneNumber),constants.HTTP_RESPONSE.OK,constants.STATUS_MESSAGES.SUCCESS);
                res.status(constants.HTTP_RESPONSE.OK).json(userResponse);
            } else {
                res.status(constants.HTTP_RESPONSE.OK).json(new Response(null,constants.HTTP_RESPONSE.NOT_FOUND,constants.STATUS_MESSAGES.FAILURE));
            }
            // res.status(constants.HTTP_RESPONSE.OK).json()
        } else {
            res.status(constants.HTTP_RESPONSE.OK).json(new Response(null,constants.HTTP_RESPONSE.SOMETHING_WENT_WRONG,constants.STATUS_MESSAGES.FAILURE));
        }

        // create a token
        // const token = createToken(user._id);
        // res.status(200).json({email, token})
    }
    catch (error)
    {
        console.log("Server error : ",error);
        res.status(constants.HTTP_RESPONSE.SOMETHING_WENT_WRONG).json(new Response({error: error.message},constants.HTTP_RESPONSE.SOMETHING_WENT_WRONG,constants.STATUS_MESSAGES.FAILURE));
    }
}

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
    signupUser,
    loginUser,
    // user
}