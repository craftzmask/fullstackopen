import { useEffect, useState } from "react";
import axios from "axios";
import CountryList from "./components/CountryList";

function App() {
  const [countries, setCountries] = useState([]);
  const [keyword, setKeyword] = useState("");
  const filteredCountries = countries.filter((country) => {
    const name = country.name.common.toLowerCase();
    return keyword.length > 0 && name.includes(keyword.toLowerCase());
  });

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => setCountries(response.data));
  }, []);

  return (
    <>
      <div>
        <div>
          find countries{" "}
          <input
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
          />
        </div>
        <CountryList countries={filteredCountries} />
      </div>
    </>
  );
}

export default App;
