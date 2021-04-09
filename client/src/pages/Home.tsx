import { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_BOOKS } from '../queries';
import { BookType } from '../types';
import { LK_HOME_TITLE } from '../constants';
import Box from '@material-ui/core/Box';
import BookCard from '../components/BookCard';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Masonry from 'react-masonry-css';

const useStyles = makeStyles((theme: Theme) => {
	return {
		masonryGrid: {
			display: 'flex',
			width: 'auto',
			marginLeft: '-30px'
		},
		masonryGridCol: {
			paddingLeft: '30px',
			backgroundClip: 'padding-box',
			'& .MuiCard-root': {
				marginBottom: '30px'
			}
		}
	};
});

const breakpoints = {
	default: 3,
	1110: 2,
	900: 1
};

interface Props {}

const Home: React.FC<Props> = () => {
	const classes = useStyles();
	const [getBooks, { error, loading, data }] = useLazyQuery(GET_BOOKS);

	useEffect(() => {
		getBooks();
	}, [getBooks]);

	return (
		<>
			<Box mt={1} mb={5}>
				<Typography
					variant="h3"
					component="h1"
					align="center"
					color="primary"
				>
					{LK_HOME_TITLE}
				</Typography>
			</Box>
			{loading ? (
				<Box textAlign="center">Loading books...</Box>
			) : error ? (
				<Box textAlign="center">Error</Box>
			) : !loading && !error && (!data || data.books.length === 0) ? (
				<Box textAlign="center">No books listed yet.</Box>
			) : (
				<Box mx={5}>
					<Masonry
						breakpointCols={breakpoints}
						className={classes.masonryGrid}
						columnClassName={classes.masonryGridCol}
					>
						{data.books.map((book: BookType) => (
							<div key={book.id}>
								<BookCard book={book} />
							</div>
						))}
					</Masonry>
				</Box>
			)}
		</>
	);
};

export default Home;
