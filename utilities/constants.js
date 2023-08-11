// const successMsg = 'Success'
// const successCode = 200
// const failureMsg = 'Failed'
// const failureCode = 0

// module.exports = {
//     successCode,
//     successMsg,
//     failureCode,
//     failureMsg
// }



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
        FALIURE: 'SOMETHING WENT WRONG'
    }

    module.exports = {
        HTTP_RESPONSE,
        STATUS_MESSAGES
    }
    
        