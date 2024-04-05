import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { AnecdoteForm } from "./components/AnecdoteForm"
import { AnecdoteList } from "./components/AnecdoteList"
import { Filter } from "./components/Filter"
import { initializeAnedoctes } from "./store/thunks/anedoctesThunks"


const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnedoctes())
  }, [])


  return (
    <div>

      <h2>Anecdotes</h2>

      <Filter />

      <AnecdoteList />

      <AnecdoteForm />

    </div>
  )
}

export default App