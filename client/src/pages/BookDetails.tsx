import { Link as RouterLink, useParams, Redirect } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_BOOK } from '../queries';
import { BookType } from '../types';
import EditBookButton from '../components/EditBookButton';
import DeleteBookButton from '../components/DeleteBookButton';
import { LK_BACK_TO_INDEX } from '../constants';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

interface Props {}

interface ParamTypes {
	id: string;
	// nameFormatted: string;
}

const BookDetails: React.FC<Props> = () => {
	const { id } = useParams<ParamTypes>();
	const { error, loading, data } = useQuery(GET_BOOK, {
		variables: { id }
	});

	if (!loading && !error && data.book && data.book.name === null)
		return <Redirect to="/" />;

	return (
		<>
			{loading && <Box textAlign="center">Loading book...</Box>}
			{error && <Box textAlign="center">Error</Box>}
			{data && data.book && data.book.name !== null && (
				<Container maxWidth="sm">
					<Typography
						variant="h3"
						component="h1"
						align="center"
						color="primary"
					>
						{data.book.name}
					</Typography>
					<Box mt={2} textAlign="center">
						{data.book.genre}{' '}
						<Box display="inline" mx={1} color="grey.500">
							|
						</Box>{' '}
						By {data.book.author.name}
					</Box>
					<p>{data.book.descr}</p>
					{data.book.author.books.filter(
						(book: BookType) => book.id !== data.book.id
					).length > 0 && (
						<>
							<p>Other books by {data.book.author.name}:</p>
							<ul>
								{data.book.author.books.map(
									(book: BookType) => {
										return (
											book.id !== data.book.id && (
												<li key={book.id}>
													<RouterLink
														to={`/${book.id}/view`}
													>
														{book.name}
													</RouterLink>
												</li>
											)
										);
									}
								)}
							</ul>
						</>
					)}
					<Box
						display="flex"
						borderTop={1}
						borderColor="grey.400"
						pt={5}
						mt={5}
					>
						<Box flexGrow={1} display="flex">
							<Box mr={0.5}>
								<EditBookButton id={data.book.id} />
							</Box>
							<Box ml={0.5}>
								<DeleteBookButton id={data.book.id} />
							</Box>
						</Box>
						<Box textAlign="center">
							<Button
								component={RouterLink}
								to="/"
								color="primary"
							>
								{LK_BACK_TO_INDEX}
							</Button>
						</Box>
					</Box>
				</Container>
			)}
		</>
	);
};

export default BookDetails;
