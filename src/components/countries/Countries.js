import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const Countries = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => setCountries(data));
  }, []);

  if(!countries) return <p>Učitavanje...</p>;

  return (
    <>
      <div className="container my-5">
        <div className="row gap-4">
        {countries.map((country) => (
            <div className="col-md-2 text-center" key={country.cca3} >
              <Link to={"/countries/" + country.cca3}>
                {country.name.common}
              </Link>
            </div>
        ))}
        </div>
      </div>
    </>
  );
};
export default Countries;
