import cx from "classnames";
import { graphql, useStaticQuery } from "gatsby";
import React, { useState } from "react";
import Caret from "../assets/icons/caret-forward.svg";
import styles from "../styles/experience.module.scss";

const ExperienceQuery = graphql`
	{
		site {
			siteMetadata {
				experience {
					name
					url
					position
					duration
					points
					intro
				}
			}
		}
	}
`;

export const Experience = () => {
	const { site } = useStaticQuery(ExperienceQuery);
	const [companyData, setCompanyData] = useState(
		site.siteMetadata.experience[0]
	);
	const handleCompanySelect = (i: number) => () =>
		setCompanyData(site.siteMetadata.experience[i]);

	return (
		<div className={cx("container", styles.container)}>
			<div>
				<div className={styles.headingBox}>
					<div className={styles.heading}>Where I've Worked</div>
				</div>
				<div className={styles.experienceGrid}>
					<div className={styles.companiesList}>
						{site.siteMetadata.experience.map(({ name }: any, i: number) => (
							<div
								className={cx({
									[styles.companiesListItem]: true,
									[styles.active]: companyData.name === name
								})}
								onClick={handleCompanySelect(i)}
								key={name}
							>
								{name}
							</div>
						))}
					</div>
					<div className={styles.companyWorkDesc}>
						<div className={styles.positionBlock}>
							<div className={styles.position}>
								{companyData.position}&nbsp;&nbsp;
								<a
									href={companyData.url}
									target="_blank"
									rel="noopener noreferrer nofollow"
								>
									@{companyData.name}
								</a>
							</div>
							<div className={styles.duration}>({companyData.duration})</div>
						</div>
						<div className={styles.companyIntro}>{companyData.intro}</div>
						{companyData.points.map((point: string) => (
							<div className={styles.point} key={point}>
								<span className={styles.svgSpan}>
									<Caret />
								</span>
								<span>{point}</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};
