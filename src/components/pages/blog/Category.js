import React, { useEffect, useState } from "react";
import "./Category.css";
import Loading from "../home/home-components/Loading.js";
import PostCardDos from "../home/home-components/PostCardDos.js";
import Pagination from "../../services/Pagination.js";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [postsByCategory, setPostsByCategory] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null); // Store slugs, not IDs
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [postsLoading, setPostsLoading] = useState(false);
  const [count, setCount] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch categories on mount
  useEffect(() => {
    fetch(
      "https://frontend.internetskimarketing.eu/backend/wp-json/wp/v2/categories?per_page=100"
    )
      .then((response) => response.json())
      .then((data) => {
        const categoriesWithPosts = data.filter((cat) => cat.count > 0);
        setCategories(categoriesWithPosts);
        if (categoriesWithPosts.length > 0)
          setSelectedCategory(categoriesWithPosts[0].slug); 
        setCategoriesLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!selectedCategory) return;

    setPostsLoading(true);
    fetch(
      `https://frontend.internetskimarketing.eu/backend/wp-json/custom/v1/post-details?category=${selectedCategory}&per_page=6&page=${count}`
    )
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        const totalPagesHeader = response.headers.get("X-WP-TotalPages");
        if (totalPagesHeader) setTotalPages(Number(totalPagesHeader));
        return response.json();
      })
      .then((postsData) => {
        setPostsByCategory((prevPosts) => ({
          ...prevPosts,
          [selectedCategory]: postsData.posts,
        }));
        setPostsLoading(false);
      })
      .catch((error) => {
        console.error(
          "Error fetching posts for category",
          selectedCategory,
          error
        );
        setPostsLoading(false);
      });
  }, [selectedCategory, count]);

  const handlePageClick = (pageNumber) => {
    setCount(pageNumber);
    const postsSection = document.getElementById("posts");
    if (postsSection) {
      postsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCategoryChange = (e) => {
    const newCategorySlug = e.target.value; 
    setSelectedCategory(newCategorySlug); 
    setCount(1); 
  };

  return (
    <section id="posts" className="posts fullH">
      <div className="container mb-3">
        <div className="row mb-4">
          <div className="text-center d-flex flex-column align-items-center">
            <label htmlFor="categories">Select Category</label>
            {categoriesLoading ? (
              <div>Loading categories...</div>
            ) : (
              <select
                value={selectedCategory || ""}
                name="categories"
                id="categories"
                onChange={handleCategoryChange}
                className="postSelect"
              >
                {categories.map((catItem) => (
                  <option
                    className="selector"
                    key={catItem.id}
                    value={catItem.slug}
                  >
                    {catItem.name}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>
        <div className="row g-3">
          {postsLoading ? (
            <Loading />
          ) : selectedCategory &&
            postsByCategory[selectedCategory] &&
            postsByCategory[selectedCategory].length > 0 ? (
            postsByCategory[selectedCategory].map((post) => (
              <PostCardDos key={post.id} post={post} />
            ))
          ) : (
            <div className="text-center">No posts available for this category.</div>
          )}
        </div>
        <Pagination
          currentPage={count}
          totalPages={totalPages}
          onPageChange={handlePageClick}
        />
      </div>
    </section>
  );
};

export default Category;
