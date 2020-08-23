import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import { useHover } from "react-use";
import styled from "styled-components";
import Download from "../assets/icons/download.svg";
import Github from "../assets/icons/github.svg";
import Open from "../assets/icons/open.svg";
import { SmallLinkButton } from "./Buttons";
import { Container } from "./FullPage";
import { Heading, SubHeading } from "./Typography";

const ProjectsQuery = graphql`
	{
		hacknotes: file(name: { eq: "hacknotes" }, extension: { eq: "png" }) {
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

		literature: file(name: { eq: "literature" }, extension: { eq: "png" }) {
			id
			name
			relativePath
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

		site {
			siteMetadata {
				projects {
					logo
					apkLink
					title
					github
					description
					webLink
					tech
				}
			}
		}
	}
`;

const ProjectContainer = styled.div`
	width: calc(100% + 40px);
	display: flex;
	flex-wrap: wrap;
	margin: 0px -20px;
`;

const Project = styled.div`
	border: 1px solid #fca311;
	border-radius: 10px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	flex: 1;
	min-width: 400px;
	margin: 20px;

	@media only screen and (max-width: 500px) {
		min-width: unset;
	}
`;

const ProjectHeader = styled.div`
	display: flex;
	flex: 1;
	padding: 30px;
	flex-direction: column;
	align-items: center;
	text-align: center;
	width: calc(100% - 60px);

	img {
		height: 150px;
		width: 150px;
		margin-bottom: 20px;
	}
`;

const ProjectTitle = styled.div`
	font-family: "Fjalla One", sans-serif;
	font-size: 24px;
	color: #fca311;
`;

const ProjectDescription = styled.div`
	font-family: "Montserrat", sans-serif;
	margin-top: 10px;
	line-height: 24px;
`;

const ProjectFooter = styled.div`
	display: flex;
	justify-content: flex-end;
	padding: 15px 30px;
`;

const TechTagWrapper = styled.div`
	margin-top: 40px;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
`;

const TechTag = styled.span`
	background-color: #fca31180;
	padding: 5px 20px;
	margin: 5px;
	border: 1px solid #fca311;
	border-radius: 10px;
	text-transform: uppercase;
	font-weight: 700;
	font-size: 12px;
`;

interface ProjectLogoProps {
	node: any;
}

const ProjectLogo = ({ node }: ProjectLogoProps) => {
	const Logo = (hovered: boolean) => (
		<img
			src={node[hovered ? "color" : "grayscale"].fluid.src}
			alt={`${node.name}-logo`}
		/>
	);
	const [LogoWithHover] = useHover(Logo);

	return LogoWithHover;
};

export const Projects = () => {
	const { site, ...logos } = useStaticQuery(ProjectsQuery);
	console.log(logos["hacknotes"]);

	return (
		<Container>
			<div>
				<Heading>Projects</Heading>
				<SubHeading>Few of my notable works</SubHeading>
				<ProjectContainer>
					{site.siteMetadata.projects.map((project: any) => (
						<Project key={project.title}>
							<ProjectHeader>
								<ProjectLogo node={logos[project.logo]} />
								<ProjectTitle>{project.title}</ProjectTitle>
								<ProjectDescription>{project.description}</ProjectDescription>
								<TechTagWrapper>
									{project.tech.map((tech: string) => (
										<TechTag key={tech}>{tech}</TechTag>
									))}
								</TechTagWrapper>
							</ProjectHeader>

							<ProjectFooter>
								<a
									href={project.github}
									target="_blank"
									rel="nooopener noreferrer nofollow"
								>
									<SmallLinkButton>
										<Github style={{ fill: "#fca311" }} />
									</SmallLinkButton>
								</a>
								<a
									href={project.apkLink}
									target="_blank"
									rel="nooopener noreferrer nofollow"
								>
									<SmallLinkButton>
										<Download />
									</SmallLinkButton>
								</a>
								<a
									href={project.webLink}
									target="_blank"
									rel="nooopener noreferrer nofollow"
								>
									<SmallLinkButton>
										<Open />
									</SmallLinkButton>
								</a>
							</ProjectFooter>
						</Project>
					))}
				</ProjectContainer>
			</div>
		</Container>
	);
};
