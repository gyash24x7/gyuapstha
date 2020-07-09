import React from "react";
import { getThemeStyles, useTheme } from "../theme";

export const Intro = () => {
	const [theme] = useTheme();
	return (
		<div>
			<h1 style={{ color: getThemeStyles(theme).primary }}>Red</h1>
			<h3>Excitement. Energy. Passion.</h3>
		</div>
	);
};
