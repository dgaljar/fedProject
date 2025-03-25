import React from "react";
import { useState, useContext } from "react";
import AuthContext from "../users/context/AuthProwider";

const AdminAddUser = () => {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roles, setRoles] = useState("subscriber");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { auth } = useContext(AuthContext);

  if(auth.role !== "administrator") {
    return;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      first_name,
      last_name,
      username,
      email,
      password,
      roles: [roles],
    };

    try {
      const token = auth.token;

      const response = await fetch(
        "https://frontend.internetskimarketing.eu/backend/wp-json/wp/v2/users",
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
        // Set JSX content for success message
        setMessage(
          <div className="alert alert-success mt-3">
            User Created Succesfully
          </div>
        );
      } else {
        // Set error message
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
      <div class="container-fluid content mt-4">
        <h2>Add User</h2>
        <div class="add-user-card">
          {message}
          <form onSubmit={handleSubmit} class="d-flex flex-column">
            <div class="d-flex flex-column flex-md-row align-items-center inputs">
              <label for="firstName">First name</label>
              <input
                type="text"
                placeholder="Enter first name"
                autocomplete="off"
                value={first_name}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div class="d-flex flex-column flex-md-row align-items-center inputs">
              <label for="lastname">Last name</label>
              <input
                type="text"
                placeholder="Enter last name"
                autocomplete="off"
                value={last_name}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div class="d-flex flex-column flex-md-row align-items-center inputs">
              <label for="email">
                Email <span class="asterix">*</span>
              </label>
              <input
                type="email"
                placeholder="example@example.com"
                autocomplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div class="d-flex flex-column flex-md-row align-items-center inputs">
              <label for="username">
                Username <span class="asterix">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter your username"
                autocomplete="off"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div class="d-flex flex-column flex-md-row align-items-center inputs">
              <label for="password">
                Password <span class="asterix">*</span>
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                autocomplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="d-flex flex-column flex-md-row align-items-center inputs">
              <label htmlFor="roles">
                Role <span className="asterix">*</span>
              </label>
              <select
                name="roles"
                id="roles"
                value={roles}
                onChange={(e) => setRoles(e.target.value)}
              >
                <option value="" disabled>
                  Select a role
                </option>{" "}
                {/* Prevent empty selection */}
                <option value="administrator">Administrator</option>
                <option value="subscriber">Subscriber</option>
              </select>
            </div>

            <button class="btn btn-primary mt-4 mx-auto mx-md-0" disabled={loading ? true : false}>
              {loading ? "Loading..." : "Create User"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminAddUser;
