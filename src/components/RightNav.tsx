/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import Facebook from "../assets/facebook.svg";
import Github from "../assets/github.svg";
import Instagram from "../assets/instagram.svg";
import LinkedIn from "../assets/linkedin.svg";
import Twitter from "../assets/twitter.svg";
import { getThemeStyles, useTheme } from "../theme";

export const RightNav = () => {
	const [theme] = useTheme();
	const { color, primary } = getThemeStyles(theme);

	const rightNavCss = css`
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		padding-right: 30px;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		width: 40px;
		z-index: 1;
		align-items: center;

		&::before,
		&::after {
			content: "";
			display: block;
			width: 2px;
			height: 120px;
			border-radius: 2px;
			margin: 0px 19px;
			margin-top: 15px;
			background-color: ${primary};
		}

		&::before {
			height: calc(100vh - 530px);
			margin-top: 0px;
			margin-bottom: 15px;
		}
	`;

	const socialIconCss = css`
		height: 25px;
		width: auto;
		margin-top: 15px;
		margin-bottom: 15px;
		cursor: pointer;
		fill: ${color};
		transition: cubic-bezier(0.86, 0, 0.07, 1) 500ms;
		-webkit-transition: cubic-bezier(0.86, 0, 0.07, 1) 500ms;

		&:hover {
			fill: ${primary};
		}
	`;

	return (
		<div css={rightNavCss}>
			<a
				href="https://twitter.com/YashGup14686444"
				target="_blank"
				rel="noopener noreferrer"
			>
				<Twitter css={socialIconCss} />
			</a>
			<a
				href="https://facebook.com/gyuapstha"
				target="_blank"
				rel="noopener noreferrer"
			>
				<Facebook css={socialIconCss} />
			</a>
			<a
				href="https://www.linkedin.com/in/gyuapstha/"
				target="_blank"
				rel="noopener noreferrer"
			>
				<LinkedIn css={socialIconCss} />
			</a>
			<a
				href="https://instagram.com/__yash.gupta_/"
				target="_blank"
				rel="noopener noreferrer"
			>
				<Instagram css={socialIconCss} />
			</a>
			<a
				href="https://github.com/gyash24x7"
				target="_blank"
				rel="noopener noreferrer"
			>
				<Github css={socialIconCss} />
			</a>
		</div>
	);
};
