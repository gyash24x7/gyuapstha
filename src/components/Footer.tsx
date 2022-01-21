import { graphql, Link, useStaticQuery } from "gatsby";
import React, { useContext } from "react";
import { useWindowSize } from "react-use";
import styled from "styled-components";
import { getHandleDetails, ThemeContext } from "../utils";
import { AppButton } from "./Buttons";
import { Container } from "./FullPage";
import { Heading, SubHeading } from "./Typography";

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

const SideLine = styled.div`
	flex: 1;
	margin: 23px 20px;

	& > div {
		background-color: #fca311;
		height: 2px;
		width: 100%;
		border-radius: 2px;
	}
`;

const SocialWrapper = styled.div`
	width: 100vw;
	display: flex;
	justify-content: center;
	margin: 0px -30px;
`;

const SocialLinks = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;

	a {
		text-decoration: none;
		margin-bottom: 5px;

		&:hover {
			color: $primary !important;
		}
	}
`;

export default () => {
	const { colors } = useContext( ThemeContext );
	const { width } = useWindowSize();
	const { site } = useStaticQuery( query );

	return (
		<Container>
			<div>
				<Heading>Get in Touch</Heading>
				<SubHeading style={ { maxWidth: 900 } }>
					{ site.siteMetadata.partingNote }
				</SubHeading>
				<SubHeading>
					If you think I'll be a good fit. Drop me a message.
				</SubHeading>
				<Link
					to={ `mailto:${ site.siteMetadata.emailAlt }` }
					target="_blank"
					rel="noopener noreferrer nofollow"
				>
					<AppButton style={ { color: colors.fgColor } }>Say Hello!</AppButton>
				</Link>
			</div>
			{ width < 900 && (
				<div>
					<SocialWrapper>
						<SideLine>
							<div/>
						</SideLine>
						<SocialLinks>
							<Link
								style={ { color: colors.fgColor } }
								to={ `mailto:${ site.siteMetadata.email }` }
								rel="noopener noreferrer nofollow"
							>
								{ site.siteMetadata.email }
							</Link>
						</SocialLinks>
						<SideLine>
							<div/>
						</SideLine>
					</SocialWrapper>
					<SocialWrapper>
						<SideLine>
							<div/>
						</SideLine>
						<SocialLinks>
							{ Object.keys( site!.siteMetadata!.social! ).map( ( handle ) => {
								const { link, Component } = getHandleDetails( handle, site );
								return (
									<Link
										to={ link }
										target="_blank"
										rel="noopener noreferrer nofollow"
										key={ link }
									>
										<Component style={ { fill: colors.fgColor } }/>
									</Link>
								);
							} ) }
						</SocialLinks>
						<SideLine>
							<div/>
						</SideLine>
					</SocialWrapper>
				</div>
			) }
		</Container>
	);
};
