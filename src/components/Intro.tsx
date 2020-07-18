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
				<div className={styles.subHeading}>Hi, my name is</div>
				<div className={styles.heading}>{site?.siteMetadata?.me}.</div>
				<div>
					<span id="typed"></span>
				</div>
				<h4 className={cx(styles.intro, styles.subHeading)}>
					{site?.siteMetadata?.intro}
				</h4>
				<a href={`mailto:${site?.siteMetadata?.emailAlt}`} target="_blank">
					<button className="app-button" style={{ color: colors.fgColor }}>
						Get In Touch
					</button>
				</a>
			</div>
		</div>
	);
};
