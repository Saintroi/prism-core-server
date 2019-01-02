const auth = {};

auth.admin = (user) => {
  return user.admin;
};

auth.restrictTo = (to) => {
  return (req, res, next) => {
    const { user } = req;

    if (user && auth[to](user)) return next();

    res.status(401);
    return res.send('Unauthorized');
  };
};

export default auth;
