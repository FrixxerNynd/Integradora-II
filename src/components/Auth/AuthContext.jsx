import React, { createContext, useContext, useState, useEffect } from "react";

// Se inicializa el contexto sin tipos, usualmente con null.
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    // Se elimina la información de tipo de los useState.
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState(null);
    const [token, setToken] = useState(null);

    // La lógica de useEffect no cambia en absoluto.
    useEffect(() => {
        let storedUser = localStorage.getItem('User');
        let storedToken = localStorage.getItem('Token');
    
        if (!storedToken) {
            storedUser = sessionStorage.getItem('User');
            storedToken = sessionStorage.getItem('Token');
        }
    
        if (storedToken) {
            setToken(storedToken);
        }
    
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
            } catch (error) {
                console.error('Error al parsear el usuario guardado:', error);
                localStorage.removeItem('User');
                localStorage.removeItem('Token');
                sessionStorage.removeItem('User');
                sessionStorage.removeItem('Token');
            }
        }
    }, []);

    // Se eliminan los tipos de los parámetros de la función.
    const login = (user, email, newToken, remember) => {
        if (remember) {
            localStorage.setItem('User', JSON.stringify(user));
            localStorage.setItem('Token', newToken);
        } else {
            sessionStorage.setItem('User', JSON.stringify(user));
            sessionStorage.setItem('Token', newToken);
        }
        setUser(user);
        setEmail(email);
        setToken(newToken);
    };

    const logout = () => {
        localStorage.removeItem('User');
        localStorage.removeItem('Token');
        sessionStorage.removeItem('User');
        sessionStorage.removeItem('Token');
        setUser(null);
        setEmail(null);
        setToken(null);
    };

    const isAuthenticated = !!token;

    return (
        <AuthContext.Provider value={{ user, email, token, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
}

// El custom hook 'useAuth' sigue funcionando de la misma manera.
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return context;
}