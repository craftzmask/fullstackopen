const CommentList = ({ comments }) => {
  return (
    <ul>
      {comments.map((c) => (
        <li key={c.id}>{c.content}</li>
      ))}
    </ul>
  )
}

export default CommentList
