import { useMemo } from "react"
import { StatisticLine } from "./StatisticLine"

export const Statistics = ({ good, neutral, bad }) => {
  const total = useMemo(() => {
    return (good + neutral + bad)
  }, [good, neutral, bad])

  const average = useMemo(() => {
    return (neutral + bad) / 6
  }, [good, neutral, bad])

  const positive = useMemo(() => {
    return good > 0 ? (good / total) * 100 : 0
  }, [good, total])

  return (
    <>
      <h1>Statistics</h1>
      <table>
        <StatisticLine text='good' value={good} />
        <StatisticLine text='neutral' value={neutral} />
        <StatisticLine text='bad' value={bad} />
        <StatisticLine text='all' value={total} />
        <StatisticLine text='average' value={average} />
        <StatisticLine text='positive' value={`${positive} %`} />
      </table>
    </>
  )
}
