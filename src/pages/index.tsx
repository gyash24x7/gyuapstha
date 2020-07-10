import "normalize.css/normalize.css";
import React, { useEffect } from "react";
import { useWindowSize } from "react-use";
import { About } from "../components/About";
import { Intro } from "../components/Intro";
import { LeftNav } from "../components/LeftNav";
import { RightNav } from "../components/RightNav";
import { Toolbox } from "../components/Toolbox";
import { TopNav } from "../components/TopNav";
import "../styles/index.css";
import { getThemeStyles, ThemeProvider, useTheme } from "../theme";

const IndexPage = () => {
	const [theme] = useTheme();
	const { color, backgroundColor } = getThemeStyles(theme);
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

	let observer = new IntersectionObserver(intersectionCallback, {
		root: null,
		rootMargin: "0px",
		threshold: 0.75
	});

	useEffect(() => {
		document.body.style.backgroundColor = backgroundColor;
		document.body.style.color = color;
	}, [backgroundColor, color]);

	useEffect(() => {
		const targets = document.querySelectorAll(".full-page");
		targets.forEach((target) => {
			observer.observe(target);
		});
	});

	return (
		<div className="full-page-wrapper">
			<TopNav />
			{width > 800 && <LeftNav />}
			{width > 800 && <RightNav />}
			<section className="full-page invisible">
				<Intro />
			</section>

			<section className="full-page">
				<Toolbox />
			</section>

			<section className="full-page">
				<About />
			</section>
		</div>
	);
};

export default () => (
	<ThemeProvider>
		<IndexPage />
	</ThemeProvider>
);
