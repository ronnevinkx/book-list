import { gql } from '@apollo/client';

export const GET_BOOKS = gql`
	query Books {
		books {
			id
			name
			nameFormatted
			genre
			descr
			author {
				id
				name
			}
		}
	}
`;

export const GET_BOOK = gql`
	query Book($id: ID!) {
		book(id: $id) {
			id
			name
			nameFormatted
			genre
			descr
			author {
				id
				name
				age
				books {
					id
					name
					nameFormatted
				}
			}
		}
	}
`;

export const GET_AUTHORS = gql`
	query Authors {
		authors {
			id
			name
		}
	}
`;

export const ADD_BOOK = gql`
	mutation AddBook(
		$name: String!
		$nameFormatted: String!
		$genre: String!
		$descr: String!
		$author: ID!
	) {
		addBook(
			name: $name
			nameFormatted: $nameFormatted
			genre: $genre
			descr: $descr
			author: $author
		) {
			id
			name
			nameFormatted
			genre
			descr
			author {
				name
			}
		}
	}
`;

export const EDIT_BOOK = gql`
	mutation EditBook(
		$id: ID!
		$name: String!
		$nameFormatted: String!
		$genre: String!
		$descr: String!
		$author: ID!
	) {
		editBook(
			id: $id
			name: $name
			nameFormatted: $nameFormatted
			genre: $genre
			descr: $descr
			author: $author
		) {
			id
			name
			nameFormatted
			genre
			descr
			author {
				name
			}
		}
	}
`;

export const DELETE_BOOK = gql`
	mutation DeleteBook($id: ID!) {
		deleteBook(id: $id) {
			id
			name
		}
	}
`;

export const ADD_AUTHOR = gql`
	mutation AddAuthor($name: String!, $age: Int!) {
		addAuthor(name: $name, age: $age) {
			id
			name
			age
		}
	}
`;
