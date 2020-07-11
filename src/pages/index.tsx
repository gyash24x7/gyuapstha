/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useEffect } from "react";
import { useWindowSize } from "react-use";
import { GlobalStyles } from "../components/GlobalStyles";
import { Intro } from "../components/Intro";
import { LeftNav } from "../components/LeftNav";
import { RightNav } from "../components/RightNav";
import { Toolbox } from "../components/Toolbox";
import { TopNav } from "../components/TopNav";
import { getThemeStyles, ThemeProvider, useTheme } from "../theme";

const IndexPage = () => {
	const [theme] = useTheme();
	const { color, backgroundColor } = getThemeStyles(theme);
	const { width } = useWindowSize();

	const fullPageStyles = css`
		height: 100vh;
		overflow-y: auto;
		scroll-snap-type: y mandatory;

		.full-page {
			height: 100vh;
			scroll-snap-align: start;
			scroll-snap-stop: always;
			display: flex;
			justify-content: center;
			align-items: center;

			& > div {
				opacity: 1;
				-webkit-transition: opacity cubic-bezier(0.86, 0, 0.07, 1) 800ms;
				transition: opacity cubic-bezier(0.86, 0, 0.07, 1) 800ms;
			}

			&.invisible > div {
				opacity: 0;
			}
		}
	`;

	const intersectionCallback: IntersectionObserverCallback = (entries) => {
		entries.forEach((entry) => {
			let intersectionRatio = 0.75;
			if (entry.intersectionRatio >= intersectionRatio) {
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
		<div css={fullPageStyles}>
			<TopNav />
			{width > 800 && <LeftNav />}
			{width > 800 && <RightNav />}
			<section className="full-page invisible">
				<Intro />
			</section>
			<section className="full-page toolbox">
				<Toolbox />
			</section>
		</div>
	);
};

export default () => (
	<ThemeProvider>
		<GlobalStyles />
		<IndexPage />
	</ThemeProvider>
);
