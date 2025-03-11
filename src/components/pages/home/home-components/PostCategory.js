import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PostCategory = ({ id }) => {
  const [category, setCategory] = useState(null);

  useEffect(() => {
    if (!id) return;

    fetch(
      `https://frontend.internetskimarketing.eu/backend/wp-json/wp/v2/categories/${id}`
    )
      .then((response) => response.json())
      .then((data) => setCategory(data));
  }, [id]);

  if (!category)
    return (
        <Link className="btn" to={`/category/`}>Category</Link>

    );

  return (
    <>
        <Link className="btn" to={`/category/` + category.name}>{category.name}</Link>
    </>
  );
};

export default PostCategory;
