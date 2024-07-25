
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

@Catch()
export class TestFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const response: Response = host.switchToHttp().getResponse();

    // @ts-ignore
    response.status(400).json({
      statusCode: 400,
      // @ts-ignore
      message: 'test: ' + exception.message,
    });
  }
}
