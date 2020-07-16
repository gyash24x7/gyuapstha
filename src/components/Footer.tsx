import { graphql, useStaticQuery } from "gatsby";
import React, { useContext } from "react";
import { useWindowSize } from "react-use";
import styles from "../styles/footer.module.scss";
import { getHandleDetails, ThemeContext } from "../utils";

const FooterQuery = graphql`
	query Footer {
		site {
			siteMetadata {
				social {
					facebook
					github
					linkedin
					twitter
					instagram
				}
				email
				emailAlt
				partingNote
			}
		}
	}
`;

export const Footer = () => {
	const { colors } = useContext(ThemeContext);
	const { width } = useWindowSize();
	const { site } = useStaticQuery(FooterQuery);

	return (
		<div className="container">
			<div className={styles.getInTouch}>
				<h2>Get in Touch</h2>
				<h4>{site.siteMetadata.partingNote}</h4>
				<h4>If you think I'll be a good fit. Drop me a message.</h4>
				<a
					href={`mailto:${site.siteMetadata.emailAlt}`}
					target="_blank"
					rel="noopener noreferrer nofollow"
				>
					<button className="app-button" style={{ color: colors.fgColor }}>
						Say Hello!
					</button>
				</a>
			</div>
			{width < 900 && (
				<div>
					<div className={styles.socialWrapper}>
						<div className={styles.sideLine}>
							<div />
						</div>
						<div className={styles.emailLink}>
							<a
								style={{ color: colors.fgColor }}
								href={`mailto:${site.siteMetadata.email}`}
								rel="noopener noreferrer nofollow"
							>
								{site.siteMetadata.email}
							</a>
						</div>
						<div className={styles.sideLine}>
							<div />
						</div>
					</div>
					<div className={styles.socialWrapper}>
						<div className={styles.sideLine}>
							<div />
						</div>
						<div className={styles.socialLinks}>
							{Object.keys(site!.siteMetadata!.social!).map((handle) => {
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
						</div>
						<div className={styles.sideLine}>
							<div />
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
