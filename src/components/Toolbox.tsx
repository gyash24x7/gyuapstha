import cx from "classnames";
import React, { useContext, useEffect, useState } from "react";
import styles from "../styles/toolbox.module.scss";
import { ThemeContext } from "../utils";

interface ToolLinkProps {
	href: string;
	alt: string;
	src: string;
	title: string;
	opacity: number;
	transitionDelay: string;
}

export const ToolLink = (props: ToolLinkProps) => (
	<a href={props.href} rel="noopener noreferrer" target="_blank">
		<img
			src={props.src}
			alt={props.alt}
			title={props.title}
			style={{ transitionDelay: props.transitionDelay, opacity: props.opacity }}
		/>
	</a>
);

export const Toolbox = () => {
	const { isDark } = useContext(ThemeContext);
	const [opacity, setOpacity] = useState(0);

	const intersectionCallback: IntersectionObserverCallback = (entries) => {
		entries.forEach((entry) => {
			if (entry.intersectionRatio >= 0.85) setOpacity(1);
			else setOpacity(0);
		});
	};

	let observer: any =
		typeof window !== "undefined" &&
		new IntersectionObserver(intersectionCallback, {
			root: null,
			rootMargin: "0px",
			threshold: 0.85
		});

	useEffect(() => {
		const targets = document.querySelectorAll("#toolbox");
		targets.forEach((target) => {
			observer.observe(target);
		});
	}, []);

	return (
		<div className={cx("container", styles.container)} id="toolbox">
			<div>
				<div className={styles.headingBox}>
					<h1>My Toolbox</h1>
					<h4>Technologies I am familiar with and use frequently</h4>
				</div>
				<div className={styles.toolbox}>
					<ToolLink
						src="../assets/images/react-logo.png"
						alt="ReactJS"
						title="ReactJS"
						href="https://reactjs.org"
						opacity={opacity}
						transitionDelay="100ms"
					/>
					<ToolLink
						src={`../assets/images/${
							isDark ? "nodejs-logo-light" : "nodejs-logo"
						}.png`}
						alt="NodeJS"
						title="NodeJS"
						href="https://nodejs.org"
						opacity={opacity}
						transitionDelay="200ms"
					/>
					<ToolLink
						src="../assets/images/nestjs-logo.png"
						alt="NestJS"
						title="NestJS"
						href="https://nestjs.com"
						opacity={opacity}
						transitionDelay="300ms"
					/>
					<ToolLink
						src={`../assets/images/${
							isDark ? "apollo-logo-light" : "apollo-logo"
						}.png`}
						alt="Apollo"
						title="Apollo"
						href="https://apollographql.com"
						opacity={opacity}
						transitionDelay="400ms"
					/>
					<ToolLink
						src="../assets/images/graphql-logo.png"
						alt="GraphQL"
						title="GraphQL"
						href="https://graphql.org"
						opacity={opacity}
						transitionDelay="500ms"
					/>
					<ToolLink
						src={`../assets/images/${
							isDark ? "nextjs-logo-light" : "nextjs-logo"
						}.png`}
						alt="NextJS"
						title="NextJS"
						href="https://nextjs.org"
						opacity={opacity}
						transitionDelay="600ms"
					/>
					<ToolLink
						src="../assets/images/expo-logo.png"
						alt="Expo"
						title="Expo"
						href="https://expo.io"
						opacity={opacity}
						transitionDelay="700ms"
					/>
					<ToolLink
						src="../assets/images/gatsby-logo.png"
						alt="Gatsby"
						title="Gatsby"
						href="https://gatsbyjs.org"
						opacity={opacity}
						transitionDelay="800ms"
					/>
					<ToolLink
						src="../assets/images/html-logo.png"
						alt="HTML5"
						title="HTML5"
						href="https://html5.org"
						opacity={opacity}
						transitionDelay="900ms"
					/>
					<ToolLink
						src="../assets/images/css-logo.png"
						alt="CSS3"
						title="CSS3"
						href="https://www.w3.org/Style/CSS/"
						opacity={opacity}
						transitionDelay="800ms"
					/>
					<ToolLink
						src="../assets/images/scss-logo.png"
						alt="SCSS"
						title="SCSS"
						href="https://sass-lang.com"
						opacity={opacity}
						transitionDelay="700ms"
					/>
					<ToolLink
						src="../assets/images/redux-logo.png"
						opacity={opacity}
						transitionDelay="600ms"
						alt="Redux"
						title="Redux"
						href="https://redux.js.org"
					/>
					<ToolLink
						src="../assets/images/webpack-logo.png"
						alt="Webpack"
						title="Webpack"
						href="https://webpack.js.org"
						opacity={opacity}
						transitionDelay="500ms"
					/>
					<ToolLink
						src="../assets/images/ionic-logo.png"
						alt="Ionic"
						title="Ionic"
						href="https://ionicframework.com"
						opacity={opacity}
						transitionDelay="400ms"
					/>
					<ToolLink
						src="../assets/images/emotion-logo.png"
						alt="Emotion"
						title="Emotion"
						href="https://emotion.sh"
						opacity={opacity}
						transitionDelay="300ms"
					/>
					<ToolLink
						src={`../assets/images/${
							isDark ? "mongo-logo-light" : "mongo-logo"
						}.png`}
						alt="MongoDB"
						title="MongoDB"
						href="https://mongodb.com"
						opacity={opacity}
						transitionDelay="200ms"
					/>
					<ToolLink
						src="../assets/images/postgres-logo.png"
						alt="Postgres"
						title="Postgres"
						href="https://postgresql.org"
						opacity={opacity}
						transitionDelay="100ms"
					/>
				</div>
			</div>
		</div>
	);
};
