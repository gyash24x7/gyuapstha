import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import { useHover } from "react-use";
import { Container } from "./FullPage";
import { Heading, SubHeading } from "./Typography";

const ProjectsQuery = graphql`
	{
		allFile(
			filter: { extension: { eq: "png" }, dir: { regex: "/assets/projects/" } }
		) {
			edges {
				node {
					id
					name
					grayscale: childImageSharp {
						fluid(maxWidth: 300, pngQuality: 100, grayscale: true) {
							src
						}
					}
					color: childImageSharp {
						fluid(maxWidth: 300, pngQuality: 100) {
							src
						}
					}
				}
			}
		}
	}
`;

export const Projects = () => {
	const { allFile } = useStaticQuery(ProjectsQuery);
	const HacknotesLogo = (hovered: boolean) => (
		<img
			src={allFile.edges[0].node[hovered ? "color" : "grayscale"].fluid.src}
			alt="hacknotes-logo"
		/>
	);
	const [HacknotesLogoWithHover] = useHover(HacknotesLogo);

	const LiteratureLogo = (hovered: boolean) => (
		<img
			src={allFile.edges[1].node[hovered ? "color" : "grayscale"].fluid.src}
			alt="literature-logo"
		/>
	);
	const [LiteratureLogoWithHover] = useHover(LiteratureLogo);

	return (
		<Container>
			<div>
				<Heading>Projects</Heading>
				<SubHeading>Few of my notable works</SubHeading>
			</div>
		</Container>
	);
};
