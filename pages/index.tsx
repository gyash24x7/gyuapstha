import cx from "classnames";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { Footer } from "../components/Footer";
import { Frame } from "../components/Frame";
import { Intro } from "../components/Intro";
import { Toolbox } from "../components/Toolbox";
import styles from "../styles/index.module.css";
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
			<div className={styles.fullPageWrapper}>
				<Head>
					<title>Yash Gupta</title>
					<link
						href="https://fonts.googleapis.com/css?family=Oswald:300|Montserrat:600&amp;display=swap"
						rel="stylesheet"
					/>
				</Head>
				<Frame />
				<section className={cx(styles.fullPage, "invisible", "full-page")}>
					<Intro />
				</section>

				<section className={cx(styles.fullPage, "full-page")}>
					<Toolbox />
				</section>

				<section className={cx(styles.fullPage, "full-page", styles.footer)}>
					<Footer />
				</section>
			</div>
		</ThemeProvider>
	);
};
