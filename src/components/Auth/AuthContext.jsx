import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState(null);
    const [token, setToken] = useState(null);
    const [rol, setRol] = useState(null);

    useEffect(() => {
        let storedUser = localStorage.getItem('User');
        let storedEmail = localStorage.getItem('Email');
        let storedToken = localStorage.getItem('Token');
        let storedRol = localStorage.getItem('Rol');
    
        if (!storedToken) {
            storedUser = sessionStorage.getItem('User');
            storedEmail = sessionStorage.getItem('Email');
            storedToken = sessionStorage.getItem('Token');
            storedRol = sessionStorage.getItem('Rol');
        }
    
        if (storedToken) {
            setToken(storedToken);
            setRol(storedRol);
        }
    
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
            } catch (error) {
                console.error('Error al parsear el usuario guardado:', error);
                localStorage.removeItem('User');
                localStorage.removeItem('Email');
                localStorage.removeItem('Token');
                localStorage.removeItem('Rol');
                sessionStorage.removeItem('User');
                sessionStorage.removeItem('Email');
                sessionStorage.removeItem('Token');
                sessionStorage.removeItem('Rol');
            }
        }
    }, []);

    const login = (user, email, newToken, remember) => {
        if (remember) {
            localStorage.setItem('User', JSON.stringify(user));
            localStorage.setItem('Email', email);
            localStorage.setItem('Token', newToken);
            localStorage.setItem('Rol', user.rol);
        } else {
            sessionStorage.setItem('User', JSON.stringify(user));
            sessionStorage.setItem('Email', email);
            sessionStorage.setItem('Token', newToken);
            sessionStorage.setItem('Rol', user.rol);
        }
        setUser(user);
        setEmail(email);
        setToken(newToken);
    };

    const logout = () => {
        localStorage.removeItem('User');
        localStorage.removeItem('Email');
        localStorage.removeItem('Token');
        localStorage.removeItem('Rol');
        sessionStorage.removeItem('User');
        sessionStorage.removeItem('Email');
        sessionStorage.removeItem('Token');
        sessionStorage.removeItem('Rol');
        setUser(null);
        setEmail(null);
        setToken(null);
    };

    const isAuthenticated = !!token;

    return (
        <AuthContext.Provider value={{ user, email, token, rol, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return context;
}