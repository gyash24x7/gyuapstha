/**@jsx jsx */
import { css, jsx } from "@emotion/core";
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

	const toolboxWrapperCss = css`
		width: calc(100% - 240px);
		height: calc(100% - 170px);
		padding: 120px;
		padding-bottom: 50px;

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
		padding: 30px;
		margin-top: 30px;
	`;

	const techCardCss = css`
		height: 75px;
		padding: 15px 0px;
		margin: 20px;

		img {
			margin-right: 15px;
			height: 100%;
		}
	`;

	return (
		<div css={toolboxWrapperCss}>
			<h2>My Toolbox</h2>
			<h4>Technologies I am familiar with and use frequently.</h4>
			<div css={flexContainerCss}>
				<div css={techCardCss}>
					<img src={ReactLogo} alt="" />
				</div>
				<div css={techCardCss}>
					<img src={NodeLogo} alt="" />
				</div>
				<div css={techCardCss}>
					<img src={NestLogo} alt="" />
				</div>
				<div css={techCardCss}>
					{theme === "dark" ? (
						<img src={NextLightLogo} alt="" />
					) : (
						<img src={NextLogo} alt="" />
					)}
				</div>
				<div css={techCardCss}>
					<img src={GraphQlLogo} alt="" />
				</div>
				<div css={techCardCss}>
					<img src={ExpoLogo} alt="" />
				</div>
				<div css={techCardCss}>
					{theme === "dark" ? (
						<img src={ApolloLightLogo} alt="" />
					) : (
						<img src={ApolloLogo} alt="" />
					)}
				</div>
				<div css={techCardCss}>
					<img src={ReduxLogo} alt="" />
				</div>
				<div css={techCardCss}>
					<img src={GatsbyLogo} alt="" />
				</div>
				<div css={techCardCss}>
					<img src={IonicLogo} alt="" />
				</div>
				<div css={techCardCss}>
					{theme === "dark" ? (
						<img src={MongoLightLogo} alt="" />
					) : (
						<img src={MongoLogo} alt="" />
					)}
				</div>
				<div css={techCardCss}>
					<img src={PostgresLogo} alt="" />
				</div>
				<div css={techCardCss}>
					<img src={WebpackLogo} alt="" />
				</div>
				<div css={techCardCss}>
					<img src={HtmlLogo} alt="" />
				</div>
				<div css={techCardCss}>
					<img src={CssLogo} alt="" />
				</div>
				<div css={techCardCss}>
					<img src={ScssLogo} alt="" />
				</div>
				<div css={techCardCss}>
					<img src={EmotionLogo} alt="" />
				</div>
			</div>
		</div>
	);
};
