import { graphql, useStaticQuery } from "gatsby";
import React, { useContext } from "react";
import styled from "styled-components";
import { getHandleDetails, ThemeContext } from "../utils";

export const query = graphql`
	{
		site {
			siteMetadata {
				email
				social {
					facebook
					twitter
					linkedin
					github
					instagram
				}
			}
		}
	}
`;

const LeftNavContainer = styled.div`
	position: fixed;
	top: 0;
	bottom: 0;
	flex-direction: column;
	justify-content: flex-end;
	align-items: center;
	width: 40px;
	display: none;

	a {
		text-decoration: none;
	}

	left: 0;
	padding-left: 20px;

	@media only screen and (min-width: 900px) {
		display: flex;
		padding-left: 30px;
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

export const LeftNav = () => {
	const { colors } = useContext(ThemeContext);
	const { site } = useStaticQuery(query);

	return (
		<LeftNavContainer>
			<TopSideLine>
				<div />
			</TopSideLine>
			{Object.keys(site.siteMetadata.social).map((handle) => {
				const { link, Component } = getHandleDetails(handle, site);
				return (
					<a
						href={link}
						target="_blank"
						rel="noopener noreferrer nofollow"
						key={link}
					>
						<Component style={{ fill: colors.fgColor }} />
					</a>
				);
			})}
			<BottomSideLine>
				<div />
			</BottomSideLine>
		</LeftNavContainer>
	);
};

export const RightNav = () => {
	const { colors } = useContext(ThemeContext);
	const { site } = useStaticQuery(query);

	return (
		<RightNavContainer>
			<TopSideLine>
				<div />
			</TopSideLine>
			<a
				style={{ color: colors.fgColor }}
				href={`mailto:${site?.siteMetadata?.email}`}
			>
				{site?.siteMetadata?.email}
			</a>
			<BottomSideLine>
				<div />
			</BottomSideLine>
		</RightNavContainer>
	);
};
