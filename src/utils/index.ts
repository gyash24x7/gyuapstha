import { createContext } from "react";
import Facebook from "../assets/icons/facebook.svg";
import Github from "../assets/icons/github.svg";
import Instagram from "../assets/icons/instagram.svg";
import LinkedIn from "../assets/icons/linkedin.svg";
import Twitter from "../assets/icons/twitter.svg";

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

export const getHandleDetails = (handle: string, metaData: any) => {
	switch (handle) {
		case "facebook":
			return {
				link: metaData?.siteMetadata?.social?.facebook,
				Component: Facebook
			};
		case "twitter":
			return {
				link: metaData?.siteMetadata?.social?.twitter,
				Component: Twitter
			};
		case "linkedin":
			return {
				link: metaData?.siteMetadata?.social?.linkedin,
				Component: LinkedIn
			};
		case "instagram":
			return {
				link: metaData?.siteMetadata?.social?.instagram,
				Component: Instagram
			};
		default:
			return {
				link: metaData?.siteMetadata?.social?.github,
				Component: Github
			};
	}
};
