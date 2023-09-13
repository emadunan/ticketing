"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestValidationError = void 0;
const custom_error_1 = require("./custom-error");
class RequestValidationError extends custom_error_1.CustomError {
    constructor(errors) {
        super("Invalid request parameters");
        this.errors = errors;
        this.statusCode = 400;
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }
    serializeErrors() {
        const formattedErrors = this.errors.map((error) => {
            if (error.type === 'field') {
                return { message: error.msg, field: error.path };
            }
            return { message: error.msg };
        });
        return formattedErrors;
    }
}
exports.RequestValidationError = RequestValidationError;
