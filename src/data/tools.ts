/** The toolbox, from v1's getToolData() and priorityToolsArray (src/utils/index.ts). */

export interface Tool {
	/** File name in src/assets/images, without extension */
	file: string;
	title: string;
	href: string;
	/** Logos drawn for one background: "light" ones show on the dark theme and vice versa */
	theme?: "light" | "dark";
}

/** In v1's display order */
export const tools: Tool[] = [
	{ file: "react-logo", title: "ReactJS", href: "https://reactjs.org" },
	{ file: "nodejs-logo", title: "NodeJS", href: "https://nodejs.org", theme: "light" },
	{ file: "nodejs-logo-light", title: "NodeJS", href: "https://nodejs.org", theme: "dark" },
	{ file: "nestjs-logo", title: "NestJS", href: "https://nestjs.com" },
	{ file: "nextjs-logo", title: "NextJS", href: "https://nextjs.org", theme: "light" },
	{ file: "nextjs-logo-light", title: "NextJS", href: "https://nextjs.org", theme: "dark" },
	{ file: "graphql-logo", title: "GraphQL", href: "https://graphql.org" },
	{ file: "apollo-logo", title: "Apollo", href: "https://apollographql.com", theme: "light" },
	{ file: "apollo-logo-light", title: "Apollo", href: "https://apollographql.com", theme: "dark" },
	{ file: "gatsby-logo", title: "Gatsby", href: "https://gatsbyjs.org" },
	{ file: "expo-logo", title: "Expo", href: "https://expo.io" },
	{ file: "html-logo", title: "HTML5", href: "https://html5.org" },
	{ file: "css-logo", title: "CSS3", href: "https://www.w3.org/Style/CSS/" },
	{ file: "scss-logo", title: "SCSS", href: "https://sass-lang.com" },
	{ file: "emotion-logo", title: "Emotion", href: "https://emotion.sh" },
	{ file: "redux-logo", title: "Redux", href: "https://redux.js.org" },
	{ file: "webpack-logo", title: "Webpack", href: "https://webpack.js.org" },
	{ file: "ionic-logo", title: "Ionic", href: "https://ionicframework.com" },
	{ file: "postgres-logo", title: "Postgres", href: "https://postgresql.org" },
	{ file: "mongo-logo-light", title: "MongoDB", href: "https://mongodb.com", theme: "dark" },
	{ file: "mongo-logo", title: "MongoDB", href: "https://mongodb.com", theme: "light" }
];
