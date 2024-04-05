import { useSelector, useDispatch } from 'react-redux'

export const AnecdoteList = () => {

  const anecdotes = useSelector(state => {
    return state.filter.trim() === ''
      ? state.anedoctes
      : state.anedoctes.filter((anedocte) => anedocte.content.toLowerCase().includes(state.filter.toLowerCase()))
  })

  const dispatch = useDispatch()

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(updateVotes(anecdote.id))}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}
