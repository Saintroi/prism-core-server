const auth = {};

auth.restrict = (async (_, query, context) => {
    console.log("MEMES", context.user)
    if (!context.user.email) throw new Error('Unauthorized');
  });

auth.restrictToAdmin = (async (_, query, context) => {
  await auth.restrict(_, query, context);
  if (!context.user.admin) throw new Error('Unauthorized');
});

auth.adminOnly = (req, res, next) => {
    if (req.user.admin) next();
  
    return res.status(401).send('Unauthorized.');
  };



export default auth;
