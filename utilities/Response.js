class LoginResponse{
    constructor(data, code, message) {
        this.data = data;
        this.statusCode = code;
        this.message = message;
    }
}

module.exports = {
    LoginResponse
}