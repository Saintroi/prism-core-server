import user from './user';

/**
 * Root Api Object
 * all apis should be imported and combined into a root object here
 */
const apis = {
  user
};

/* No Cache (yet)
// wrap methods that should be cached
Object.keys(apis).forEach((apiKey) => {
  const api = apis[apiKey];
  if (!api.cache) return;

  Object.keys(api.cache).forEach((methodKey) => {
    const cacheConfig = api.cache[methodKey];
    // get the unwrapped api method
    const apiMethod = apis[apiKey][methodKey];

    // overwrite the current method with a cached wrap version
    apis[apiKey][methodKey] = cache.cachify(
      cacheConfig.key,
      cacheConfig.ttl,
      apiMethod,
      cacheConfig.byUser,
      `${apiKey}.${methodKey}`,
    );
  });
  
});
*/

export default apis;