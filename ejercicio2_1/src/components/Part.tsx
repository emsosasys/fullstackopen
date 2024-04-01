interface PartsProps {
  name: string,
  exercises: number
}

export const Part: React.FC<PartsProps> = ({ name, exercises }) => {
  return (
    <p>{name} {exercises}</p>
  )
}
