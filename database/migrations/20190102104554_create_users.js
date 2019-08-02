
exports.up = function(knex, Promise) {
    return knex.schema.createTable('user', function(t) {
        t.increments('id').unsigned().primary();
        t.string('first_name').notNull();
        t.string('last_name').notNull();
        t.string('email').notNull();
        t.enu('type', ['employee', 'manager', 'executive']).nullable();
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

// EXAMPLE INSERT: 
// insert into user (first_name, last_name, email, type, cell_phone, title, location, admin) VALUES ('Drew', 'Nelson', 'drew.nelson@prismsystems.com', 'employee', '(205) 908-8720', 'Systems Design Group', 'Birmingham', true);