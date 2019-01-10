
/**
 * middleware to help a request bypass the cache
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
const bypassCache = (req, res, next) => {
    req.bypassCache = true;
    next();
  };
  
  export default bypassCache;