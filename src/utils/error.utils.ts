import { HttpException, HttpStatus } from '@nestjs/common';
import { Constants } from './constant.utils';

export class ErrorUtils {
  static throwError(message: string = Constants.GENERIC_ERROR): Error {
    throw new Error(message);
  }

  static throwHttpError(
    message: string = Constants.GENERIC_ERROR,
    status: number = HttpStatus.INTERNAL_SERVER_ERROR,
  ): HttpException {
    throw new HttpException(message, status);
  }
}
