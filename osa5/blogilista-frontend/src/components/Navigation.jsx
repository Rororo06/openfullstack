import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Navigation = ({ user, onLogout }) => (
  <nav className="navigation">
    <Link to="/">blogs</Link>
    {user && <Link to="/create">create new</Link>}
    {user ? (
      <span className="navigation-user">
        {user.name ?? user.username} logged in{' '}
        <button onClick={onLogout}>logout</button>
      </span>
    ) : (
      <Link to="/login">login</Link>
    )}
  </nav>
)

Navigation.propTypes = {
  user: PropTypes.object,
  onLogout: PropTypes.func.isRequired,
}

export default Navigation
