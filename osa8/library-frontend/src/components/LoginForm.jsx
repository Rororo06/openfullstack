import { useMutation } from '@apollo/client/react'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

import { LOGIN } from '../queries'

const LoginForm = ({ setToken, setError, setPage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login, result] = useMutation(LOGIN, {
    onError: error => setError(error.message),
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('library-user-token', token)
      setPage('authors')
    }
  }, [result.data, setToken, setPage])

  const submit = event => {
    event.preventDefault()
    login({ variables: { username, password } })
  }

  return (
    <div>
      <h2>login</h2>
      <form onSubmit={submit}>
        <div>
          username
          <input
            value={username}
            onChange={event => setUsername(event.target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  setToken: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  setPage: PropTypes.func.isRequired,
}

export default LoginForm
