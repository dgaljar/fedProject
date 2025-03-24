import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AdminCategories = () => {
  const [categoreis, setCategories] = useState([]);

  useEffect(() => {
    fetch(
      "https://frontend.internetskimarketing.eu/backend/wp-json/wp/v2/categories"
    )
      .then((response) => response.json())
      .then((data) => setCategories(data));
  });

  return (
    <>
      <div className="container-fluid content mt-4">
        <h1 className="h2">Categories</h1>
        <div className="row">
          {categoreis.map((cat) => (
            <div className="col-md-3 mb-3">
              <div className="user-card">
                <h3>{cat.name}</h3>
                <p className="small">Category ID: {cat.id}</p>
                <span>
                  Posts in category:{" "}
                  <Link to={`/category/${cat.slug}`}>{cat.count}</Link>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminCategories;
