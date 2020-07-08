import "normalize.css/normalize.css";
import React, { useEffect, useRef } from "react";
import "../styles/index.css";

const IndexPage = () => {
	const wrapperRef = useRef<HTMLDivElement>();

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
		const targets = document.querySelectorAll(".full-page");
		targets.forEach((target) => {
			observer.observe(target);
		});
	});

	return (
		<div className="full-page-wrapper" ref={wrapperRef}>
			<section className="red full-page invisible">
				<div>
					<h1>Red</h1>
					<h3>Excitement. Energy. Passion.</h3>
				</div>
			</section>

			<section className="orange full-page">
				<div>
					<h1>Orange</h1>
					<h3> Energy. Balance. Enthusiasm.</h3>
				</div>
			</section>

			<section className="yellow full-page">
				<div>
					<h1>Yellow</h1>
					<h3>Joy. Happiness. Sunshine.</h3>
				</div>
			</section>

			<section className="green full-page">
				<div>
					<h1>Green</h1>
					<h3>Nature. Environment. Healthy.</h3>
				</div>
			</section>

			<section className="blue full-page">
				<div>
					<h1>Blue</h1>
					<h3>Peace. Tranquility. Calm.</h3>
				</div>
			</section>

			<section className="indigo full-page">
				<div>
					<h1>Indigo</h1>
					<h3>Integrity. Knowledge. Power.</h3>
				</div>
			</section>

			<section className="violet full-page">
				<div>
					<h1>Violet</h1>
					<h3>Royalty. Nobility. Spirituality.</h3>
				</div>
			</section>
		</div>
	);
};

export default IndexPage;
