import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

import useField from '../hooks/useField'

const CreateNew = ({ addNew }) => {
  const navigate = useNavigate()
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const handleSubmit = event => {
    event.preventDefault()
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    })
    navigate('/')
  }

  const resetFields = () => {
    content.reset()
    author.reset()
    info.reset()
  }

  const fieldProps = field => ({
    type: field.type,
    value: field.value,
    onChange: field.onChange,
  })

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content <input {...fieldProps(content)} name="content" />
        </div>
        <div>
          author <input {...fieldProps(author)} name="author" />
        </div>
        <div>
          url for more info <input {...fieldProps(info)} name="info" />
        </div>
        <button type="submit">create</button>
        <button type="button" onClick={resetFields}>
          reset
        </button>
      </form>
    </div>
  )
}

CreateNew.propTypes = {
  addNew: PropTypes.func.isRequired,
}

export default CreateNew
