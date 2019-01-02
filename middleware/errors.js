/**
 * development error handler, returns the full error object
 * @param {Object} err
 * @param {Object} req
 * @param {Object} res
 */
const devErrorHandler = (err, req, res) => res.json(err);

/**
 * production error handler, only provides status code and basic error message
 * @param {Object} err
 * @param {Object} req
 * @param {Object} res
 */
const prodErrorHandler = (err, req, res) => res.json({ message: err.message, status: err.status });

/**
 * generates error handling middleware depending on the current environemnt
 */
export default () => {
  const handler = process.env.NODE_ENV === 'development' ?
    devErrorHandler :
    prodErrorHandler;

  return (err, req, res, next) => {
    res.status(err.status || 500);
    handler(err, req, res, next);
  };
};