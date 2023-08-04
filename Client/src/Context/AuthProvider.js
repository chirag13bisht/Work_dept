import { createContext, useState,useEffect } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(() => {
       
        const storedAuthData = localStorage.getItem("authData");
        return storedAuthData ? JSON.parse(storedAuthData) : {};
      });
    
      useEffect(() => {
        localStorage.setItem("authData", JSON.stringify(auth));
      }, [auth]);
    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;