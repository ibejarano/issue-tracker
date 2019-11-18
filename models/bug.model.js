const mongoose = require('mongoose');
const Schema = mongoose.Schema ;

const bugSchema = new Schema({
    priority: {type: String, required: true},
    assignee: {type: String, required: false},
    status: {type: String, required: true},
    type: {type: String, required: true},
    title: { type: String, required: true},
    comments: [
        {
            text: {type: String, required: true},
            date: {type: Date, default: Date.now},
            author: {type: String, require: true}
        }
    ]
    },
    {
        timestamps: true,
    }
);

const Bug = mongoose.model('bug', bugSchema);

module.exports = Bug;