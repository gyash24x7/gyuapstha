/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import Typical from "react-typical";
import { useWindowSize } from "react-use";
import { getThemeStyles, useTheme } from "../theme";

export const Intro = () => {
	const [theme] = useTheme();
	const { primary } = getThemeStyles(theme);
	const { width } = useWindowSize();

	const introContainer = css`
		text-align: left;
		h1 {
			font-size: 72px;
			font-family: "montserrat";
			margin: 10px 0px;
			color: ${primary};
		}
		h2 {
			font-size: 48px;
			margin: 5px 0px;
		}
		h4 {
			margin: 5px 0px;
			font-size: 24px;
		}
	`;

	const introText = css`
		margin-top: 100px;
		margin-right: ${width > 700 ? "15%" : "5%"};
		line-height: 40px;
		margin-bottom: 30px;
		font-size: 24px;
	`;

	return (
		<div css={introContainer} className="container">
			<h4>Hi, my name is</h4>
			<h1>Yash Gupta.</h1>
			{true && (
				<Typical
					steps={[
						"I am a FrontEnd Developer.",
						2000,
						"I work on the BackEnd too.",
						2000,
						"I build things for the Web.",
						2000,
						"And for Mobile as well.",
						2000
					]}
					loop={Infinity}
					wrapper="h2"
				/>
			)}
			<div css={introText}>
				I am a graduate from IIT Madras, based in Kanpur, India specializing in
				building remarkable websites, applications and everything in between.
			</div>
			<button className="app-button">Get In Touch</button>
		</div>
	);
};
