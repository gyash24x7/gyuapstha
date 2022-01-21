import { graphql, useStaticQuery } from "gatsby";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Caret from "../assets/icons/caret-forward.svg";
import { Container } from "./FullPage";
import { Heading } from "./Typography";

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

const ExperienceGrid = styled.div`
	width: 100%;
	max-width: 900px;
	margin-top: 50px;

	@media only screen and (max-width: 600px) {
		margin-top: unset;
	}
`;

const CompanyList = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	padding-bottom: 20px;

	@media only screen and (max-width: 400px) {
		padding-bottom: 10px;
	}
`;

const CompanyListItem = styled.div`
	flex: 1;
	text-align: center;
	padding: 15px 0px;
	font-family: "Fjalla One", sans-serif;
	border-bottom: 2px solid #666666;
	cursor: pointer;
	transition: 500ms ease-in-out;

	&:hover,
	&.active {
		color: #fca311;
		border-color: #fca311;
	}
`;

const PositionBlock = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: baseline;
	flex-wrap: wrap;
`;

const Position = styled.div`
	font-size: 24px;
	font-family: "Fjalla One", sans-serif;
	margin: 10px 0px;

	a {
		color: #fca311;
		text-decoration: none;
	}

	@media only screen and (min-width: 900px) {
		font-size: 30px;
	}

	@media only screen and (max-width: 400px) {
		font-size: 18px;
		margin: 5px 0px;
	}
`;

const Duration = styled.div`
	margin: 10px 0px;
	font-size: 16px;

	@media only screen and (max-width: 400px) {
		font-size: 12px;
		margin: 5px 0px;
	}
`;

const CompanyIntro = styled.div`
	font-style: italic;
	margin-bottom: 20px;
	margin-top: 10px;

	@media only screen and (max-width: 400px) {
		font-size: 14px;
		margin-top: 5px;
		margin-bottom: 10px;
	}
`;

const Point = styled.div`
	margin-top: 25px;
	display: flex;

	@media only screen and (max-width: 400px) {
		margin-top: 10px;
		font-size: 14px;
	}
`;

const Bullet = styled.span`
	margin-right: 5px;

	@media only screen and (min-width: 900px) {
		margin-right: 15px;
	}
`;

const CompanyDescription = styled.div`
	height: 415px;
`;

export const Experience = () => {
	const { site } = useStaticQuery( ExperienceQuery );
	const [ companyData, setCompanyData ] = useState(
		site.siteMetadata.experience[ 0 ]
	);
	const handleCompanySelect = ( i: number ) => () => {
		setCompanyData( site.siteMetadata.experience[ i ] );
	};

	useEffect( () => {
		const companyListItem = document.getElementById( companyData.name );
		companyListItem?.classList.add( "active" );
		return () => companyListItem?.classList.remove( "active" );
	}, [ companyData ] );

	return (
		<Container>
			<div>
				<div>
					<Heading>Where I've Worked</Heading>
				</div>
				<ExperienceGrid>
					<CompanyList>
						{ site.siteMetadata.experience.map( ( { name }: any, i: number ) => (
							<CompanyListItem
								onClick={ handleCompanySelect( i ) }
								key={ name }
								id={ name }
							>
								{ name }
							</CompanyListItem>
						) ) }
					</CompanyList>
					<CompanyDescription>
						<PositionBlock>
							<Position>
								{ companyData.position }&nbsp;&nbsp;
								<a
									href={ companyData.url }
									target="_blank"
									rel="noopener noreferrer nofollow"
								>
									@{ companyData.name }
								</a>
							</Position>
							<Duration>({ companyData.duration })</Duration>
						</PositionBlock>
						<CompanyIntro>{ companyData.intro }</CompanyIntro>
						{ companyData.points.map( ( point: string ) => (
							<Point key={ point }>
								<Bullet>
									<Caret/>
								</Bullet>
								<span>{ point }</span>
							</Point>
						) ) }
					</CompanyDescription>
				</ExperienceGrid>
			</div>
		</Container>
	);
};
