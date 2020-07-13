import cx from "classnames";
import { useContext } from "react";
import styles from "../styles/toolbox.module.css";
import { ThemeContext } from "../utils";

interface ToolLinkProps {
	href: string;
	alt: string;
	src: string;
	title: string;
}

export const ToolLink = ({ href, src, alt, title }: ToolLinkProps) => (
	<a href={href} rel="noopener noreferrer" target="_blank">
		<img src={src} alt={alt} title={title} />
	</a>
);

export const Toolbox = () => {
	const { isDark } = useContext(ThemeContext);
	return (
		<div className={cx("container", styles.container)}>
			<div className={styles.headingBox}>
				<h1>My Toolbox</h1>
				<h4>Technologies I am familiar with and use frequently</h4>
			</div>
			<div className={styles.toolbox}>
				<ToolLink
					src="/images/react-logo.png"
					alt="ReactJS"
					title="ReactJS"
					href="https://reactjs.org"
				/>
				<ToolLink
					src="/images/nodejs-logo.png"
					alt="NodeJS"
					title="NodeJS"
					href="https://nodejs.org"
				/>
				<ToolLink
					src="/images/nestjs-logo.png"
					alt="NestJS"
					title="NestJS"
					href="https://nestjs.com"
				/>
				<ToolLink
					src={`/images/${isDark ? "apollo-logo-light" : "apollo-logo"}.png`}
					alt="Apollo"
					title="Apollo"
					href="https://apollographql.com"
				/>
				<ToolLink
					src="/images/graphql-logo.png"
					alt="GraphQL"
					title="ReactJS"
					href="https://graphql.org"
				/>
				<ToolLink
					src={`/images/${isDark ? "nextjs-logo-light" : "nextjs-logo"}.png`}
					alt="NextJS"
					title="NextJS"
					href="https://nextjs.org"
				/>
				<ToolLink
					src="/images/expo-logo.png"
					alt="Expo"
					title="Expo"
					href="https://expo.io"
				/>
				<ToolLink
					src="/images/gatsby-logo.png"
					alt="Gatsby"
					title="Gatsby"
					href="https://gatsbyjs.org"
				/>
				<ToolLink
					src="/images/html-logo.png"
					alt="HTML5"
					title="HTML5"
					href="https://html5.org"
				/>
				<ToolLink
					src="/images/css-logo.png"
					alt="CSS3"
					title="CSS3"
					href="https://www.w3.org/Style/CSS/"
				/>
				<ToolLink
					src="/images/scss-logo.png"
					alt="SCSS"
					title="SCSS"
					href="https://sass-lang.com"
				/>
				<ToolLink
					src="/images/redux-logo.png"
					alt="Redux"
					title="Redux"
					href="https://redux.js.org"
				/>
				<ToolLink
					src="/images/webpack-logo.png"
					alt="Webpack"
					title="Webpack"
					href="https://webpack.js.org"
				/>
				<ToolLink
					src="/images/ionic-logo.png"
					alt="Ionic"
					title="Ionic"
					href="https://ionicframework.com"
				/>
				<ToolLink
					src="/images/emotion-logo.png"
					alt="Emotion"
					title="Emotion"
					href="https://emotion.sh"
				/>
				<ToolLink
					src={`/images/${isDark ? "mongo-logo-light" : "mongo-logo"}.png`}
					alt="MongoDB"
					title="MongoDB"
					href="https://mongodb.com"
				/>
				<ToolLink
					src="/images/postgres-logo.png"
					alt="Postgres"
					title="Postgres"
					href="https://postgresql.org"
				/>
			</div>
		</div>
	);
};
