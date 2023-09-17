const HTTP_RESPONSE = {
    OK: 200,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    INAVALID_DATA: 403,
    REQUIRED_DATA_MISSING: 300,
    BAD_REQUEST: 400,
    SOMETHING_WENT_WRONG: 500
}

const STATUS_MESSAGES = {
    SUCCESS: 'Success',
    FAILURE: 'Something went wrong'
}

const CONFIG = {
    emailPattern : "/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/"
}

module.exports = {
    HTTP_RESPONSE,
    STATUS_MESSAGES,
    CONFIG
}
    
        