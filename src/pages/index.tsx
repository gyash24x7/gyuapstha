import cx from "classnames";
import "normalize.scss/normalize.scss";
import { default as React, useEffect, useState } from "react";
import { useWindowSize } from "react-use";
import { Experience } from "../components/Experience";
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
	const { width } = useWindowSize();

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
		if (width > 900) {
			const targets = document.querySelectorAll(".full-page");
			targets.forEach((target) => {
				observer.observe(target);
			});
		}

		const theme = localStorage.getItem("theme");
		if (theme) {
			if (theme === "dark") setTheme({ colors: darkThemeColors, isDark: true });
		} else {
			if (matchMedia("(prefers-color-scheme:dark)").matches) {
				setTheme({ colors: darkThemeColors, isDark: true });
			}
		}
	}, [width]);

	return (
		<ThemeProvider value={{ ...theme, setTheme }}>
			<Head />
			<div
				className={cx(styles.fullPageWrapper, "full-page-wrapper", {
					"scroll-snap": width > 900
				})}
			>
				<TopNav />
				<LeftNav />
				<RightNav />
				<section
					className={cx(styles.fullPage, "full-page", {
						"scroll-snap": width > 900
					})}
				>
					<Intro />
				</section>

				<section
					className={cx(styles.fullPage, "full-page", {
						"scroll-snap": width > 900
					})}
				>
					<Toolbox />
				</section>

				<section
					className={cx(styles.fullPage, "full-page", {
						"scroll-snap": width > 900
					})}
				>
					<Experience />
				</section>

				<section
					className={cx(styles.fullPage, "full-page", {
						"scroll-snap": width > 900
					})}
				>
					<Footer />
				</section>
			</div>
		</ThemeProvider>
	);
};
