/**
 * Middleware to force https requests on Heroku
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const forceHttps = (req, res, next) => {
    return req.headers['x-forwarded-proto'] === 'https' ?
      next() :
      res.redirect(['https://', req.hostname, req.url].join(''));
  };
  
  export default forceHttps;