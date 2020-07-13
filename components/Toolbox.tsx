import cx from "classnames";
import { useContext } from "react";
import styles from "../styles/toolbox.module.css";
import { ThemeContext } from "../utils";

export const Toolbox = () => {
	const { isDark } = useContext(ThemeContext);
	return (
		<div className={cx("container", styles.container)}>
			<div className={styles.headingBox}>
				<h1>My Toolbox</h1>
				<h4>Technologies I am familiar with and use frequently</h4>
			</div>
			<div className={styles.toolbox}>
				<img src="/images/react-logo.png" alt="" />
				<img src="/images/nodejs-logo.png" alt="" />
				<img src="/images/nestjs-logo.png" alt="" />
				<img
					src={`/images/${isDark ? "apollo-logo-light" : "apollo-logo"}.png`}
					alt=""
				/>
				<img src="/images/graphql-logo.png" alt="" />
				<img
					src={`/images/${isDark ? "nextjs-logo-light" : "nextjs-logo"}.png`}
					alt=""
				/>
				<img src="/images/expo-logo.png" alt="" />
				<img src="/images/gatsby-logo.png" alt="" />
				<img src="/images/html-logo.png" alt="" />
				<img src="/images/css-logo.png" alt="" />
				<img src="/images/scss-logo.png" alt="" />
				<img src="/images/redux-logo.png" alt="" />
				<img src="/images/webpack-logo.png" alt="" />
				<img src="/images/ionic-logo.png" alt="" />
				<img src="/images/emotion-logo.png" alt="" />
				<img
					src={`/images/${isDark ? "mongo-logo-light" : "mongo-logo"}.png`}
					alt=""
				/>
				<img src="/images/postgres-logo.png" alt="" />
			</div>
		</div>
	);
};
