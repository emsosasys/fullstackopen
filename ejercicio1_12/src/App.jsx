import { useMemo } from 'react'
import { useState } from 'react'

const data = [
  {
    id: 1,
    anecdote: 'If it hurts, do it more often.',
    vote: 2
  },
  {
    id: 2,
    anecdote: 'Adding manpower to a late software project makes it later!',
    vote: 5
  },
  {
    id: 3,
    anecdote: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    vote: 0
  },
  {
    id: 4,
    anecdote: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    vote: 0
  },
  {
    id: 5,
    anecdote: 'Premature optimization is the root of all evil.',
    vote: 0
  },
  {
    id: 6,
    anecdote: 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    vote: 0
  },
  {
    id: 7,
    anecdote: 'The only way to go fast, is to go well.',
    vote: 0
  },
]

function App() {
  const [anecdotes, setAnecdotes] = useState(data)
  const [select, setSelect] = useState(0)

  const handleVote = (id) => {
    const updated = anecdotes.map((item) => item.id === id ? { ...item, vote: item.vote + 1 } : item)
    setAnecdotes(updated)
  }

  const mostVotes = useMemo(() => {
    return [...anecdotes].sort((a, b) => b.vote - a.vote)
  }, [anecdotes])

  return (
    <>
      <h1>Anecdote of the day</h1>

      <p>
        {anecdotes[select].anecdote}

        <span> has {anecdotes[select].vote} votes</span>
      </p>

      <button onClick={() => handleVote(anecdotes[select].id)}>vote</button>

      <button onClick={() => setSelect(select < anecdotes.length - 1 ? select + 1 : select)}>next anecdote</button>

      <h1>Anecdote with most votes</h1>

      <p>
        {mostVotes[0].anecdote}

        <span> has {mostVotes[0].vote} votes</span>
      </p>
    </>
  )
}

export default App
