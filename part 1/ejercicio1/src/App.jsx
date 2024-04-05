import React from 'react'
import { Content, Header, Total } from './components'

const App = () => {
  const course = 'Half Stack application development'

  const parts = [
    {
      part: 'Fundamentals of React',
      exercises: 10,
    },
    {
      part: 'Using props to pass data',
      exercises: 7,
    },
    {
      part: 'State of a component',
      exercises: 14,
    }
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

export default App