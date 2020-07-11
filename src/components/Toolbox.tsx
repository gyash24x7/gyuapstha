/**@jsx jsx */
import { css, jsx } from "@emotion/core";
import { useWindowSize } from "react-use";
import ApolloLightLogo from "../images/apollo-logo-light.png";
import ApolloLogo from "../images/apollo-logo.png";
import CssLogo from "../images/css-logo.png";
import EmotionLogo from "../images/emotion-logo.png";
import ExpoLogo from "../images/expo-logo.png";
import GatsbyLogo from "../images/gatsby-logo.png";
import GraphQlLogo from "../images/graphql-logo.png";
import HtmlLogo from "../images/html-logo.png";
import IonicLogo from "../images/ionic-logo.png";
import MongoLightLogo from "../images/mongo-logo-light.png";
import MongoLogo from "../images/mongodb-logo.png";
import NestLogo from "../images/nestjs-logo.png";
import NextLightLogo from "../images/nextjs-logo-light.png";
import NextLogo from "../images/nextjs-logo.png";
import NodeLogo from "../images/nodejs-logo.png";
import PostgresLogo from "../images/postgres-logo.png";
import ReactLogo from "../images/react-logo.png";
import ReduxLogo from "../images/redux-logo.png";
import ScssLogo from "../images/scss-logo.png";
import WebpackLogo from "../images/webpack-logo.png";
import { getThemeStyles, useTheme } from "../theme";

export const Toolbox = () => {
	const [theme] = useTheme();
	const { primary } = getThemeStyles(theme);
	const { width } = useWindowSize();

	const toolboxWrapperCss = css`
		justify-content: space-evenly;
		h2 {
			font-size: 48px;
			font-family: "montserrat";
			margin: 10px -5px;
			color: ${primary};
		}
		h4 {
			margin: 5px 0px;
			font-size: 24px;
		}
	`;

	const flexContainerCss = css`
		display: flex;
		display: -webkit-flex;
		justify-content: center;
		flex-wrap: wrap;
		overflow: hidden;
	`;

	const techLinkCss = css`
		height: ${width > 400 && width < 800 ? "10vw" : "7vw"};
		max-height: 75px;
		min-height: 50px;
		margin: ${width > 800 ? 20 : 10}px;

		img {
			height: 100%;
		}
	`;

	return (
		<div css={toolboxWrapperCss} className="container">
			<div>
				<h2>My Toolbox</h2>
				<h4>Technologies I am familiar with and use frequently.</h4>
			</div>
			<div css={flexContainerCss}>
				<a
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
					css={techLinkCss}
				>
					<img src={ReactLogo} alt="" />
				</a>
				<a
					href="https://nodejs.org"
					target="_blank"
					rel="noopener noreferrer"
					css={techLinkCss}
				>
					<img src={NodeLogo} alt="" />
				</a>
				<a
					href="https://nestjs.com"
					target="_blank"
					rel="noopener noreferrer"
					css={techLinkCss}
				>
					<img src={NestLogo} alt="" />
				</a>
				<a
					href="https://nextjs.org"
					target="_blank"
					rel="noopener noreferrer"
					css={techLinkCss}
				>
					{theme === "dark" ? (
						<img src={NextLightLogo} alt="" />
					) : (
						<img src={NextLogo} alt="" />
					)}
				</a>
				<a
					href="https://graphql.org"
					target="_blank"
					rel="noopener noreferrer"
					css={techLinkCss}
				>
					<img src={GraphQlLogo} alt="" />
				</a>
				<a
					href="https://expo.io"
					target="_blank"
					rel="noopener noreferrer"
					css={techLinkCss}
				>
					<img src={ExpoLogo} alt="" />
				</a>
				<a
					href="https://apollographql.com"
					target="_blank"
					rel="noopener noreferrer"
					css={techLinkCss}
				>
					{theme === "dark" ? (
						<img src={ApolloLightLogo} alt="" />
					) : (
						<img src={ApolloLogo} alt="" />
					)}
				</a>
				<a
					href="https://redux.js.org"
					target="_blank"
					rel="noopener noreferrer"
					css={techLinkCss}
				>
					<img src={ReduxLogo} alt="" />
				</a>
				<a
					href="https://gatsbyjs.org"
					target="_blank"
					rel="noopener noreferrer"
					css={techLinkCss}
				>
					<img src={GatsbyLogo} alt="" />
				</a>
				<a
					href="https://html5.org"
					target="_blank"
					rel="noopener noreferrer"
					css={techLinkCss}
				>
					<img src={HtmlLogo} alt="" />
				</a>
				<a
					href="https://www.w3.org/Style/CSS/"
					target="_blank"
					rel="noopener noreferrer"
					css={techLinkCss}
				>
					<img src={CssLogo} alt="" />
				</a>
				<a
					href="https://scss.org"
					target="_blank"
					rel="noopener noreferrer"
					css={techLinkCss}
				>
					<img src={ScssLogo} alt="" />
				</a>
				<a
					href="https://emotion.sh"
					target="_blank"
					rel="noopener noreferrer"
					css={techLinkCss}
				>
					<img src={EmotionLogo} alt="" />
				</a>
				<a
					href="https://webpack.js.org"
					target="_blank"
					rel="noopener noreferrer"
					css={techLinkCss}
				>
					<img src={WebpackLogo} alt="" />
				</a>
				<a
					href="https://ionicframework.com"
					target="_blank"
					rel="noopener noreferrer"
					css={techLinkCss}
				>
					<img src={IonicLogo} alt="" />
				</a>
				<a
					href="https://postgresql.org"
					target="_blank"
					rel="noopener noreferrer"
					css={techLinkCss}
				>
					<img src={PostgresLogo} alt="" />
				</a>
				<a
					href="https://mongodb.com"
					target="_blank"
					rel="noopener noreferrer"
					css={techLinkCss}
				>
					{theme === "dark" ? (
						<img src={MongoLightLogo} alt="" />
					) : (
						<img src={MongoLogo} alt="" />
					)}
				</a>
			</div>
		</div>
	);
};
