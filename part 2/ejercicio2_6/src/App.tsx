import { useEffect, useMemo, useState } from "react"
import { PersonForm, Filter, ListOfNumbers, Notification } from "./components"

const initialForm = {
  name: '',
  number: '',
  filterWith: ''
}


const App = () => {
  const [persons, setPersons] = useState<Person[]>([])

  const [isLoading, setIsLoading] = useState(false)

  const [formState, setFormState] = useState(initialForm)

  const [notification, setNotification] = useState<NotificationInfo>({ message: null, typeNotification: '' })

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('http://localhost:3001/api/persons')

        const data = await response.json()

        setPersons(data)

        setIsLoading(false)
      } catch (error) {
        setNotification({
          message: 'An error occurred while loading the numbers.',
          typeNotification: 'error'
        })
        setIsLoading(false)
      }
    })()

  }, [])

  const handleFormInput = (({ target }: React.ChangeEvent<HTMLInputElement>) => {

    const { name, value } = target

    setFormState((prev) => ({ ...prev, [name]: value }))
  })

  const handleNewPerson = (data: Person) => {
    if (!data.name || !data.number) return

    const existsPerson = persons.find((person) => person.name.toLowerCase() === data.name.toLowerCase())

    if (existsPerson?.number === data.number) {
      alert(`${existsPerson.name} is already exists in the phonebook`)
      return
    }

    if (existsPerson) {

      const question = window.confirm(`${existsPerson.name} is already added to phonebook, replace the old number with a new one?`)

      if (!question) return

      fetch(`http://localhost:3001/api/persons/${existsPerson.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: existsPerson.id, number: data.number })
      })
        .then((res) => {

          if (!res.ok && res.status === 404) {
            setNotification({
              message: `Information of ${existsPerson.name} has already been removed from server.`,
              typeNotification: 'error'
            })

            const result = persons.filter((person) => person.id !== existsPerson.id)

            setPersons(result)

            return
          }

          setNotification({ message: 'The phone number has been updated correctly.', typeNotification: 'success' })

          const updatePerson = persons.map((person) => person.id === existsPerson.id ? { ...person, number: data.number } : person)

          setPersons(updatePerson)
          setFormState(initialForm)
        })
        .catch((e) => setNotification({ message: e?.error as unknown as string ? e.error : 'An error occurred when updating the phone number.', typeNotification: 'error' }))

      return
    }

    fetch('http://localhost:3001/api/persons', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(() => {
        setNotification({ message: 'The phone number has been successfully created.', typeNotification: 'success' })

        setPersons((prev) => [...prev, data])

        setFormState(initialForm)
      })
      .catch(() => setNotification({ message: 'An error occurred when adding a new phone number.', typeNotification: 'error' }))
  }

  const filterPerson = useMemo(() => {
    return formState.filterWith.length === 0
      ? persons
      : persons.filter((person) => person.name.toLowerCase().includes(formState.filterWith.toLowerCase()))
  }, [formState.filterWith, persons])


  const handleDeletePerson = (id: string, name: string) => {

    const question = window.confirm(`Delete ${name} ? `)

    if (!question) return

    fetch(`http://localhost:3001/api/persons/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    })
      .then(() => {
        setNotification({ message: 'The phone number has been successfully deleted.', typeNotification: 'success' })

        const result = persons.filter((person) => person.id !== id)

        setPersons(result)
      })
      .catch(() => setNotification({ message: 'An error has occurred while deleting the phone number.', typeNotification: 'error' }))
  }


  const handleNotification = (data: NotificationInfo) => {
    setNotification(data)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification {...notification} handleNotification={handleNotification} />

      <Filter
        filterWith={formState.filterWith}
        handleFormInput={handleFormInput}
      />

      <PersonForm
        name={formState.name}
        number={formState.number}
        handleNewPerson={handleNewPerson}
        handleFormInput={handleFormInput}
      />

      <ListOfNumbers
        isLoading={isLoading}
        filterPerson={filterPerson}
        handleDeletePerson={handleDeletePerson}
      />

    </div>
  )
}

export default App