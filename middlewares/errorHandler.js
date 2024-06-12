const constants = require("../errorCodes");
const errorHandler = async (err, req, res, next) => {
    const statusCode = res.statusCode ?? 500;
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({
                title: 'Validation Error',
                message: err.message
            });
            break;
        case constants.UNAUTHORIZED:
            res.json({
                title: "UnAuthorized user",
                message: err.message
            });
            break;
        case constants.FORBIDDEN:
            res.json({
                title: "Forbidden",
                message: err.message
            });
            break;
        case constants.NOT_FOUND:
            res.json({
                title: "Not Found",
                message: err.message
            });
            break;
        case constants.INTERNAL_SERVER_ERROR:
            res.json({
                title: "Internal Server Error",
                message: err.message
            });
            break;
        default:
            console.log("All fine no issues");
            break;
    }
};

module.exports = errorHandler;