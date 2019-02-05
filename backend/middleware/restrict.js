import jwt from 'jsonwebtoken';
import api from '../api'
import tokens from '../utils/tokens';

const auth = {};

auth.restrict = (async (_, query, context) => {
    const { tokenUser } = await context;
    if (!tokenUser.email_verified) {
      throw new Error('Unauthorized - Please Verify Your Email Address With Auth0');
    }
  });

auth.restrictToAdmin = (async (_, query, context) => {
  await auth.restrict(_, query, context);
  if (!context.user.admin) throw new Error('Unauthorized');
});

auth.adminOnly = (req, res, next) => {
    if (req.user.admin) next();

    return res.status(401).send('Unauthorized.');
  };

auth.getUserFromDb = (context) => {
  return api.user.getOneFromEmail({email: context.user.email}, context);
}

auth.verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, tokens.getKey, tokens.options, (err, decoded) => {
      err ? reject(err) : resolve(decoded);
    });
  });
};

auth.bindUser = async (req, res, next) => {
  if (req.headers.authorization) {
    try {
      const tokenUser = await auth.verifyToken(req.headers.authorization);
      const databaseUser = await api.user.fetchOne({ email: tokenUser.email });

      req.tokenUser = tokenUser;
      if (databaseUser) {
        req.user = databaseUser.toJSON();
      }
    } catch (e) {
      console.log(e);
    }
  }

  next();
};

export default auth;
