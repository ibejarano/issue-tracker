const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bugSchema = new Schema(
  {
    priority: { type: String, required: true },
    assignee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    status: { type: String, required: true },
    type: { type: String, required: true },
    title: { type: String, required: true },
    comments: [
      {
        text: { type: String, required: true },
        date: { type: Date, default: Date.now },
        author: { type: String, require: true },
        updateStatus: {
          priority: { type: String, required: false },
          assignee: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
          },
          status: { type: String, required: false },
          type: { type: String, required: false },
          title: { type: String, required: false }
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

const Bug = mongoose.model("bug", bugSchema);

module.exports = Bug;
