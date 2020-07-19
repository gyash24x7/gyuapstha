import cx from "classnames";
import { graphql, useStaticQuery } from "gatsby";
import React, { useContext } from "react";
import { useWindowSize } from "react-use";
import styles from "../styles/footer.module.scss";
import { getHandleDetails, ThemeContext } from "../utils";

const query = graphql`
	{
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

export default () => {
	const { colors } = useContext(ThemeContext);
	const { width } = useWindowSize();
	const { site } = useStaticQuery(query);

	return (
		<div className={cx("container", styles.container)}>
			<div>
				<div className={styles.headingBox}>
					<div className={styles.heading}>Get in Touch</div>
					<div className={styles.subHeading}>
						{site.siteMetadata.partingNote}
					</div>
					<div className={styles.subHeading}>
						If you think I'll be a good fit. Drop me a message.
					</div>
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
