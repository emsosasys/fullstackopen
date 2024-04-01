export const CountryInfo = ({ countryInfo }: { countryInfo: Country }) => {
  return (
    <>

      <h1> {countryInfo.name.common} </h1>

      <p> capital {countryInfo.capital}</p>
      <p> area {countryInfo.area}</p>

      <h1>languages</h1>
      <ul>
        {
          Object.values(countryInfo.languages).map((language) => (<li key={language}>{language}</li>))
        }
      </ul>

      <img src={countryInfo.flags.png} alt={countryInfo.flags.alt} />
    </>
  )
}
