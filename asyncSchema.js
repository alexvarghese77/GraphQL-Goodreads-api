const fetch = require('node-fetch');
const util = require('util');
const parseXml = util.promisify(require('xml2js').parseString);
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} = require('graphql');

const transilate = (title, lang) => {
  //we can call another apis here and return new data, its called API aggragation
  return lang + title;
};
const BookType = new GraphQLObjectType({
  name: 'book',
  description: '...',
  fields: () => ({
    title: {
      type: GraphQLString,
      args: {
        lang: { type: GraphQLString }
      },
      resolve: (xml, args) => {
        let title = xml.GoodreadsResponse.book[0].title[0];
        return args.lang ? transilate(title, args.lang) : title;
      }
    },
    isbn: {
      type: GraphQLString,
      resolve: xml => xml.GoodreadsResponse.book[0].isbn[0]
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'author',
  description: '...',

  fields: () => ({
    name: {
      type: GraphQLString,
      resolve: xml => xml.GoodreadsResponse.author[0].name[0]
    },
    books: {
      type: new GraphQLList(BookType),
      resolve: xml => {
        let id = xml.GoodreadsResponse.author[0].books[0].book.map(
          book => book.id[0]._
        );
        return Promise.all(
          id.map(id =>
            fetch(
              `https://www.goodreads.com/book/show/?id=${id}&key=WlM5Eyi24CT4dhVNeJvSw`
            )
              .then(res => res.text())
              .then(parseXml)
          )
        );
      }
    }
  })
});
module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    description: '...',
    fields: () => ({
      author: {
        type: AuthorType,
        args: {
          id: { type: GraphQLInt }
        },
        resolve: (root, arg) =>
          fetch(
            `https://www.goodreads.com/author/show/?id=${
              arg.id
            }&key=WlM5Eyi24CT4dhVNeJvSw`
          )
            .then(res => res.text())
            .then(parseXml)
      }
    })
  })
});
