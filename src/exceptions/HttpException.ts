const getDefaultMessage = (statusCode: number) => {
  if (statusCode === 400) return 'Bad Request';
  if (statusCode === 401) return 'you have to authorize to use this';
  if (statusCode === 501) return 'Not Implemented';
  return 'unknown server error occured.';
};

export default class HttpException extends Error {
  status: number;
  message: string;
  constructor(statusCode: number = 500, message?: string) {
    super(message);
    this.name = 'HttpException';
    this.status = statusCode;
    this.message = message ?? getDefaultMessage(this.status);
  }
}
