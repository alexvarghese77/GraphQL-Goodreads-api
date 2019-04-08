const express = require('express');
const graphqlHTTP = require('express-graphql');

const app = new express();
const schema = require('./cachingData');
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(4000);
console.log('app is runnong at 4000');
