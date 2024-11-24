const CommentForm = ({ onSubmit }) => {
  const comment = (e) => {
    e.preventDefault()
    onSubmit(e.target.comment.value)
    e.target.comment.value = ''
  }

  return (
    <form onSubmit={comment}>
      <input type='text' name='comment' id='comment' />
      <button type='submit'>add comment</button>
    </form>
  )
}

export default CommentForm
