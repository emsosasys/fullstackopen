interface FilterFormProps {
  filterWith: string
  handleFormInput: React.ChangeEventHandler<HTMLInputElement>
}

export const Filter: React.FC<FilterFormProps> = ({ filterWith, handleFormInput }) => {
  return (
    <div>
      filter shown with: <input name="filterWith" value={filterWith} onChange={handleFormInput} />
    </div>
  )
}
