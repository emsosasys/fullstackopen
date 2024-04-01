import { Part } from "../components"

export const Content = ({ parts = [] }) => {
  return (
    <>
      {
        parts.map(({ part, exercises }) => (
          <Part key={part} part={part} exercises={exercises} />
        ))
      }
    </>
  )
}
