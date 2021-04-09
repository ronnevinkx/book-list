import { useHistory } from 'react-router';
import { LK_EDIT_BTN } from '../constants';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';

interface Props {
	id: string;
}

const EditBookButton: React.FC<Props> = ({ id }) => {
	const history = useHistory();

	return (
		<Button
			onClick={() => history.push(`/${id}/edit`)}
			variant="outlined"
			color="primary"
			startIcon={<EditIcon />}
		>
			{LK_EDIT_BTN}
		</Button>
	);
};

export default EditBookButton;
