import { useHistory } from 'react-router';
import { useMutation } from '@apollo/client';
import { DELETE_BOOK } from '../queries';
import { BookType } from '../types';
import { LK_DELETE_BTN } from '../constants';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

interface Props {
	id: string;
}

const DeleteBookButton: React.FC<Props> = ({ id }) => {
	const history = useHistory();

	const [deleteBook, { loading, error }] = useMutation(DELETE_BOOK, {
		update(cache) {
			cache.modify({
				fields: {
					books(list, { readField }) {
						return list.filter(
							(book: BookType) => readField('id', book) !== id
						);
					}
				}
			});

			history.push('/');
		}
	});

	if (loading) return <p>Deleting...</p>;
	if (error) return <p>Error</p>;

	return (
		<Button
			onClick={() => deleteBook({ variables: { id } })}
			variant="outlined"
			color="secondary"
			startIcon={<DeleteIcon />}
		>
			{LK_DELETE_BTN}
		</Button>
	);
};

export default DeleteBookButton;
