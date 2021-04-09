import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useParams, Link as RouterLink, Redirect } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_AUTHORS, GET_BOOK, EDIT_BOOK } from '../queries';
import { AuthorType, BookGenreType } from '../types';
import { formatForUrl } from '../utils';
import { LK_SAVE_BTN, LK_CANCEL_BTN } from '../constants';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

interface Props {}

interface ParamTypes {
	id: string;
}

const EditBook: React.FC<Props> = () => {
	const history = useHistory();
	const { id } = useParams<ParamTypes>();
	const { error, loading, data } = useQuery(GET_BOOK, {
		variables: { id }
	});

	const [name, setName] = useState<string>('');
	const [nameError, setNameError] = useState<boolean>(false);
	const [nameFormatted, setNameFormatted] = useState<string>('');
	const [genre, setGenre] = useState<BookGenreType | ''>('');
	const [genreError, setGenreError] = useState<boolean>(false);
	const [descr, setDescr] = useState<string>('');
	const [descrError, setDescrError] = useState<boolean>(false);
	const [author, setAuthor] = useState<string>('');
	const [authorError, setAuthorError] = useState<boolean>(false);

	const {
		error: errorAuthors,
		loading: loadingAuthors,
		data: dataAuthors
	} = useQuery(GET_AUTHORS);

	useEffect(() => {
		if (data && data.book && data.book.name !== null) {
			setName(data.book.name);
			setNameFormatted(data.book.nameFormatted);
			setGenre(data.book.genre);
			setDescr(data.book.descr);
			setAuthor(data.book.author.id);
		}
	}, [data]);

	const [editBook, { loading: loadingEdit, error: errorEdit }] = useMutation(
		EDIT_BOOK,
		{
			variables: { id, name, nameFormatted, genre, descr, author },
			onCompleted: () => history.push('/')
		}
	);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setNameError(false);
		setGenreError(false);
		setDescrError(false);
		setAuthorError(false);

		if (name === '') setNameError(true);
		if (genre === '') setGenreError(true);
		if (descr === '') setDescrError(true);
		if (author === '') setAuthorError(true);

		if (name && genre && descr && author) editBook();
	};

	const styles = {
		mbFormField: 3,
		mtFormSubmit: 5
	};

	if (loading) return <Box textAlign="center">Loading book...</Box>;
	if (error || errorEdit) return <Box textAlign="center">Error</Box>;
	if (loadingEdit) return <Box textAlign="center">Saving book...</Box>;

	console.log('DATA', data);

	if (
		!loading &&
		!error &&
		!loadingEdit &&
		!errorEdit &&
		data.book &&
		data.book.name === null
	)
		return <Redirect to="/" />;

	return (
		<Container maxWidth="sm">
			<Box mt={1} mb={5}>
				<Typography
					variant="h3"
					component="h1"
					align="center"
					color="primary"
				>
					{name}
				</Typography>
			</Box>
			<form noValidate autoComplete="off" onSubmit={handleSubmit}>
				<Box mb={styles.mbFormField}>
					<TextField
						label="Book name"
						required
						error={nameError}
						fullWidth
						variant="outlined"
						value={name}
						onChange={(e) => {
							setName(e.target.value);
							setNameFormatted(formatForUrl(e.target.value));
						}}
					/>
				</Box>
				<Box mb={styles.mbFormField}>
					<TextField
						label="Description"
						required
						error={descrError}
						fullWidth
						multiline
						rows={6}
						variant="outlined"
						value={descr}
						onChange={(e) => setDescr(e.target.value)}
					/>
				</Box>
				<Box mb={styles.mbFormField}>
					<FormControl fullWidth error={genreError}>
						<InputLabel htmlFor="genre-native-simple">
							Genre *
						</InputLabel>
						<Select
							native
							required
							value={genre}
							onChange={(e) =>
								setGenre(e.target.value as BookGenreType)
							}
							inputProps={{
								name: 'genre',
								id: 'genre-native-simple'
							}}
						>
							<option aria-label="None" value="" />
							<option value={BookGenreType.FANTASY}>
								Fantasy
							</option>
							<option value={BookGenreType.SCIFI}>Sci-Fi</option>
							<option value={BookGenreType.TRAVEL}>Travel</option>
						</Select>
					</FormControl>
				</Box>
				<Box mb={styles.mbFormField}>
					<FormControl fullWidth error={authorError}>
						<InputLabel htmlFor="author-native-simple">
							Author *
						</InputLabel>
						<Select
							native
							required
							value={author}
							onChange={(e) =>
								setAuthor(e.target.value as string)
							}
							inputProps={{
								name: 'author',
								id: 'author-native-simple'
							}}
						>
							{loadingAuthors ? null : errorAuthors ? null : (
								<>
									<option aria-label="None" value="" />
									{dataAuthors.authors.map(
										(author: AuthorType) => (
											<option
												key={author.id}
												value={author.id}
											>
												{author.name}
											</option>
										)
									)}
								</>
							)}
						</Select>
					</FormControl>
				</Box>
				<Box mt={styles.mtFormSubmit}>
					<FormControl>
						<Box display="flex">
							<Box mr={0.5}>
								<Button
									type="submit"
									variant="contained"
									color="primary"
								>
									{LK_SAVE_BTN}
								</Button>
							</Box>
							<Box ml={0.5}>
								<Button
									component={RouterLink}
									to={`/${id}/view`}
								>
									{LK_CANCEL_BTN}
								</Button>
							</Box>
						</Box>
					</FormControl>
				</Box>
			</form>
		</Container>
	);
};

export default EditBook;
