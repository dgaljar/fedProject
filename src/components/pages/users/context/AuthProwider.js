import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(() => {
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("username");
        const storedEmail = localStorage.getItem("email"); // Get stored email
        const storedRole = localStorage.getItem("role");
        const storedID = localStorage.getItem("user_id");

        return storedToken
            ? { token: storedToken, user: storedUser, email: storedEmail, role: storedRole, id: storedID }
            : {};
    });

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
