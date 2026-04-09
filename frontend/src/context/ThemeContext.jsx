import {createContext, useContext, useState, useEffect, useCallback } from 'react';

const ThemeContext = createContext(null);

export function ThemeProvider({children}) {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');


    useEffect(() => {
        document.body.classList.remove('light', 'dark')
        document.body.classList.add(theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = useCallback(() => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    }, []);

    return (
        <ThemeContext.Provider value={{theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};


export function useTheme() {
    return useContext(ThemeContext);
};