import {createContext} from "react";

const storedLocale = localStorage.getItem('locale');
const defaultLocale = storedLocale || 'ru';

export const AuthContext = createContext(null);

export const LocaleContext = createContext({
    locale: defaultLocale,
    setLocale: (newLocale) => {
        localStorage.setItem('locale', newLocale);
    }
});