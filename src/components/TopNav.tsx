/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import Logo from "../assets/logo.svg";
import Moon from "../assets/moon.svg";
import Sun from "../assets/sun.svg";
import { getThemeStyles, useTheme } from "../theme";

export const TopNav = () => {
	const [theme, setTheme] = useTheme();
	const { color, primary } = getThemeStyles(theme);

	const topNavCss = css`
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		height: 40px;
		padding: 30px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		z-index: 2;

		&::before {
			position: absolute;
			width: calc(100vw - 180px);
			margin-left: 65px;
			content: "";
			display: block;
			height: 2px;
			border-radius: 2px;
			background-color: ${primary};
		}
	`;

	const logoCss = css`
		height: 32px;
		width: auto;
		fill: ${color};
	`;

	const darkModeToggleCss = css`
		width: auto;
		height: 32px;
		padding-right: 5px;
		cursor: pointer;
		fill: ${color};
	`;

	return (
		<div css={topNavCss}>
			<Logo css={logoCss} />
			{theme === "dark" ? (
				<Sun css={darkModeToggleCss} onClick={() => setTheme("light")} />
			) : (
				<Moon css={darkModeToggleCss} onClick={() => setTheme("dark")} />
			)}
		</div>
	);
};
