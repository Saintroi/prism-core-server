import models from '../models';

const userApi = {};

userApi.fetchOne = args => models.User.where(args).fetch();
userApi.fetchAll = args => models.User.where(args).orderBy('last_name').fetchAll();
userApi.createOne = args => new models.User(args).save();
userApi.deleteOne = args => models.User.where(args).destroy();



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
  return userApi.createOne(args.input);
});

/**
 * Updates an user
 * @param {Object} _
 * @param {Object} args
 * @param {Object} context
 */
userApi.updateUser = (async (_, args) => {
  const updates = Object.assign({}, args).input;
  const { id } = updates;
  delete updates.id;

  // TODO - change validation to use main validation object
  if (!id) throw new Error('A valid id is required to update a user.');

  const user = await userApi.fetchOne({ id });
  return user.set(updates).save();
});

userApi.deleteUser = (async (_, args) => {
  const info = Object.assign({}, args).input;
  const { id } = info;
  delete info.id;

  // TODO - change validation to use main validation object
  if (!id) throw new Error('A valid id is required to delete a user.');

await userApi.deleteOne({ id });

  return {id: id};
});


export default userApi;