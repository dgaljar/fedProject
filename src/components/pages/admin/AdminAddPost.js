import React, { useState, useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import QuillEditor from "./Editor"; // Make sure this is correctly imported
import AuthContext from "../users/context/AuthProwider";

const AdminAddPost = () => {
  const [message, setMessage] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const { auth } = useContext(AuthContext);
  const date = new Date().toISOString();
  const [form, setForm] = useState({
    title: "",
    status: "publish",
    author: auth.id,
    date: "" || date,
    content: "",
    category: "",
    tags: "",
  });

  // ✅ Standard input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: name === "date" && !value ? date : value, // Use selected date if provided, else use default date
    }));
  };

  const handleQuillChange = (content) => {
    setForm((prevForm) => ({
      ...prevForm,
      content: content, // Only update the content field
    }));
  };



  useEffect(() => {
    fetch(
      "https://frontend.internetskimarketing.eu/backend/wp-json/wp/v2/categories"
    )
      .then((response) => response.json())
      .then((data) => setCategories(data));
  }, []);

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        "https://frontend.internetskimarketing.eu/backend/wp-json/wp/v2/media",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${auth.token}`, // Ensure you send the auth token
          },
          body: formData,
        }
      );

      const data = await response.json();
      if (response.ok) {
        return data.id; // Return the ID of the uploaded media
      } else {
        console.error("Error uploading image", data);
      }
    } catch (error) {
      console.error("Error uploading image", error);
    }
  };

  if (auth.role === "subscriber") {
    return <Navigate to="/admin" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formattedDate = new Date(form.date).toISOString();
    const authorId = auth.id; // Replace with actual user ID

    // Upload the image
    const imageFile = document.getElementById("featured-image").files[0]; // Get file from input field
    let imageId = null;
    if (imageFile) {
      imageId = await uploadImage(imageFile); // Upload the image and get the ID
    }

    const payload = {
      title: form.title,
      content: form.content,
      status: form.status,
      date: formattedDate,
      author: authorId,
      categories: [form.category], 
      featured_media: imageId,
    };

    try {
      const token = auth.token;

      const response = await fetch(
        "https://frontend.internetskimarketing.eu/backend/wp-json/wp/v2/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();
      setLoading(false);
      if (response.ok) {
        setMessage(
          <div className="alert alert-success mt-3">
            Post Created Successfully
          </div>
        );
        
      } else {
        setMessage(
          <div className="alert alert-danger mt-3">Error: {data.message}</div>
        );
      }
    } catch (error) {
      setMessage(
        <div className="alert alert-danger mt-3">Error: {error.message}</div>
      );
    }
  };

  return (
    <>
      <div className="container-fluid content mt-4">
        <h2>Add Post</h2>
        <div className="add-user-card">
          {message}
          <form onSubmit={handleSubmit} className="d-flex flex-column">
            {/* ✅ Fix: Add "name" attribute to input */}
            <div className="d-flex flex-column flex-md-row align-items-center inputs">
              <label htmlFor="title">
                Title <span className="asterix">*</span>
              </label>
              <input
                type="text"
                placeholder="Title"
                id="title"
                name="title" // ✅ Add this
                onChange={handleChange}
                value={form.title}
              />
            </div>

            <div className="d-flex flex-column flex-md-row align-items-center inputs">
              <label htmlFor="category">
                Category <span className="asterix">*</span>
              </label>
              <select
                name="category"
                id="category"
                onChange={handleChange}
                value={form.category}
                required
              >
                {categories.map((cat) => (
                  <option value={cat.id} key={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* <div className="d-flex align-items-center inputs">
              <label htmlFor="tags">
                Tags <span className="asterix">*</span>
              </label>
              <input
                placeholder="Tags"
                name="tags"
                id="tags"
                onChange={handleChange}
                value={form.tags}
              />
            </div> */}

            <div className="d-flex flex-column flex-md-row align-items-center inputs">
              <label htmlFor="date">
                Date <span className="asterix">*</span>
              </label>
              <input
                id="date"
                name="date" // ✅ Fix: Add name attribute
                onChange={handleChange}
                value={form.date}
                type="date"
                placeholder="Select date"
              />
            </div>

            <div className="d-flex flex-column flex-md-row align-items-center inputs">
              <label htmlFor="featured-image">
                Featured Image <span className="asterix">*</span>
              </label>
              <input
                type="file"
                id="featured-image"
                name="featured-image"
                accept="image/*"
              />
            </div>

            {/* ✅ Fix: Pass custom content handler to Quill */}
            <div className="d-flex flex-column flex-md-row align-items-center align-items-md-start inputs">
              <label htmlFor="content">
                Content <span className="asterix">*</span>
              </label>
              <QuillEditor
                value={form.content} // Pass value to sync with Quill
                onChange={handleQuillChange} // Update form state
              />
            </div>

            <button type="submit" className="btn mx-auto mx-md-0" disabled={loading ? true : false}>
              {loading ? "Loading..." : "Create Post"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminAddPost;
