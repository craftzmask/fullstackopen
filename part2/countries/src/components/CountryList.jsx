import CountryDetail from "./CountryDetail";

const CountryList = ({ countries, selectedCountry, onShowClick }) => {
  if (countries.length === 1) {
    return <CountryDetail country={countries[0]} />;
  }

  if (countries.length > 10) {
    return <p>Too many matches, specify anther filter</p>;
  }

  return (
    <div>
      {countries.map((country) => {
        const countryName = country.name.common;
        return (
          <div key={country.name.official}>
            {countryName}{" "}
            <button onClick={() => onShowClick(countryName)}>Show</button>
            {selectedCountry === countryName && (
              <CountryDetail country={country} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CountryList;
