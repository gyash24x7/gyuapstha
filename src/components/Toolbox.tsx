/**@jsx jsx */
import { css, jsx } from "@emotion/core";
import ReactLogo from "../images/react-logo.png";
import { getThemeStyles, useTheme } from "../theme";

export const Toolbox = () => {
	const [theme] = useTheme();
	const { primary } = getThemeStyles(theme);
	const toolboxWrapperCss = css`
		width: calc(100% - 240px);
		height: calc(100% - 170px);
		padding: 120px;
		padding-bottom: 50px;

		h2 {
			font-size: 48px;
			font-family: "montserrat";
			margin: 10px -5px;
			color: ${primary};
		}
		h4 {
			margin: 5px 0px;
			font-size: 24px;
		}

		.heading-box {
			min-width: 50%;
		}
	`;

	const toolCardCss = css`
		flex: 1;

		img {
			width: 50%;
			height: auto;
		}
	`;

	return (
		<div css={toolboxWrapperCss}>
			<div className="app-row">
				<div className="app-col heading-box">
					<h2>My Toolbox</h2>
					<h4>Technologies I am familiar with and use frequently.</h4>
				</div>
				<div className="app-col">
					<div css={toolCardCss}>
						<img src={ReactLogo} alt="" />
					</div>
				</div>
				<div className="app-col">
					<div css={toolCardCss}>
						<img src={ReactLogo} alt="" />
					</div>
				</div>
				<div className="app-col">
					<div css={toolCardCss}>
						<img src={ReactLogo} alt="" />
					</div>
				</div>
				<div className="app-col">
					<div css={toolCardCss}>
						<img src={ReactLogo} alt="" />
					</div>
				</div>
				<div className="app-col">
					<div css={toolCardCss}>
						<img src={ReactLogo} alt="" />
					</div>
				</div>
				<div className="app-col">
					<div css={toolCardCss}>
						<img src={ReactLogo} alt="" />
					</div>
				</div>
				<div className="app-col">
					<div css={toolCardCss}>
						<img src={ReactLogo} alt="" />
					</div>
				</div>
				<div className="app-col">
					<div css={toolCardCss}>
						<img src={ReactLogo} alt="" />
					</div>
				</div>
			</div>
		</div>
	);
};
