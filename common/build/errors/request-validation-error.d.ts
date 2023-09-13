import { CustomError } from "./custom-error";
import type { ValidationError } from "express-validator";
export declare class RequestValidationError extends CustomError {
    errors: ValidationError[];
    constructor(errors: ValidationError[]);
    statusCode: number;
    serializeErrors(): ({
        message: any;
        field: string;
    } | {
        message: any;
        field?: undefined;
    })[];
}
