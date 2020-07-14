import React, { Fragment, useContext } from "react";
import Facebook from "../assets/facebook.svg";
import Github from "../assets/github.svg";
import Instagram from "../assets/instagram.svg";
import LinkedIn from "../assets/linkedin.svg";
import Logo from "../assets/logo.svg";
import Moon from "../assets/moon.svg";
import Sun from "../assets/sun.svg";
import Twitter from "../assets/twitter.svg";
import styles from "../styles/frame.module.css";
import { darkThemeColors, lightThemeColors, ThemeContext } from "../utils";

export const Frame = () => {
	return (
		<Fragment>
			<TopNav />
			<LeftNav />
			<RightNav />
		</Fragment>
	);
};

const TopNav = () => {
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
		<div className={styles.topNav}>
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

const LeftNav = () => {
	const { colors } = useContext(ThemeContext);

	return (
		<div className={styles.leftNav}>
			<div className={styles.topSideLine}>
				<div />
			</div>
			<a
				href="https://facebook.com/gyuapstha"
				target="_blank"
				rel="noopener noreferrer"
			>
				<Facebook className={styles.social} style={{ fill: colors.fgColor }} />
			</a>
			<a
				href="https://twitter.com/YashGup14686444"
				target="_blank"
				rel="noopener noreferrer"
			>
				<Twitter className={styles.social} style={{ fill: colors.fgColor }} />
			</a>
			<a
				href="https://www.linkedin.com/in/gyuapstha/"
				target="_blank"
				rel="noopener noreferrer"
			>
				<LinkedIn className={styles.social} style={{ fill: colors.fgColor }} />
			</a>
			<a
				href="https://instagram.com/__yash.gupta_/"
				target="_blank"
				rel="noopener noreferrer"
			>
				<Instagram className={styles.social} style={{ fill: colors.fgColor }} />
			</a>
			<a
				href="https://github.com/gyash24x7"
				target="_blank"
				rel="noopener noreferrer"
			>
				<Github className={styles.social} style={{ fill: colors.fgColor }} />
			</a>
			<div className={styles.bottomSideLine}>
				<div />
			</div>
		</div>
	);
};

const RightNav = () => {
	const { colors } = useContext(ThemeContext);
	return (
		<div className={styles.rightNav}>
			<div className={styles.topSideLine}>
				<div />
			</div>
			<a
				style={{ color: colors.fgColor }}
				href="mailto:yash.gupta.0519@gmail.com"
			>
				yash.gupta.0519@gmail.com
			</a>
			<div className={styles.bottomSideLine}>
				<div />
			</div>
		</div>
	);
};
