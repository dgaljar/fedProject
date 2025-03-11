import React, { useEffect, useState } from "react";
import "./Kontakt.css";

const Kontakt = () => {

      const [page, setPage] = useState(null);
    
      useEffect(() => {
        fetch(
          "https://frontend.internetskimarketing.eu/backend/wp-json/wp/v2/pages/478"
        )
          .then((response) => response.json())
          .then((json) => {setPage(json)});
      }, []);

      if(!page) return <p>Učitavanje...</p>

  return (
    <>
        <div dangerouslySetInnerHTML={{__html: page.content.rendered}} />
    </>
  );
};

export default Kontakt;
