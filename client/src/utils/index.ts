import { BookGenreType } from '../types';

export function formatForUrl(str: string): string {
	return str.toLowerCase().replace(/\s+/g, '-');
}

export function resetBookInput(
	setName: React.Dispatch<React.SetStateAction<string>>,
	setNameFormatted: React.Dispatch<React.SetStateAction<string>>,
	setGenre: React.Dispatch<React.SetStateAction<'' | BookGenreType>>,
	setAuthor: React.Dispatch<React.SetStateAction<string>>
): void {
	setName('');
	setNameFormatted('');
	setGenre('');
	setAuthor('');
}
