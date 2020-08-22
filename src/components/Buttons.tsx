import styled from "styled-components";

export const AppButton = styled.button`
	padding: 15px 30px;
	font-family: "Fjalla One", sans-serif;
	text-transform: uppercase;
	background: none;
	border: 2px solid #fca311;
	border-radius: 10px;
	margin-top: 20px;
	cursor: pointer;
	font-size: 12px;
	text-decoration: none;

	&:hover {
		background-color: #fca311;
	}

	@media only screen and (min-width: 900px) {
		padding: 20px 40px;
		font-size: 16px;
	}
`;
