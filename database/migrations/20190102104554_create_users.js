
exports.up = function(knex, Promise) {
    return knex.schema.createTable('user', function(t) {
        t.increments('id').unsigned().primary();
        t.string('first_name').notNull();
        t.string('last_name').notNull();
        t.string('email').notNull();
        t.string('cell_phone').nullable();
        t.string('office_phone').nullable();
        t.string('title').nullable();
        t.string('location').nullable();
        t.boolean('admin').notNull();
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user');
};
