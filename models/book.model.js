const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Please add a name'],
			trim: true,
			unique: true,
			maxlength: [40, 'The name cannot be longer than 40 characters']
		},
		nameFormatted: {
			type: String,
			required: true,
			trim: true,
			maxlength: 40
		},
		genre: {
			type: String,
			enum: ['Fantasy', 'Sci-Fi', 'Travel'],
			default: 'Fantasy',
			required: true
		},
		descr: {
			type: String,
			required: true
		},
		author: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'Author'
		}
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.models.Book || mongoose.model('Book', bookSchema);
