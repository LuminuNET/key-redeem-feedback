export abstract class HTTPClientError extends Error {
  readonly statusCode!: number;
  readonly name!: string;

  constructor(message: object | string) {
    if (message instanceof Object) {
      super(JSON.stringify(message));
    } else {
      super(JSON.stringify({ success: false, message }));
    }
    this.name = this.constructor.name;
  }
}

export abstract class HTTPServerError extends HTTPClientError {}

export class HTTP400Error extends HTTPClientError {
  readonly statusCode = 400;

  constructor(message: string | object = 'Bad Request') {
    super(message);
  }
}

export class HTTP401Error extends HTTPClientError {
  readonly statusCode = 401;

  constructor(message: string | object = 'Unauthorized') {
    super(message);
  }
}

export class HTTP404Error extends HTTPClientError {
  readonly statusCode = 404;

  constructor(message: string | object = 'Not found') {
    super(message);
  }
}

export class HTTP500Error extends HTTPServerError {
  readonly statusCode = 500;

  constructor(message: string | object = 'Internal Server Error') {
    super(message);
  }
}
