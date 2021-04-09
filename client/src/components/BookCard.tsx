import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { BookType } from '../types';
import EditBookButton from './EditBookButton';
import DeleteBookButton from './DeleteBookButton';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';

interface Props {
	book: BookType;
}

const BookCard: React.FC<Props> = ({ book }) => {
	const [isRaised, setIsRaised] = useState(false);

	return (
		<Card
			raised={isRaised}
			onMouseOver={() => setIsRaised(true)}
			onMouseOut={() => setIsRaised(false)}
		>
			<CardHeader
				avatar={
					<Avatar aria-label={`Author: ${book.author.name}`}>
						{book.author.name.substr(0, 1)}
					</Avatar>
				}
				title={
					<Link to={`/${book.id}/view`} component={RouterLink}>
						<Box fontWeight="fontWeightBold">{book.name}</Box>
					</Link>
				}
				subheader={book.genre}
			/>
			<CardContent>
				<Typography>{book.descr}</Typography>
			</CardContent>
			<CardActions>
				<EditBookButton id={book.id} />
				<DeleteBookButton id={book.id} />
			</CardActions>
		</Card>
	);
};

export default BookCard;
