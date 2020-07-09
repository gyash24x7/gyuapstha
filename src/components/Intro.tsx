import React from "react";
import "../styles/intro.css";
import { getThemeStyles, useTheme } from "../theme";

export const Intro = () => {
	const [theme] = useTheme();
	const { primary } = getThemeStyles(theme);

	return (
		<div className="intro-container">
			<h4>Hi, my name is</h4>
			<h1 style={{ color: primary }}>Yash Gupta.</h1>
			<h2>I build things for the web.</h2>
			<h4 className="intro">
				I am <span style={{ color: primary }}>Software Engineer</span> based in
				Kanpur, India specializing in building websites, web applicationas and
				mobile applications.
			</h4>
		</div>
	);
};
