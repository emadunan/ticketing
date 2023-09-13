export abstract class CustomError extends Error {
  abstract statusCode: number;
  
  constructor(message: string) {
    super(message);

    // When extending a builtin class
    Object.setPrototypeOf(this, CustomError.prototype)
  }

  abstract serializeErrors() : {message: string; field?: string}[];
}