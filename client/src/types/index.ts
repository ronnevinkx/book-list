export type BookType = {
	id: string;
	name: string;
	nameFormatted: string;
	genre: string;
	descr: string;
	author: {
		name: string;
	};
};

export enum BookGenreType {
	FANTASY = 'Fantasy',
	SCIFI = 'Sci-Fi',
	TRAVEL = 'Travel'
}

export type AuthorType = {
	id: string;
	name: string;
	age: number;
	books: [BookType];
};
