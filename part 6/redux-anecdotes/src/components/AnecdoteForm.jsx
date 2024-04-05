import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createAnedocte } from '../store/thunks/anedoctesThunks'

export const AnecdoteForm = () => {
  const [anecdote, setAnecdote] = useState('')

  const dispatch = useDispatch()

  const handleSubmitForm = async (e) => {
    e.preventDefault()

    dispatch(createAnedocte(anecdote))

    setAnecdote('')
  }

  return (
    <div>
      <h2>create new</h2>

      <form onSubmit={handleSubmitForm}>
        <div>
          <input value={anecdote} onChange={(e) => setAnecdote(e.target.value)} />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}
