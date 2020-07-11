/** @jsx jsx */
import { css, Global, jsx } from "@emotion/core";
import { useWindowSize } from "react-use";
import { getThemeStyles, useTheme } from "../theme";
import { getContainerWidth } from "../utils";
export const GlobalStyles = () => {
	const [theme] = useTheme();
	const { color, primary } = getThemeStyles(theme);
	const { width } = useWindowSize();

	return (
		<Global
			styles={css`
				body {
					font-family: "oswald";
					-webkit-transition: color cubic-bezier(0.86, 0, 0.07, 1) 500ms;
					transition: color cubic-bezier(0.86, 0, 0.07, 1) 500ms;
					-webkit-transition: background cubic-bezier(0.86, 0, 0.07, 1) 500ms;
					transition: background cubic-bezier(0.86, 0, 0.07, 1) 500ms;
				}

				.montserrat {
					font-family: "montserrat";
				}

				.app-button {
					padding: 15px 30px;
					background-color: transparent;
					border: 2px solid ${primary};
					border-radius: 10px;
					text-transform: uppercase;
					font-family: "montserrat";
					cursor: pointer;
					color: ${primary};
					transition: 200ms;
					-webkit-transition: 200ms;
					width: fit-content;

					&:hover {
						background-color: ${color};
					}
				}

				.container {
					width: ${getContainerWidth(width)};
					height: calc(100% - 120px);
					display: flex;
					flex-direction: column;
					justify-content: center;
					margin-top: 80px;
				}
			`}
		/>
	);
};
