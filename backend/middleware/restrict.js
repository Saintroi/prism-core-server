import api from '../api'

const auth = {};

auth.restrict = (async (_, query, context) => {
    const user = await context.user;
    //console.log("MEMES", user)
    if (!user.email_verified){
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

auth.bindUser = (async(decoded) =>{
  var dbusers = await api.user.fetchAll();
  console.log('HERE:' + dbusers);
  for (var user in dbusers){
    if (user.email === decoded.email) {
      user.email_verified = decoded.email_verified;
      return user; 
    };
  };
  return null;
});


export default auth;
