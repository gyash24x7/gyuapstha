/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import Typical from "react-typical";
import { useWindowSize } from "react-use";
import { getThemeStyles, useTheme } from "../theme";

export const Intro = () => {
	const [theme] = useTheme();
	const { primary, color } = getThemeStyles(theme);
	const { width } = useWindowSize();

	const getContainerWidth = () => {
		if (width > 1000) {
			return "calc(100% - 400px)";
		} else if (width > 800) {
			return "calc(100% - 300px)";
		} else if (width > 600) {
			return "calc(100% - 100px)";
		} else {
			return "calc(100% - 60px)";
		}
	};

	const introContainer = css`
		width: ${getContainerWidth()};
		padding-top: 110px;
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
		<div css={introContainer}>
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
