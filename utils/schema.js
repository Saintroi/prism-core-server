const schemaUtils = {};

/**
 * wraps a chain of schema methods
 * runs a chain of promises that must each pass in order for the next to be called
 * allows authentication to be performed before api methods, etc.
 * @param {Promise[]} chain
 */
schemaUtils.wrap = (...chain) => {
  return (async (_, query, context) => {
    let i = 0;
    let value;

    while (chain[i]) {
      value = await chain[i](_, query, context); // eslint-disable-line no-await-in-loop
      i += 1;
    }

    if (value && value.toJSON) return value.toJSON();
    return value;
  });
};

export default schemaUtils;