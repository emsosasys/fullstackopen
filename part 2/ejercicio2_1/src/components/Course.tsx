import { useMemo } from 'react'
import type { CourseObj } from '../interfaces.ts'
import { Part } from './Part.tsx'

export const Course = ({ course }: { course: CourseObj }) => {

  const total = useMemo(() => {
    return course.parts.reduce((prev, acc) => (prev + acc.exercises), 0)
  }, [])

  return (
    <>
      <h1>{course.name}</h1>

      {
        course.parts.map((data) => (<Part key={data.id} {...data} />))
      }


      <strong>total of {total} exercises</strong>

    </>
  )
}
