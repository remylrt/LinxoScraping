const mongoose = require('mongoose');

const balanceSchema = mongoose.Schema({
	balance: Number,
	date: Date
});

module.exports = mongoose.model('Balance', balanceSchema);
