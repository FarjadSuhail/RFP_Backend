class LoginRequest{
    constructor(username,password){
        this.username = username;
        this.password = password;
    }

    validate() {
        // Implement validation logic here
        if (!this.username || !this.password) {
            throw new Error('Missing required fields');
        }
    }
}

module.exports = {
    LoginRequest
}