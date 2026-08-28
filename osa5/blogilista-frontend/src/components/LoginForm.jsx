import PropTypes from 'prop-types'

const LoginForm = ({
  onSubmit,
  username,
  onUsernameChange,
  password,
  onPasswordChange,
}) => (
  <form onSubmit={onSubmit}>
    <h2>log in to application</h2>
    <div>
      username
      <input
        id="username"
        data-testid="username"
        value={username}
        onChange={onUsernameChange}
      />
    </div>
    <div>
      password
      <input
        id="password"
        data-testid="password"
        type="password"
        value={password}
        onChange={onPasswordChange}
      />
    </div>
    <button type="submit">login</button>
  </form>
)

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  onUsernameChange: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
}

export default LoginForm
