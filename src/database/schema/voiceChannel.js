require('dotenv').config();
const mongoose = require('mongoose');

module.exports = mongoose.model(
	'voiceChannel',
	new mongoose.Schema(
		{
			channelId: { type: String, unique: true },
			parentId: { type: String, default: '' },
			count: { type: Number },
		},
		{
			timestamps: true,
		}
	)
);
