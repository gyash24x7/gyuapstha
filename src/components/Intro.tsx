import React from "react";
import { getThemeStyles, useTheme } from "../theme";

export const Intro = () => {
	const [theme, setTheme] = useTheme();
	return (
		<div>
			<h1 style={{ color: getThemeStyles(theme).primary }}>Red</h1>
			<h3>Excitement. Energy. Passion.</h3>
			<button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
				Switch
			</button>
		</div>
	);
};
