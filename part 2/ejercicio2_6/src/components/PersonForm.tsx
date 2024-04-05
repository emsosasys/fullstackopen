interface PersonFormProps {
  name: string
  number: string
  handleFormInput: React.ChangeEventHandler<HTMLInputElement>
  handleNewPerson: (data: Person) => void
}

export const PersonForm: React.FC<PersonFormProps> = ({ name, number, handleNewPerson, handleFormInput }) => {

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const newPerson = {
      id: crypto.randomUUID(),
      name,
      number
    }

    handleNewPerson(newPerson)
  }

  return (
    <>
      <h2>Add a New</h2>

      <form onSubmit={onSubmit}>
        <div>
          name: <input name="name" value={name} onChange={handleFormInput} />
        </div>
        <div>
          number: <input name="number" value={number} onChange={handleFormInput} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}
