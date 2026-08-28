import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import Notification from './components/Notification'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    personService.getAll().then(initialPersons => setPersons(initialPersons))
  }, [])

  const notify = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 5000)
  }

  const addPerson = event => {
    event.preventDefault()
    const person = { name: newName, number: newNumber }
    const existing = persons.find(p => p.name === person.name)

    if (existing) {
      const ok = window.confirm(
        `${existing.name} is already added to phonebook, replace the old number with a new one?`
      )
      if (!ok) {
        return
      }

      personService
        .update(existing.id, { ...existing, number: person.number })
        .then(updated => {
          setPersons(persons.map(p => (p.id === updated.id ? updated : p)))
          setNewName('')
          setNewNumber('')
          notify(`Changed the number of ${updated.name}`)
        })
        .catch(() => {
          setPersons(persons.filter(p => p.id !== existing.id))
          notify(
            `Information of ${existing.name} has already been removed from server`,
            'error'
          )
        })
      return
    }

    personService.create(person).then(created => {
      setPersons(persons.concat(created))
      setNewName('')
      setNewNumber('')
      notify(`Added ${created.name}`)
    })
  }

  const deletePerson = person => {
    if (!window.confirm(`Delete ${person.name}?`)) {
      return
    }

    personService
      .remove(person.id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== person.id))
        notify(`Deleted ${person.name}`)
      })
      .catch(() => {
        setPersons(persons.filter(p => p.id !== person.id))
        notify(
          `Information of ${person.name} has already been removed from server`,
          'error'
        )
      })
  }

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter value={filter} onChange={event => setFilter(event.target.value)} />
      <h3>Add a new</h3>
      <PersonForm
        onSubmit={addPerson}
        name={newName}
        onNameChange={event => setNewName(event.target.value)}
        number={newNumber}
        onNumberChange={event => setNewNumber(event.target.value)}
      />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} onDelete={deletePerson} />
    </div>
  )
}

export default App
