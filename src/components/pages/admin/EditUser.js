import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom"; // ✅ Fix this import
import AuthContext from "../users/context/AuthProwider";

const EditUser = () => {
    const { id } = useParams(); // ✅ Get user ID from URL
    const { auth } = useContext(AuthContext);
    const [user, setUser] = useState(null);
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [roles, setRoles] = useState("subscriber");
    const [message, setMessage] = useState("");


  
    useEffect(() => {
      const fetchUser = async () => {
        try {
          const response = await fetch(
            `https://frontend.internetskimarketing.eu/backend/wp-json/wp/v2/users/${id}`,
            {
              headers: {
                "Authorization": `Bearer ${auth.token}`,
              },
            }
          );
  
          const data = await response.json();
          console.log("Fetched User Data:", data);
  
          if (response.ok) {
            setUser(data);
            setFirstName(data.first_name || "");
            setLastName(data.last_name || "");
            setUsername(data.username || "");
            setEmail(data.email || "");
            setRoles(data.acf?.api_user_roles || "subscriber"); 
          } else {
            setMessage(<div className="alert alert-danger">Error: {data.message}</div>);
          }
        } catch (error) {
          console.error("Error fetching user:", error);
          setMessage(<div className="alert alert-danger">Failed to fetch user.</div>);
        }
      };
  
      fetchUser();
    }, [id, auth.token]);

    if(id !== auth.id) {
      return;
    }
    
    const handleSubmit = async (e) => {
      e.preventDefault();
    
      const updatedUser = {
        first_name,
        last_name,
        username,
        acf: {
          api_user_roles: roles,
        },
      };
    
      try {
        const response = await fetch(
          `https://frontend.internetskimarketing.eu/backend/wp-json/wp/v2/users/${id}`,
          {
            method: "PUT", // Use PUT for updating
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${auth.token}`,
            },
            body: JSON.stringify(updatedUser),
          }
        );
    
        const data = await response.json();
    
        console.log("API Response Data:", data); // Log the response data for debugging
    
        if (response.ok) {
          setMessage(
            <div className="alert alert-success mt-3">
              User Updated Successfully!
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
          <h2>Edit User</h2>
          {message}
          <div className="add-user-card">
            {user ? (
              <form onSubmit={handleSubmit} className="d-flex flex-column">
                <div className="d-flex flex-column flex-md-row align-items-center inputs">
                  <label htmlFor="firstName">First name</label>
                  <input
                    type="text"
                    placeholder="Enter first name"
                    value={first_name}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="d-flex flex-column flex-md-row align-items-center inputs">
                  <label htmlFor="lastName">Last name</label>
                  <input
                    type="text"
                    placeholder="Enter last name"
                    value={last_name}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <div className="d-flex flex-column flex-md-row align-items-center inputs">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    placeholder="example@example.com"
                    value={email || user.acf.api_user_email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled
                  />
                </div>
                <div className="d-flex flex-column flex-md-row align-items-center inputs">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="d-flex flex-column flex-md-row align-items-center inputs">
                  <label htmlFor="roles">Role</label>
                  <select
                    name="roles"
                    value={roles}
                    onChange={(e) => setRoles(e.target.value)}
                  >
                    <option value="administrator">Administrator</option>
                    <option value="subscriber">Subscriber</option>
                  </select>
                </div>
                <button className="btn btn-primary mt-4 mx-auto mx-md-0">Update User</button>
              </form>
            ) : (
              <p>Loading user data...</p>
            )}
          </div>
        </div>
      </>
    );
  };
  
  export default EditUser;
  


