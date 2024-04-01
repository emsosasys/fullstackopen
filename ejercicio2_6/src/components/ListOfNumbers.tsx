
interface ListOfNumbersProps {
  isLoading: boolean,
  filterPerson: Person[]
  handleDeletePerson: (id: string, name: string) => void
}

export const ListOfNumbers: React.FC<ListOfNumbersProps> = ({ filterPerson = [], isLoading, handleDeletePerson }) => {
  return (
    <>
      <h2>Numbers</h2>

      {filterPerson.length === 0 && <p>Empty</p>}

      {
        isLoading
          ? <>Loading...</>
          : filterPerson.map(({ id, name, number }) => (
            <div key={id}>

              <p>{name} {number}</p>

              <button onClick={() => handleDeletePerson(id, name)}>delete</button>
            </div>
          ))
      }
    </>
  )
}