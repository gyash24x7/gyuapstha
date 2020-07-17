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

export const getToolData = (filename: string) => {
	let title = "SCSS";
	let href = "https://sass-lang.com";

	switch (filename) {
		case "apollo-logo-light":
		case "apollo-logo":
			title = "Apollo";
			href = "https://apollographql.com";
			break;
		case "css-logo":
			title = "CSS3";
			href = "https://www.w3.org/Style/CSS/";
			break;
		case "emotion-logo":
			title = "Emotion";
			href = "https://emotion.sh";
			break;
		case "expo-logo":
			title = "Expo";
			href = "https://expo.io";
			break;
		case "graphql-logo":
			title = "GraphQL";
			href = "https://graphql.org";
			break;
		case "gatsby-logo":
			title = "Gatsby";
			href = "https://gatsbyjs.org";
			break;
		case "html-logo":
			title = "HTML5";
			href = "https://html5.org";
			break;
		case "ionic-logo":
			title = "Ionic";
			href = "https://ionicframework.com";
			break;
		case "mongo-logo":
		case "mongo-logo-light":
			title = "MongoDB";
			href = "https://mongodb.com";
			break;
		case "nestjs-logo":
			title = "NestJS";
			href = "https://nestjs.com";
			break;
		case "nextjs-logo":
		case "nextjs-logo-light":
			title = "NextJS";
			href = "https://nextjs.org";
			break;
		case "nodejs-logo":
		case "nodejs-logo-light":
			title = "NodeJS";
			href = "https://nodejs.org";
			break;
		case "postgres-logo":
			title = "Postgres";
			href = "https://postgresql.org";
			break;
		case "react-logo":
			title = "ReactJS";
			href = "https://reactjs.org";
			break;
		case "redux-logo":
			title = "Redux";
			href = "https://redux.js.org";
			break;
		case "webpack-logo":
			title = "Webpack";
			href = "https://webpack.js.org";
			break;
	}

	return { href, title };
};

const priorityToolsArray = [
	"react-logo",
	"nodejs-logo",
	"nodejs-logo-light",
	"nestjs-logo",
	"nextjs-logo",
	"nextjs-logo-light",
	"graphql-logo",
	"apollo-logo",
	"apollo-logo-light",
	"gatsby-logo",
	"expo-logo",
	"html-logo",
	"css-logo",
	"scss-logo",
	"emotion-logo",
	"redux-logo",
	"webpack-logo",
	"ionic-logo",
	"mongo-logo-light",
	"mongo-logo",
	"postgres-logo"
];

export const compareToolPriority = (a: any, b: any) => {
	return (
		priorityToolsArray.indexOf(a.node.name) -
		priorityToolsArray.indexOf(b.node.name)
	);
};
