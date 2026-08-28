import { Link } from 'react-router-dom'

const padding = {
  paddingRight: 5,
}

const Menu = () => (
  <div>
    <Link style={padding} to="/">
      anecdotes
    </Link>
    <Link style={padding} to="/create">
      create new
    </Link>
    <Link style={padding} to="/about">
      about
    </Link>
  </div>
)

export default Menu
