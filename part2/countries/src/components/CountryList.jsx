import CountryDetail from "./CountryDetail";

const CountryList = ({ countries }) => {
  if (countries.length === 1) {
    return <CountryDetail country={countries[0]} />;
  }

  if (countries.length > 10) {
    return <p>Too many matches, specify anther filter</p>;
  }

  return (
    <div>
      {countries.map((country) => (
        <div key={country.name.official}>{country.name.common}</div>
      ))}
    </div>
  );
};

export default CountryList;
