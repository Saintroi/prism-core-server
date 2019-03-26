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



Hosted on Digital Ocean using PM2:


prod deploy instructions:
  cd into /srv/prismcore
  git pull
  pm2 list
  pm2 delete all
  cd backend
  yarn
  yarn deploy
  cd ../client
  yarn
  yarn build
  yarn deploy