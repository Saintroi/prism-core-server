import validate from '../validation';
import models from '../models';

const userApi = {};

userApi.fetchOne = args => models.User.where(args).fetch();
userApi.fetchAll = args => models.User.where(args).orderBy('last_name').fetchAll();
userApi.createOne = args => new models.User(args).save();

/**
 * Retrives the currently logged in user using their id from context
 * @param {Object} _
 * @param {Object} args
 * @param {Object} context
 */
userApi.getMe = (_, args, context) => {
  const query = Object.assign({}, args, { id: context.user.id });
  return userApi.fetchOne(query);
};

/**
 * Retrives a list of all users
 * @param {Object} _
 * @param {Object} args
 * @param {Object} context
 */
userApi.getAll = (_, args) => userApi.fetchAll(args);


/**
 * Creates a new user
 * @param {Object} _
 * @param {Object} args
 * @param {Object} context
 */
userApi.createUser = (async (_, args) => {
  /*const user = await validate(
    'createUser',
    Object.assign({}, args, { type: 'user' }),
  );*/

  //const user = Object.assign({}, args, {type: 'user'});

  return userApi.createOne(args.input);
});

/**
 * Updates an user
 * @param {Object} _
 * @param {Object} args
 * @param {Object} context
 */
userApi.update = (async (_, args) => {
  const updates = Object.assign({}, args);
  const { id } = updates;
  delete updates.id;

  // TODO - change validation to use main validation object
  if (!id) throw new Error('A valid id is required to update a user.');

  const user = await userApi.fetchOne({ id });
  return user.set(updates).save();
});

userApi.setAdmin = (async (id, admin) => {
  const user = await userApi.fetchOne({ id });

  return user.set({ admin }).save()
    .then((currentUser) => {
      return currentUser;
    });
});

userApi.grantAdmin = (async (_, args) => {
  return userApi.setAdmin(args.id, true);
});

userApi.revokeAdmin = (async (_, args) => {
  return userApi.setAdmin(args.id, false);
});

export default userApi;