import { GeneralError } from './GeneralError';

export class BadRequestError extends GeneralError {
  constructor(message: string) {
    super(message, 400);
    this.name = 'BadRequestError';
  }
}
