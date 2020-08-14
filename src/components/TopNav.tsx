import React, { useContext } from "react";
import Logo from "../assets/icons/logo.svg";
import Moon from "../assets/icons/moon.svg";
import Sun from "../assets/icons/sun.svg";
import styles from "../styles/frame.module.scss";
import { darkThemeColors, lightThemeColors, ThemeContext } from "../utils";

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
		<div className={styles.topNav} style={{ backgroundColor: colors.bgColor }}>
			<Logo style={{ fill: colors.fgColor }} className={styles.logo} />
			<div className={styles.midLine}>
				<div />
			</div>
			{isDark ? (
				<Sun
					style={{ fill: colors.fgColor }}
					onClick={toggleTheme}
					className={styles.darkModeToggle}
				/>
			) : (
				<Moon
					style={{ fill: colors.fgColor }}
					onClick={toggleTheme}
					className={styles.darkModeToggle}
				/>
			)}
		</div>
	);
};
