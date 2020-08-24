import { graphql, useStaticQuery } from "gatsby";
import { OutboundLink } from "gatsby-plugin-google-analytics";
import React, { useContext } from "react";
import styled from "styled-components";
import { ThemeContext } from "../utils";

export const query = graphql`
	{
		site {
			siteMetadata {
				email
			}
		}
	}
`;

const TopSideLine = styled.div`
	flex: 1;
	margin: 0px 19px;

	& > div {
		background-color: #fca311;
		width: 2px;
		height: 100%;
	}

	margin-top: 90px;
	margin-bottom: 15px;
`;

const BottomSideLine = styled.div`
	flex: 1;
	margin: 0px 19px;

	& > div {
		background-color: #fca311;
		width: 2px;
		height: 100%;
	}

	margin-top: 15px;
	flex: unset;
	height: 135px;
`;

const RightNavContainer = styled.div`
	position: fixed;
	top: 0;
	bottom: 0;
	flex-direction: column;
	justify-content: flex-end;
	align-items: center;
	width: 40px;
	display: none;
	right: 0;
	padding-right: 20px;

	a {
		writing-mode: vertical-lr;
		text-decoration: none;
		margin: 15px 5px;
		margin-right: 0px;

		&:hover {
			color: #fca311 !important;
		}
	}

	@media only screen and (min-width: 900px) {
		display: flex;
		padding-right: 30px;
	}
`;

export const RightNav = () => {
	const { colors } = useContext(ThemeContext);
	const { site } = useStaticQuery(query);

	return (
		<RightNavContainer>
			<TopSideLine>
				<div />
			</TopSideLine>
			<OutboundLink
				style={{ color: colors.fgColor }}
				href={`mailto:${site?.siteMetadata?.email}`}
			>
				{site?.siteMetadata?.email}
			</OutboundLink>
			<BottomSideLine>
				<div />
			</BottomSideLine>
		</RightNavContainer>
	);
};
