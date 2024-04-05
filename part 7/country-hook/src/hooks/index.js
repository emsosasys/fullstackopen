import { useEffect, useState } from "react"

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    fetch(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
      .then((res) => res.json())
      .then(setCountry)
  }, [name])

  return country
}
