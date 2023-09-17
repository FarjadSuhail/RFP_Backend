const bcrypt = require('bcrypt');
function hashPassword(password) {
    const saltRounds = 10;

    return new Promise((resolve,reject) => {
        bcrypt.hash(password, saltRounds, function(err, hashedPassword) {
            if (err) {
                reject(err);
            } else {
                resolve(hashedPassword);
                // You can store `hashedPassword` in your database as the user's password hash
            }
        });
    });    
}

// function decryptPassword(hashPassword) {
//     return new Promise((resolve,reject) => {
//         bcrypt.compare
//     });
// }

module.exports = {
    hashPassword
}