import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { CountryInfo } from './components'

function App() {
  const [countries, setContries] = useState<Country[]>([])
  const [showCountry, setShowCountry] = useState<Country | null>(null)

  const [contry, setCountry] = useState('')

  useEffect(() => {
    (async () => {
      try {

        const res = await fetch('https://studies.cs.helsinki.fi/restcountries/api/all')

        const data = await res.json() as Country[]

        if (!res.ok) return

        setContries(data)

      } catch (error) {
        console.log(error)
      }
    })()
  }, [])

  const filterCountry = useMemo(() => {
    return contry.length === 0
      ? []
      : countries.filter(({ name }) => name.common.toLowerCase().includes(contry.toLowerCase()))
  }, [contry])

  const handleInputCountry = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setCountry(target.value)
  }


  const handleShowCountry = (nameCommon: string) => {
    const countryFound = filterCountry.find((c) => c.name.common === nameCommon)

    if (!countryFound) return

    setShowCountry(countryFound)
  }

  return (
    <>
      <h1>Country Finder</h1>

      <form>
        <div>
          <label htmlFor="find_countries">find countries </label>
          <input
            id="find_countries"
            type="text" value={contry}
            onChange={handleInputCountry} />
        </div>
      </form>

      {
        filterCountry.length > 10
          ? <p>Too many matches, specify another filter.</p>
          : filterCountry.length === 1
            ? <CountryInfo countryInfo={filterCountry[0]} />
            : showCountry
              ? <CountryInfo countryInfo={showCountry} />
              : filterCountry.map(({ name, area }) => (
                <div key={area}>
                  <p>{name.common}</p>
                  <button onClick={() => handleShowCountry(name.common)}>show</button>
                </div>
              ))
      }
    </>
  )
}

export default App
