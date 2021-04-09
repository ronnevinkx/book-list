const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Please add a name'],
			trim: true,
			unique: true,
			maxlength: [40, 'The name cannot be longer than 40 characters']
		},
		age: {
			type: Number,
			required: true
		},
		books: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Book'
		}
	},
	{
		timestamps: true
	}
);

module.exports =
	mongoose.models.Author || mongoose.model('Author', authorSchema);
