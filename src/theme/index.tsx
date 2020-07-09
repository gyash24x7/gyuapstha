import React, { createContext, ReactChild, useContext } from "react";
import { useLocalStorage } from "react-use";

export const light = "#F5F5F5";
export const dark = "#0A111F";
export const primary = "#FCA311";

export const lightThemeStyles = {
	backgroundColor: light,
	color: dark,
	primary
};

export const darkThemeStyles = {
	backgroundColor: dark,
	color: light,
	primary
};

export const getThemeStyles = (theme: string) =>
	theme === "dark" ? darkThemeStyles : lightThemeStyles;

const defaultThemeContext: [string, (theme: string) => void] = [
	"light",
	(theme: string) => {}
];

export const ThemeContext = createContext(defaultThemeContext);

export const useTheme = () => useContext(ThemeContext);

export interface ThemeProviderProps {
	children: ReactChild[];
}

export const ThemeProvider = ({ children }) => {
	const [theme, setTheme] = useLocalStorage("theme", "light");
	return (
		<ThemeContext.Provider value={[theme, setTheme]}>
			{children}
		</ThemeContext.Provider>
	);
};