import cx from "classnames";
import "normalize.scss/normalize.scss";
import { default as React, useEffect, useState } from "react";
import Footer from "../components/Footer";
import Head from "../components/Head";
import Intro from "../components/Intro";
import LeftNav from "../components/LeftNav";
import RightNav from "../components/RightNav";
import Toolbox from "../components/Toolbox";
import TopNav from "../components/TopNav";
import "../styles/global.scss";
import styles from "../styles/index.module.scss";
import {
	darkThemeColors,
	lightThemeColors,
	Theme,
	ThemeProvider
} from "../utils";

export default () => {
	const [theme, setTheme] = useState<Theme>({
		colors: lightThemeColors,
		isDark: false
	});

	const intersectionCallback: IntersectionObserverCallback = (entries) => {
		entries.forEach((entry) => {
			if (entry.intersectionRatio >= 0.75) {
				entry.target.classList.remove("invisible");
			} else {
				entry.target.classList.add("invisible");
			}
		});
	};

	let observer: any =
		typeof window !== "undefined" &&
		new IntersectionObserver(intersectionCallback, {
			root: null,
			rootMargin: "0px",
			threshold: 0.75
		});

	useEffect(() => {
		document.body.style.backgroundColor = theme.colors.bgColor;
		document.body.style.color = theme.colors.fgColor;
	}, [theme]);

	useEffect(() => {
		const targets = document.querySelectorAll(".full-page");
		targets.forEach((target) => {
			observer.observe(target);
		});

		const theme = localStorage.getItem("theme");
		if (theme) {
			if (theme === "dark") setTheme({ colors: darkThemeColors, isDark: true });
		} else {
			if (matchMedia("(prefers-color-scheme:dark)").matches) {
				setTheme({ colors: darkThemeColors, isDark: true });
			}
		}
	}, []);

	return (
		<ThemeProvider value={{ ...theme, setTheme }}>
			<Head />
			<div className={styles.fullPageWrapper}>
				<TopNav />
				<LeftNav />
				<RightNav />
				<section className={cx(styles.fullPage, "invisible", "full-page")}>
					<Intro />
				</section>

				<section className={cx(styles.fullPage, "full-page")}>
					<Toolbox />
				</section>

				<section className={cx(styles.fullPage, "full-page")}>
					<Footer />
				</section>
			</div>
		</ThemeProvider>
	);
};
