class SignUp{
    constructor(username,password,email,phoneNumber){
        this.username = username;
        this.password = password;
        this.email = email;
        this.phoneNumber = phoneNumber;
    }

    validate() {
        // Implement validation logic here
        if (!this.username || !this.password || !this.email || !this.phoneNumber) {
            throw new Error('Missing required fields');
        }
    }
}

module.exports = {
    SignUp
}