import { useMemo } from "react"

export const Total = ({ parts = [] }) => {

  const total = useMemo(() => {
    return parts.reduce((prev, acc) => {
      return prev + acc.exercises
    }, 0)
  }, [])

  console.log(total)

  return (
    <p>Number of exercises {total}</p>
  )
}
