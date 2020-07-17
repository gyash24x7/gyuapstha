import cx from "classnames";
import { graphql, useStaticQuery } from "gatsby";
import React, { useContext, useEffect } from "react";
import Typed from "typed.js";
import styles from "../styles/intro.module.scss";
import { ThemeContext } from "../utils";

const query = graphql`
	{
		site {
			siteMetadata {
				typed
				me
				intro
				emailAlt
			}
		}
	}
`;

export default () => {
	const { colors } = useContext(ThemeContext);
	const { site } = useStaticQuery(query);

	useEffect(() => {
		new Typed("#typed", {
			loop: true,
			strings: site?.siteMetadata?.typed as string[],
			typeSpeed: 50,
			backSpeed: 60
		});
	}, []);

	return (
		<div className={cx(styles.container, "container")}>
			<div>
				<h4>Hi, my name is</h4>
				<h1>{site?.siteMetadata?.me}.</h1>
				<div>
					<span id="typed"></span>
				</div>
				<h4 className={styles.intro}>{site?.siteMetadata?.intro}</h4>
				<a href={`mailto:${site?.siteMetadata?.emailAlt}`} target="_blank">
					<button className="app-button" style={{ color: colors.fgColor }}>
						Get In Touch
					</button>
				</a>
			</div>
		</div>
	);
};
