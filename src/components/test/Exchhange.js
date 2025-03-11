// import React, { useState, useEffect } from "react";
// const Exchange = () => {
//     const hnb = [
//         {
//           "broj_tecajnice": "34",
//           "datum_primjene": "2025-02-18",
//           "drzava": "Australija",
//           "drzava_iso": "AUS",
//           "kupovni_tecaj": "1,648100",
//           "prodajni_tecaj": "1,643100",
//           "sifra_valute": "036",
//           "srednji_tecaj": "1,645600",
//           "valuta": "AUD"
//         },
//         {
//           "broj_tecajnice": "34",
//           "datum_primjene": "2025-02-18",
//           "drzava": "Kanada",
//           "drzava_iso": "CAN",
//           "kupovni_tecaj": "1,488300",
//           "prodajni_tecaj": "1,483900",
//           "sifra_valute": "124",
//           "srednji_tecaj": "1,486100",
//           "valuta": "CAD"
//         },
//         {
//           "broj_tecajnice": "34",
//           "datum_primjene": "2025-02-18",
//           "drzava": "Češka",
//           "drzava_iso": "CZE",
//           "kupovni_tecaj": "25,094000",
//           "prodajni_tecaj": "25,018000",
//           "sifra_valute": "203",
//           "srednji_tecaj": "25,056000",
//           "valuta": "CZK"
//         },
//         {
//           "broj_tecajnice": "34",
//           "datum_primjene": "2025-02-18",
//           "drzava": "Danska",
//           "drzava_iso": "DNK",
//           "kupovni_tecaj": "7,470900",
//           "prodajni_tecaj": "7,448500",
//           "sifra_valute": "208",
//           "srednji_tecaj": "7,459700",
//           "valuta": "DKK"
//         },
//         {
//           "broj_tecajnice": "34",
//           "datum_primjene": "2025-02-18",
//           "drzava": "Mađarska",
//           "drzava_iso": "HUN",
//           "kupovni_tecaj": "402,330000",
//           "prodajni_tecaj": "401,130000",
//           "sifra_valute": "348",
//           "srednji_tecaj": "401,730000",
//           "valuta": "HUF"
//         },
//         {
//           "broj_tecajnice": "34",
//           "datum_primjene": "2025-02-18",
//           "drzava": "Japan",
//           "drzava_iso": "JPN",
//           "kupovni_tecaj": "158,910000",
//           "prodajni_tecaj": "158,430000",
//           "sifra_valute": "392",
//           "srednji_tecaj": "158,670000",
//           "valuta": "JPY"
//         },
//         {
//           "broj_tecajnice": "34",
//           "datum_primjene": "2025-02-18",
//           "drzava": "Norveška",
//           "drzava_iso": "NOR",
//           "kupovni_tecaj": "11,659000",
//           "prodajni_tecaj": "11,624000",
//           "sifra_valute": "578",
//           "srednji_tecaj": "11,641500",
//           "valuta": "NOK"
//         },
//         {
//           "broj_tecajnice": "34",
//           "datum_primjene": "2025-02-18",
//           "drzava": "Švedska",
//           "drzava_iso": "SWE",
//           "kupovni_tecaj": "11,232800",
//           "prodajni_tecaj": "11,199200",
//           "sifra_valute": "752",
//           "srednji_tecaj": "11,216000",
//           "valuta": "SEK"
//         },
//         {
//           "broj_tecajnice": "34",
//           "datum_primjene": "2025-02-18",
//           "drzava": "Švicarska",
//           "drzava_iso": "CHE",
//           "kupovni_tecaj": "0,945400",
//           "prodajni_tecaj": "0,942600",
//           "sifra_valute": "756",
//           "srednji_tecaj": "0,944000",
//           "valuta": "CHF"
//         },
//         {
//           "broj_tecajnice": "34",
//           "datum_primjene": "2025-02-18",
//           "drzava": "Velika Britanija",
//           "drzava_iso": "GBR",
//           "kupovni_tecaj": "0,832580",
//           "prodajni_tecaj": "0,830080",
//           "sifra_valute": "826",
//           "srednji_tecaj": "0,831330",
//           "valuta": "GBP"
//         },
//         {
//           "broj_tecajnice": "34",
//           "datum_primjene": "2025-02-18",
//           "drzava": "SAD",
//           "drzava_iso": "USA",
//           "kupovni_tecaj": "1,048900",
//           "prodajni_tecaj": "1,045700",
//           "sifra_valute": "840",
//           "srednji_tecaj": "1,047300",
//           "valuta": "USD"
//         },
//         {
//           "broj_tecajnice": "34",
//           "datum_primjene": "2025-02-18",
//           "drzava": "Bosna i Hercegovina",
//           "drzava_iso": "BIH",
//           "kupovni_tecaj": "1,958760",
//           "prodajni_tecaj": "1,952900",
//           "sifra_valute": "977",
//           "srednji_tecaj": "1,955830",
//           "valuta": "BAM"
//         },
//         {
//           "broj_tecajnice": "34",
//           "datum_primjene": "2025-02-18",
//           "drzava": "Poljska",
//           "drzava_iso": "POL",
//           "kupovni_tecaj": "4,166700",
//           "prodajni_tecaj": "4,154300",
//           "sifra_valute": "985",
//           "srednji_tecaj": "4,160500",
//           "valuta": "PLN"
//         }
//       ]

//     return (
//         <>
//         <div className="container">
//             <table class="table table-dark">
//                 <thead>
//                   <tr>
//                     <th colspan="6" className="text-center">{hnb[0].datum_primjene}</th>
//                   </tr>
//                   <tr>
//                     <th>Drzava</th>
//                     <th>Drzava ISO</th>
//                     <th>Kupovni tecaj</th>
//                     <th>Prodajni tecaj</th>
//                     <th>Srednji tecaj</th>
//                     <th>Valuta</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {hnb.map((item) => (
//                     <tr>
//                       <td>{item.drzava}</td>
//                       <td>{item.drzava_iso}</td>
//                       <td>{item.kupovni_tecaj}</td>
//                       <td>{item.prodajni_tecaj}</td>
//                       <td>{item.srednji_tecaj}</td>
//                       <td>{item.valuta}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//             </table>
//         </div>
//         </>
//     )
// };
// export default Exchange;


import React, { useState, useEffect } from "react";
const Exchange = () => {
  const [currencyRates, setCurrencyRates] = useState({});
  const [amount, setAmount] = useState(1);
  const [currency, setCurrency] = useState("EUR");

  useEffect(() => {
    fetch("https://api.frankfurter.dev/v1/latest?base=" + currency)
      .then((response) => response.json())
      .then((data) => setCurrencyRates(data));
  }, [currency]);
  if (!currencyRates.rates) return <p>Učitavanje...</p>;
  return (
    <div className="container blog">
      <h1>Exchange Rates</h1>
      <div>
        <select
          name="currency"
          id="currency"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          {Object.keys(currencyRates.rates).map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        {Object.keys(currencyRates.rates).map((currency) => (
          <p key={currency}>
            <strong>{currency}:</strong>
            {currencyRates.rates[currency] * amount}
          </p>
        ))}
      </div>
    </div>
  );
};
export default Exchange;
