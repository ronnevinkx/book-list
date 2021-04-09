import { useState } from 'react';
import { useHistory } from 'react-router';
import { useMutation } from '@apollo/client';
import { ADD_AUTHOR } from '../queries';
import { LK_ADD_AUTHOR_TITLE, LK_ADD_AUTHOR_BTN } from '../constants';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

interface Props {}

const AddAuthor: React.FC<Props> = () => {
	const history = useHistory();

	const [name, setName] = useState<string>('');
	const [nameError, setNameError] = useState<boolean>(false);
	const [age, setAge] = useState<number | null>(null);
	const [ageError, setAgeError] = useState<boolean>(false);

	const [addAuthor, { loading, error }] = useMutation(ADD_AUTHOR, {
		variables: { name, age },
		update(cache, { data: { addAuthor } }) {
			cache.modify({
				fields: {
					authors(existingAuthors = []) {
						return [...existingAuthors, addAuthor];
					}
				}
			});
		},
		onCompleted: () => history.push('/')
	});

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setNameError(false);
		setAgeError(false);

		if (name === '') setNameError(true);
		if (age !== null) setAgeError(true);

		if (name && age) addAuthor();
	};

	const styles = {
		mbFormField: 3,
		mtFormSubmit: 5
	};

	if (loading) return <Box textAlign="center">Adding author...</Box>;
	if (error) return <Box textAlign="center">Error</Box>;

	return (
		<Container maxWidth="sm">
			<Box mt={1} mb={5}>
				<Typography
					variant="h3"
					component="h1"
					align="center"
					color="primary"
				>
					{LK_ADD_AUTHOR_TITLE}
				</Typography>
			</Box>
			<form noValidate autoComplete="off" onSubmit={handleSubmit}>
				<Box mb={styles.mbFormField}>
					<TextField
						label="Author name"
						required
						error={nameError}
						fullWidth
						variant="outlined"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</Box>
				<Box mb={styles.mbFormField}>
					<TextField
						label="Age"
						required
						error={ageError}
						fullWidth
						variant="outlined"
						value={age}
						onChange={(e) => setAge(parseInt(e.target.value))}
					/>
				</Box>
				<Box mt={styles.mtFormSubmit}>
					<FormControl>
						<Button
							type="submit"
							variant="contained"
							color="primary"
						>
							{LK_ADD_AUTHOR_BTN}
						</Button>
					</FormControl>
				</Box>
			</form>
		</Container>
	);
};

export default AddAuthor;
