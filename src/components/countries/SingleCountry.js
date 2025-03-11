import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
const SingleCountry = () => {
  const { name } = useParams();
  const [country, setCountry] = useState([]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/alpha/" + name)
      .then((response) => response.json())
      .then((data) => setCountry(data));
  },[name]);

  if(!country) return <p>Učitavanje...</p>;

  return (
    <>
      <div className="countainer text-center">
        {country.map((item) => (
          <div key={item.cca3}>
            <h1 dangerouslySetInnerHTML={{ __html: item.name.official }} />
            <img src={item.flags.svg} alt={item.name.official} />
            <p>
              <strong>Capital:</strong> {item.capital}
            </p>
            <p>
              <strong>Language:</strong> {Object.keys(item.languages).map((lang) => item.languages[lang]).join(", ")}
            </p>
            <p>
              <strong>Currency:</strong> {Object.keys(item.currencies).map((detail) => (
                <span key={detail}>
                    <span>{item.currencies[detail].name}</span>
                    <span> {item.currencies[detail].symbol}</span>
                </span>
                
              ))}
            </p>
           <a href={item.maps.googleMaps}>GoogleMaps</a>
          </div>
        ))}
      </div>
    </>
  );
};

export default SingleCountry;
