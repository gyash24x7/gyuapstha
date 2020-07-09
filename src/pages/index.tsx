import "normalize.css/normalize.css";
import React, { useEffect, useRef } from "react";
import { About } from "../components/About";
import { Frame } from "../components/Frame";
import { Intro } from "../components/Intro";
import { Toolbox } from "../components/Toolbox";
import "../styles/index.css";
import { getThemeStyles, ThemeProvider, useTheme } from "../theme";

const IndexPage = () => {
	const wrapperRef = useRef<HTMLDivElement>();
	const [theme] = useTheme();
	const { color, backgroundColor } = getThemeStyles(theme);

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
		<div className="full-page-wrapper" ref={wrapperRef}>
			<Frame />
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
