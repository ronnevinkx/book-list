const {
	GraphQLObjectType,
	GraphQLID,
	GraphQLString,
	GraphQLSchema,
	GraphQLInt,
	GraphQLList,
	GraphQLNonNull
} = require('graphql');

const Book = require('../models/book.model');
const Author = require('../models/author.model');

// lodash
// const _ = require('lodash');

// dummy data
// const books = [
// 	{ name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1' },
// 	{ name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2' },
// 	{ name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3' },
// 	{ name: 'The Hero of Ages', genre: 'Sci-Fi', id: '4', authorId: '2' },
// 	{ name: 'The Colour of Magic', genre: 'Sci-Fi', id: '5', authorId: '3' },
// 	{ name: 'The Light Fantastic', genre: 'Sci-Fi', id: '6', authorId: '3' }
// ];

// const authors = [
// 	{ name: 'Patrick Rothfuss', age: 44, id: '1' },
// 	{ name: 'Brandon Sanderson', age: 42, id: '2' },
// 	{ name: 'Terry Pratchett', age: 66, id: '3' }
// ];

// book type
const BookType = new GraphQLObjectType({
	name: 'Book',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		nameFormatted: { type: GraphQLString },
		genre: { type: GraphQLString },
		descr: { type: GraphQLString },
		author: {
			type: AuthorType,
			async resolve(parent, args) {
				// console.log(parent); // parent = book we requested
				// return _.find(authors, { id: parent.authorId });

				try {
					return await Author.findById(parent.author);
				} catch (error) {
					return { error };
				}
			}
		}
	})
});

// author type
const AuthorType = new GraphQLObjectType({
	name: 'Author',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		age: { type: GraphQLInt },
		books: {
			type: new GraphQLList(BookType),
			async resolve(parent, args) {
				// return _.filter(books, { authorId: parent.id });

				try {
					return await Book.find({ author: parent.id });
				} catch (error) {
					return { error };
				}
			}
		}
	})
});

// root query
const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		books: {
			type: new GraphQLList(BookType),
			async resolve(parent, args) {
				// return books;

				try {
					return await Book.find().sort({ createdAt: -1 });
				} catch (error) {
					return { error };
				}
			}
		},
		book: {
			type: BookType,
			args: {
				// nameFormatted: { type: GraphQLString }
				id: { type: GraphQLID }
			},
			async resolve(parent, args) {
				// return _.find(books, { id: args.id });

				try {
					// return await Book.findOne({
					// 	nameFormatted: args.nameFormatted
					// });

					return await Book.findById(args.id);
				} catch (error) {
					return { error };
				}
			}
		},
		authors: {
			type: new GraphQLList(AuthorType),
			async resolve(parent, args) {
				// return authors;

				try {
					return await Author.find().sort({ name: 1 });
				} catch (error) {
					return { error };
				}
			}
		},
		author: {
			type: AuthorType,
			args: {
				id: { type: GraphQLID }
			},
			async resolve(parent, args) {
				// return _.find(authors, { id: args.id });

				try {
					return await Author.findById(args.id);
				} catch (error) {
					return { error };
				}
			}
		}
	}
});

const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		addAuthor: {
			type: AuthorType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				age: { type: new GraphQLNonNull(GraphQLInt) }
			},
			async resolve(parent, args) {
				const { name, age } = args;
				const newAuthor = new Author({ name, age });

				try {
					return await newAuthor.save();
				} catch (error) {
					return { error };
				}
			}
		},
		addBook: {
			type: BookType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				nameFormatted: { type: new GraphQLNonNull(GraphQLString) },
				genre: { type: new GraphQLNonNull(GraphQLString) },
				descr: { type: new GraphQLNonNull(GraphQLString) },
				author: { type: new GraphQLNonNull(GraphQLID) }
			},
			async resolve(parent, args) {
				const { name, nameFormatted, genre, descr, author } = args;
				const newBook = new Book({
					name,
					nameFormatted,
					genre,
					descr,
					author
				});

				try {
					return await newBook.save();
				} catch (error) {
					return { error };
				}
			}
		},
		editBook: {
			type: BookType,
			args: {
				id: { type: GraphQLID },
				name: { type: new GraphQLNonNull(GraphQLString) },
				nameFormatted: { type: new GraphQLNonNull(GraphQLString) },
				genre: { type: new GraphQLNonNull(GraphQLString) },
				descr: { type: new GraphQLNonNull(GraphQLString) },
				author: { type: new GraphQLNonNull(GraphQLID) }
			},
			async resolve(parent, args) {
				const { id, name, nameFormatted, genre, descr, author } = args;

				try {
					return await Book.findByIdAndUpdate(
						id,
						{ name, nameFormatted, genre, descr, author },
						{
							new: true,
							runValidators: true,
							useFindAndModify: false
						}
					);
				} catch (error) {
					return { error };
				}
			}
		},
		deleteBook: {
			type: BookType,
			args: {
				id: { type: GraphQLID }
			},
			async resolve(parent, args) {
				try {
					return await Book.findByIdAndDelete(args.id);
				} catch (error) {
					return { error };
				}
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation
});
