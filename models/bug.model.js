const mongoose = require('mongoose');
const Schema = mongoose.Schema ;

const bugSchema = new Schema({
    severity: {type: String, required: true },
    priority: {type: String, required: true},
    assignee: {type: String, required: false},
    state: {type: String, required: true},
    resolution: {type: String, required: true},
    shortDescription: { type: String, required: true},
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