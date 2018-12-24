const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let transactionSchema = new Schema({
    userId: mongoose.SchemaTypes.ObjectId,
    transactionDate:{type: Date, require: true},
    transactionType:{type: String, require: true},
    description:{type: String, require: true},
    charge:{type: Number, default: 0},
    deposit:{type: Number, default: 0},
    notes:{type: String, default: ''},
    creationOn:{type: Date, default: Date.now},
});

const Transaction = mongoose.model('Transaction', transactionSchema);
module.export = Transaction;