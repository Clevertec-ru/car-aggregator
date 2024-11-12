import { HttpStatus } from 'src/constants/http-status';

export class ApiError extends Error {
  data: { message: string } & Record<string, string>;

  status: number;

  constructor(
    data: any,
    status = HttpStatus.InternalServerError,
    statusText = 'Internal Server Error'
  ) {
    super(`${status} ${statusText}`);

    this.constructor = ApiError;

    this.name = this.constructor.name;
    this.data = data;
    this.status = status;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  inspect() {
    return this.stack;
  }
}
