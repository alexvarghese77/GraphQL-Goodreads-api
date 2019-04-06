# GraphQL

This is a simple project explain the basic use of a GrqphQL from a traditional xml API endpoint,.

- Using Node as server
- goodreads as api endpoint for data
- install GraphiQL chrome extension for debugging

### Get Project!

- git clone git@github.com:alexvarghese77/GraphQL-Goodreads-api.git
- run npm install
- npm start

### Run Query

> query{
> author(id:4573983) {

    name,
    books {
      title,
      isbn
    }

}
}

make change in the onbject properties of the query and have some fun
