//import tokenUtils from '../utils/tokens';

const auth = {};

auth.restrictToAdmin = (async (_, query, context) => {
  await auth.restrict(_, query, context);
  if (!context.user.admin) throw new Error('Unauthorized');
});

auth.restrict = (async (_, query, context) => {
  if (!context.user) throw new Error('Unauthorized');
});

auth.adminOnly = (req, res, next) => {
  if (req.user.admin) next();

  return res.status(401).send('Unauthorized.');
};

/* No Tokens Yet

auth.bindUser = (async (req, res, next) => {
  if (!req.headers.authorization && !req.query.token) return next();

  const token = req.query.token ?
    req.query.token :
    req.headers.authorization.split('Bearer ')[1];

  try {
    const user = await tokenUtils.verifyToken(token);
    req.user = user;
    return next();
  } catch (err) {
    return next(err);
  }
});

*/

export default auth;