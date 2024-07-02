const httpErrors = {
  400: 'Bad request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not found',
  500: 'Internal server error',
};

const isKnownStatus = status =>
  typeof status === 'number' &&
  Object.keys(httpErrors).indexOf(`${status}`) >= 0;

export const errorHandler = (err, req, res, next) => {
  if (err) {
    console.log('error here', err);
    const statusCode = isKnownStatus(err.statusCode)
      ? err.statusCode || 500
      : err;
    const message =
      err.message || httpErrors[statusCode] || 'Something went wrong';
    res.status(statusCode).json({ statusCode, message });
  }
  next();
};
