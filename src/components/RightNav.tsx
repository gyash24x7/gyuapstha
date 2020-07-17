import { graphql, useStaticQuery } from "gatsby";
import React, { useContext } from "react";
import styles from "../styles/frame.module.scss";
import { ThemeContext } from "../utils";

export const query = graphql`
	{
		site {
			siteMetadata {
				social {
					facebook
					twitter
					linkedin
					github
					instagram
				}
			}
		}
	}
`;

export default () => {
	const { colors } = useContext(ThemeContext);
	const { site } = useStaticQuery(query);

	return (
		<div className={styles.rightNav}>
			<div className={styles.topSideLine}>
				<div />
			</div>
			<a
				style={{ color: colors.fgColor }}
				href={`mailto:${site?.siteMetadata?.email}`}
			>
				{site?.siteMetadata?.email}
			</a>
			<div className={styles.bottomSideLine}>
				<div />
			</div>
		</div>
	);
};
