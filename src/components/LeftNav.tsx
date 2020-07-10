/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { getThemeStyles, useTheme } from "../theme";

export const LeftNav = () => {
	const [theme] = useTheme();
	const { color } = getThemeStyles(theme);

	const leftNavCss = css`
		position: fixed;
		left: 0;
		top: 0;
		bottom: 0;
		padding-left: 30px;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: center;
		width: 40px;
		z-index: 1;

		&::after,
		&::before {
			content: "";
			display: block;
			width: 2px;
			height: 240px;
			border-radius: 2px;
			margin: 0px 19px;
			margin-top: 30px;
			background-color: #00a9a5;
		}

		&::before {
			height: calc(100vh - 550px);
			margin-bottom: 30px;
			margin-top: 0px;
		}
	`;

	const emailCss = css`
		writing-mode: vertical-lr;
		text-decoration: none;
		color: ${color};
		transition: cubic-bezier(0.86, 0, 0.07, 1) 500ms;
		-webkit-transition: cubic-bezier(0.86, 0, 0.07, 1) 500ms;
	`;

	return (
		<div css={leftNavCss}>
			<a css={emailCss} href="mailto://yash.gupta.0519@gmail.com">
				yash.gupta.0519@gmail.com
			</a>
		</div>
	);
};
