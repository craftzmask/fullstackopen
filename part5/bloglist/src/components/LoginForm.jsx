const LoginForm = props => {
  return (
    <form onSubmit={props.onSubmit}>
      <div>
        <label htmlFor='username'>username:</label> 
        <input
          value={props.username}
          onChange={props.onUsernameChange}
          name='username'
          type='text'
          id='username'
        />
      </div>
      <div>
        <label htmlFor='password'>password:</label>
        <input
          value={props.password}
          onChange={props.onPasswordChange}
          name='password'
          type='password'
          id='password'
        />
      </div>
      <button type='submit'>login</button>
    </form>
  )
}

export default LoginForm