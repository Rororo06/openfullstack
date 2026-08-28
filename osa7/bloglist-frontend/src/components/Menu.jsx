import { Button, Nav, Navbar } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { logout } from '../reducers/loginReducer'

const Menu = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.login)

  return (
    <Navbar bg="light" expand="lg" className="mb-3 px-3">
      <Nav className="me-auto">
        <Nav.Link as={Link} to="/">
          blogs
        </Nav.Link>
        <Nav.Link as={Link} to="/users">
          users
        </Nav.Link>
      </Nav>
      <Navbar.Text className="me-2">{user.name ?? user.username} logged in</Navbar.Text>
      <Button variant="outline-secondary" size="sm" onClick={() => dispatch(logout())}>
        logout
      </Button>
    </Navbar>
  )
}

export default Menu
