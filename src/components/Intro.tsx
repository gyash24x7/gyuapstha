import { graphql, useStaticQuery } from "gatsby";
import React, { useContext } from "react";
import { useMount } from "react-use";
import Typed from "typed.js";
import { ThemeContext } from "../utils";
import { AppButton } from "./Buttons";
import { Container } from "./FullPage";
import { BodyText, Intro, Name } from "./Typography";

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

	useMount(() => {
		new Typed("#typed", {
			loop: true,
			strings: site?.siteMetadata?.typed as string[],
			typeSpeed: 50,
			backSpeed: 60
		});
	});

	return (
		<Container>
			<div>
				<BodyText>Hi, my name is</BodyText>
				<Name>{site?.siteMetadata?.me}.</Name>
				<div>
					<span id="typed"></span>
				</div>
				<Intro>{site?.siteMetadata?.intro}</Intro>
				<a href={`mailto:${site?.siteMetadata?.emailAlt}`} target="_blank">
					<AppButton style={{ color: colors.fgColor }}>Get In Touch</AppButton>
				</a>
			</div>
		</Container>
	);
};
