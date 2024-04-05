import { useState } from "react"

export const useForm = (initialFormState = {}) => {
  const [formState, setFormState] = useState(initialFormState)

  const handleInputChange = ({ target }) => {
    const { value, name } = target

    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const resetForm = () => {
    setFormState(initialFormState)
  }

  return {
    formState,
    handleInputChange,
    resetForm
  }
}
