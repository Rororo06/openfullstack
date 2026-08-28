import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'

import { login } from '../reducers/loginReducer'

const LoginForm = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = event => {
    event.preventDefault()
    dispatch(login({ username, password }))
    setPassword('')
  }

  return (
    <Form onSubmit={handleSubmit}>
      <h2>log in to application</h2>
      <Form.Group>
        <Form.Label>username</Form.Label>
        <Form.Control
          id="username"
          data-testid="username"
          value={username}
          onChange={event => setUsername(event.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>password</Form.Label>
        <Form.Control
          id="password"
          data-testid="password"
          type="password"
          value={password}
          onChange={event => setPassword(event.target.value)}
        />
      </Form.Group>
      <Button type="submit" className="mt-2">
        login
      </Button>
    </Form>
  )
}

export default LoginForm
