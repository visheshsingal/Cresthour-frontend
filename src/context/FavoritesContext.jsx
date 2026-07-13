'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext(null);

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const savedFavorites = localStorage.getItem('favorites');
        setFavorites(savedFavorites ? JSON.parse(savedFavorites) : []);
        setIsHydrated(true);
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined' || !isHydrated) return;
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites, isHydrated]);

    const addToFavorites = (product) => {
        if (!favorites.find(item => item._id === product._id)) {
            setFavorites([...favorites, product]);
        }
    };

    const removeFromFavorites = (productId) => {
        setFavorites(favorites.filter(item => item._id !== productId));
    };

    const isFavorite = (productId) => {
        return favorites.some(item => item._id === productId);
    };

    const toggleFavorite = (product) => {
        if (isFavorite(product._id)) {
            removeFromFavorites(product._id);
        } else {
            addToFavorites(product);
        }
    };

    return (
        <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites, isFavorite, toggleFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (!context) {
        return {
            favorites: [],
            addToFavorites: () => {},
            removeFromFavorites: () => {},
            isFavorite: () => false,
            toggleFavorite: () => {},
        };
    }
    return context;
};
