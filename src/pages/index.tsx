import { default as React, useEffect, useState } from "react";
import { useMount } from "react-use";
import { Experience } from "../components/Experience";
import Footer from "../components/Footer";
import { FullPage, FullPageWrapper } from "../components/FullPage";
import Head from "../components/Head";
import Intro from "../components/Intro";
import { LeftNav } from "../components/LeftNav";
import { Projects } from "../components/Projects";
import { RightNav } from "../components/RightNav";
import Toolbox from "../components/Toolbox";
import TopNav from "../components/TopNav";
import { darkThemeColors, lightThemeColors, Theme, ThemeProvider } from "../utils";
import { GlobalStyles } from "../utils/globalStyles";
import "@fontsource/montserrat";
import "@fontsource/fjalla-one";

export default () => {
	const [ theme, setTheme ] = useState<Theme>( {
		colors: lightThemeColors,
		isDark: false
	} );

	useEffect( () => {
		document.body.style.backgroundColor = theme.colors.bgColor;
		document.body.style.color = theme.colors.fgColor;
	}, [ theme ] );

	useMount( () => {
		const theme = localStorage.getItem( "theme" );
		if ( theme ) {
			if ( theme === "dark" ) {
				setTheme( { colors: darkThemeColors, isDark: true } );
			}
		} else {
			if ( matchMedia( "(prefers-color-scheme:dark)" ).matches ) {
				setTheme( { colors: darkThemeColors, isDark: true } );
			}
		}
	} );

	return (
		<ThemeProvider value={ { ...theme, setTheme } }>
			<GlobalStyles/>
			<Head/>
			<FullPageWrapper>
				<TopNav/>
				<LeftNav/>
				<RightNav/>
				<FullPage>
					<Intro/>
				</FullPage>
				<FullPage>
					<Toolbox/>
				</FullPage>
				<FullPage>
					<Projects/>
				</FullPage>
				<FullPage>
					<Experience/>
				</FullPage>
				<FullPage>
					<Footer/>
				</FullPage>
			</FullPageWrapper>
		</ThemeProvider>
	);
};
