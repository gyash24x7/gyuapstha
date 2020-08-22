import styled from "styled-components";

export const FullPage = styled.section`
	min-height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	& > div {
		opacity: 1;
		-webkit-transition: opacity cubic-bezier(0.86, 0, 0.07, 1) 800ms;
		transition: opacity cubic-bezier(0.86, 0, 0.07, 1) 800ms;
	}
`;

export const FullPageWrapper = styled.div`
	height: 100vh;
	overflow-y: auto;
`;

export const Container = styled.div`
	width: 100vw;
	min-height: calc(100vh - 80px);
	margin-top: 80px;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	padding-left: 30px;
	padding-right: 30px;

	& > div {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}

	@media only screen and (min-width: 900px) {
		margin-top: 100px;
		min-height: calc(100vh - 100px);
		padding-left: 150px;
		padding-right: 150px;
	}
`;
