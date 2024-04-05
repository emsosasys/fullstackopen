export interface Parts {
  name: string
  exercises: number
  id: number
}

export interface CourseObj {
  id: number,
  name: string
  parts: Parts[]
}