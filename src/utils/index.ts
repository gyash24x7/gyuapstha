import { createContext } from "react";

export interface ThemeColors {
	primary: string;
	bgColor: string;
	fgColor: string;
}

export interface Theme {
	isDark: boolean;
	colors: ThemeColors;
}

export const lightThemeColors: ThemeColors = {
	primary: "#00a9a5",
	fgColor: "#0a111f",
	bgColor: "#f5f5f5"
};

export const darkThemeColors: ThemeColors = {
	primary: "#00a9a5",
	bgColor: "#0a111f",
	fgColor: "#f5f5f5"
};

export interface IThemeContext {
	isDark: boolean;
	colors: ThemeColors;
	setTheme: (theme: Theme) => void;
}

export const ThemeContext = createContext<IThemeContext>({
	colors: lightThemeColors,
	setTheme: () => {},
	isDark: false
});

export const ThemeProvider = ThemeContext.Provider;
