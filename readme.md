Prism Core - Directory Application for Prism Systems

Server-side API using Apollo, GraphQl, Bookshelf, Passport, auth0 and others.

Knex Migrations:

```npm install knex -g```

```knex migrage:latest```


Mutation example:

``` mutation{
  
 createUser(input:{
	firstName: "Drew"
  lastName: "Nelson"
  email: "drew.nelson@prismsystems.com"
  title: "Systems Design Group"
  admin: true
  
}
)
  {
    name
  }
} ```