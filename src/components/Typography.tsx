import styled from "styled-components";

export const Name = styled.div`
	font-size: 56px;
	font-family: "Fjalla One", sans-serif;
	margin: 10px 0px;
	color: #fca311;

	@media only screen and (max-width: 400px) {
		font-size: 48px;
	}

	@media only screen and (min-width: 900px) {
		font-size: 72px;
	}
`;

export const BodyText = styled.div`
	margin: 5px 0px;
	font-size: 18px;

	@media only screen and (max-width: 400px) {
		font-size: 16px;
	}

	@media only screen and (min-width: 900px) {
		font-size: 20px;
	}
`;

export const Intro = styled(BodyText)`
	margin-top: 70px;
	line-height: 30px;
	max-width: 900px;

	@media only screen and (max-width: 400px) {
		margin-top: 40px;
	}

	@media only screen and (min-width: 900px) {
		line-height: 40px;
		margin-top: 100px;
	}
`;

export const Heading = styled.div`
	width: 100%;
	font-size: 40px;
	font-family: "Fjalla One", sans-serif;
	margin: 10px 0px;
	color: #fca311;

	@media only screen and (max-width: 400px) {
		font-size: 32px;
	}

	@media only screen and (min-width: 900px) {
		font-size: 48px;
	}
`;

export const SubHeading = styled.div`
	width: 100%;
	margin: 5px 0px;
	font-size: 20px;
	line-height: 28px;

	@media only screen and (max-width: 400px) {
		font-size: 16px;
		line-height: 24px;
	}

	@media only screen and (min-width: 900px) {
		font-size: 24px;
		line-height: 32px;
	}
`;
