import { graphql, useStaticQuery } from "gatsby";
import React, { Fragment, useContext } from "react";
import Logo from "../assets/icons/logo.svg";
import Moon from "../assets/icons/moon.svg";
import Sun from "../assets/icons/sun.svg";
import styles from "../styles/frame.module.scss";
import {
	darkThemeColors,
	getHandleDetails,
	lightThemeColors,
	ThemeContext
} from "../utils";

const FrameQuery = graphql`
	query Frame {
		site {
			siteMetadata {
				social {
					facebook
					twitter
					linkedin
					github
					instagram
				}
				email
			}
		}
	}
`;

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
	const { site } = useStaticQuery(FrameQuery);

	return (
		<div className={styles.leftNav}>
			<div className={styles.topSideLine}>
				<div />
			</div>
			{Object.keys(site!.siteMetadata!.social!).map((handle) => {
				const { link, Component } = getHandleDetails(handle, site);
				return (
					<a
						href={link}
						target="_blank"
						rel="noopener noreferrer nofollow"
						key={link}
					>
						<Component
							className={styles.social}
							style={{ fill: colors.fgColor }}
						/>
					</a>
				);
			})}
			<div className={styles.bottomSideLine}>
				<div />
			</div>
		</div>
	);
};

const RightNav = () => {
	const { colors } = useContext(ThemeContext);
	const { site } = useStaticQuery(FrameQuery);

	return (
		<div className={styles.rightNav}>
			<div className={styles.topSideLine}>
				<div />
			</div>
			<a
				style={{ color: colors.fgColor }}
				href={`mailto:${site?.siteMetadata?.email}`}
			>
				{site?.siteMetadata?.email}
			</a>
			<div className={styles.bottomSideLine}>
				<div />
			</div>
		</div>
	);
};
