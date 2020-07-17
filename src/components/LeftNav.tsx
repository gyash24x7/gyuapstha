import { graphql, useStaticQuery } from "gatsby";
import React, { useContext } from "react";
import styles from "../styles/frame.module.scss";
import { getHandleDetails, ThemeContext } from "../utils";

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
		<div className={styles.leftNav}>
			<div className={styles.topSideLine}>
				<div />
			</div>
			{Object.keys(site.siteMetadata.social).map((handle) => {
				const { link, Component } = getHandleDetails(handle, site);
				return (
					<a
						href={link}
						target="_blank"
						rel="noopener noreferrer nofollow"
						key={link}
					>
						<Component
							className={styles.social}
							style={{ fill: colors.fgColor }}
						/>
					</a>
				);
			})}
			<div className={styles.bottomSideLine}>
				<div />
			</div>
		</div>
	);
};
