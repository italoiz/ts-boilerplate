export class GeneralError extends Error {
  statusCode?: number;

  constructor(message: string, statusCode?: number) {
    super(message);
    this.name = 'BadRequestError';
    this.statusCode = statusCode;
  }
}
