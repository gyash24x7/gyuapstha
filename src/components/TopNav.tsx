import React, { useContext } from "react";
import styled from "styled-components";
import Logo from "../assets/icons/logo.svg";
import Moon from "../assets/icons/moon.svg";
import Sun from "../assets/icons/sun.svg";
import { darkThemeColors, lightThemeColors, ThemeContext } from "../utils";

const TopNav = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	height: 40px;
	padding: 20px;
	display: flex;
	align-items: center;
	z-index: 2;
	-webkit-transition: color cubic-bezier(0.86, 0, 0.07, 1) 500ms;
	transition: color cubic-bezier(0.86, 0, 0.07, 1) 500ms;
	-webkit-transition: background cubic-bezier(0.86, 0, 0.07, 1) 500ms;
	transition: background cubic-bezier(0.86, 0, 0.07, 1) 500ms;

	@media only screen and (min-width: 900px) {
		padding: 30px;
	}
`;

const MidLine = styled.div`
	flex: 1;
	height: 100%;

	& > div {
		background-color: #fca311;
		height: 2px;
		margin: 19px 25px;
	}
`;

const SunIcon = styled(Sun)`
	cursor: pointer;
	margin-right: 5px;
	height: 30px;
	width: 30px;

	&:hover {
		fill: #fca311 !important;
	}
`;

const MoonIcon = styled(Moon)`
	cursor: pointer;
	margin-right: 5px;
	height: 30px;
	width: 30px;

	&:hover {
		fill: #fca311 !important;
	}
`;

export default () => {
	const { colors, setTheme, isDark } = useContext(ThemeContext);

	const toggleTheme = () => {
		if (isDark) {
			localStorage.setItem("theme", "light");
			setTheme({ colors: lightThemeColors, isDark: false });
		} else {
			localStorage.setItem("theme", "dark");
			setTheme({ colors: darkThemeColors, isDark: true });
		}
	};

	return (
		<TopNav style={{ backgroundColor: colors.bgColor }}>
			<Logo style={{ fill: colors.fgColor, marginLeft: 5 }} />
			<MidLine>
				<div />
			</MidLine>
			{isDark ? (
				<SunIcon style={{ fill: colors.fgColor }} onClick={toggleTheme} />
			) : (
				<MoonIcon style={{ fill: colors.fgColor }} onClick={toggleTheme} />
			)}
		</TopNav>
	);
};
