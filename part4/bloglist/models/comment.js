const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
  content: {
    type: String,
    minLength: 3,
    required: true,
  },
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog',
  },
})

commentSchema.set('toJSON', {
  transform: (document, comment) => {
    comment.id = comment._id.toString()
    delete comment._id
    delete comment.__v
  },
})

module.exports = mongoose.model('Comment', commentSchema)
