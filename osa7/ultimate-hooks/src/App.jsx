import useField from './hooks/useField'
import useResource from './hooks/useResource'

const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteService] = useResource('/api/notes')
  const [persons, personService] = useResource('/api/persons')

  const handleNoteSubmit = event => {
    event.preventDefault()
    noteService.create({ content: content.value })
  }

  const handlePersonSubmit = event => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value })
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button type="submit">create</button>
      </form>
      {notes.map(note => (
        <p key={note.id}>{note.content}</p>
      ))}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br />
        number <input {...number} />
        <button type="submit">create</button>
      </form>
      {persons.map(person => (
        <p key={person.id}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  )
}

export default App
