import { graphql, useStaticQuery } from "gatsby";
import React, { Fragment, useContext, useState } from "react";
import { useHover, useMount } from "react-use";
import styled from "styled-components";
import { compareToolPriority, getToolData, ThemeContext } from "../utils";
import { Container } from "./FullPage";
import { Heading, SubHeading } from "./Typography";

interface ToolProps {
	node: any;
	index: number;
	opacity: number;
}

export const Tool = ({ node, index, opacity }: ToolProps) => {
	const ToolImage = (hovered: boolean) => (
		<img
			src={node[hovered ? "sharp" : "grayscale"].fluid.src}
			alt={getToolData(node.name).title}
			title={getToolData(node.name).title}
			style={{ opacity, transitionDelay: `${Math.abs(index - 8)}00ms` }}
		/>
	);
	const [HoveredToolImage] = useHover(ToolImage);

	return <Fragment>{HoveredToolImage}</Fragment>;
};

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
					grayscale: childImageSharp {
						fluid(grayscale: true) {
							src
						}
					}
				}
			}
		}
	}
`;

const darkLogos = ["apollo-logo", "mongo-logo", "nextjs-logo", "nodejs-logo"];
const lightLogos = [
	"apollo-logo-light",
	"mongo-logo-light",
	"nextjs-logo-light",
	"nodejs-logo-light"
];

const ToolBox = styled.div`
	width: 100%;
	max-width: 900px;
	height: 350px;
	margin-top: 25px;
	margin-left: -10px;
	margin-right: -10px;

	img {
		height: 5vh;
		min-height: 35px;
		max-height: 70px;
		margin: 10px;
		opacity: 0;
		transition: opacity ease-in-out 300ms;
		-webkit-transition: opacity ease-in-out 300ms;

		@media only screen and (min-width: 900px) {
			margin: 15px;
			height: 7vh;
		}
	}

	@media only screen and (min-width: 900px) {
		margin-top: 40px;
		margin-left: -15px;
		margin-right: -15px;
		height: 50vh;
	}
`;

export default () => {
	const { isDark } = useContext(ThemeContext);
	const [opacity, setOpacity] = useState(0);
	const data = useStaticQuery(query);
	const images: any[] = data.allFile.edges;
	const excludedImages = isDark ? darkLogos : lightLogos;

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

	useMount(() =>
		document.querySelectorAll("#toolbox").forEach((target) => {
			observer.observe(target);
		})
	);

	return (
		<Container id="toolbox">
			<div>
				<div>
					<Heading>My Toolbox</Heading>
					<SubHeading>
						Technologies I am familiar with and use frequently
					</SubHeading>
				</div>
				<ToolBox>
					{images
						.filter((image) => !excludedImages.includes(image.node.name))
						.sort(compareToolPriority)
						.map(({ node }, i) => (
							<a
								href={getToolData(node.name).href}
								rel="noopener noreferrer nofollow"
								target="_blank"
								key={node.id}
							>
								<Tool node={node} index={i} opacity={opacity} />
							</a>
						))}
				</ToolBox>
			</div>
		</Container>
	);
};
