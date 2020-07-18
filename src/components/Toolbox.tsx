import cx from "classnames";
import { graphql, useStaticQuery } from "gatsby";
import React, { useContext, useEffect, useState } from "react";
import styles from "../styles/toolbox.module.scss";
import { compareToolPriority, getToolData, ThemeContext } from "../utils";

const query = graphql`
	{
		allFile(
			filter: { extension: { eq: "png" }, dir: { regex: "/assets/images/" } }
		) {
			edges {
				node {
					id
					name
					sharp: childImageSharp {
						fluid {
							src
						}
					}
				}
			}
		}
	}
`;

export default () => {
	const { isDark } = useContext(ThemeContext);
	const [opacity, setOpacity] = useState(0);
	const data = useStaticQuery(query);
	const images: any[] = data.allFile.edges;

	const excludedImages = isDark
		? ["apollo-logo", "mongo-logo", "nextjs-logo", "nodejs-logo"]
		: [
				"apollo-logo-light",
				"mongo-logo-light",
				"nextjs-logo-light",
				"nodejs-logo-light"
		  ];

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
					<div className={styles.heading}>My Toolbox</div>
					<div className={styles.subHeading}>
						Technologies I am familiar with and use frequently
					</div>
				</div>
				<div className={styles.toolbox}>
					{images
						.filter((image) => !excludedImages.includes(image.node.name))
						.sort(compareToolPriority)
						.map(({ node: { name, id, sharp } }, i) => (
							<a
								href={getToolData(name).href}
								rel="noopener noreferrer nofollow"
								target="_blank"
								key={id}
							>
								<img
									src={sharp.fluid.src}
									alt={getToolData(name).title}
									title={getToolData(name).title}
									style={{ opacity, transitionDelay: `${Math.abs(i - 8)}00ms` }}
								/>
							</a>
						))}
				</div>
			</div>
		</div>
	);
};
