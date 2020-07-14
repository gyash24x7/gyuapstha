import App, { AppContext, AppInitialProps } from "next/app";
import Head from "next/head";
import "normalize.css/normalize.css";
import React, { Fragment } from "react";
import "../styles/global.css";

export default class MyApp extends App {
	static async getInitialProps({ Component, ctx }: AppContext) {
		let pageProps = {};
		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx);
		}
		return { pageProps } as AppInitialProps;
	}

	render() {
		const { Component, pageProps } = this.props;
		return (
			<Fragment>
				<Head>
					<title>Yash Gupta | Developer | Software Engineer</title>
					<link
						href="https://fonts.googleapis.com/css?family=Oswald:300|Montserrat:600&amp;display=swap"
						rel="stylesheet"
					/>
					<meta charSet="utf-8" />
					<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
					<meta
						name="viewport"
						content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
					/>
					<meta
						name="description"
						content="Hi, I am a developer. I work on both frontend and backend. I am skilled in NodeJS, React and related frameworks and libraries. I am actively looking for a full-time job across the globe."
					/>
					<meta
						name="keywords"
						content="Developer Frontend Backend Software Engineer React NodeJS NestJS NextJS HTML CSS Sass Emotion MongoDB Postgres Redux Hire Available"
					/>

					<meta name="theme-color" content="#00a9a5" />
					<meta name="mobile-web-app-capable" content="yes" />

					<meta
						name="apple-mobile-web-app-title"
						content="Yash Gupta | Developer"
					/>
					<meta name="apple-mobile-web-app-capable" content="yes" />
					<meta
						name="apple-mobile-web-app-status-bar-style"
						content="default"
					/>

					<meta name="msapplication-navbutton-color" content="#00a9a5" />
					<meta name="msapplication-TileColor" content="#00a9a5" />
					<meta
						name="msapplication-TileImage"
						content="/images/icons/icon-144x144.png"
					/>

					<meta name="application-name" content="Yash Gupta | Developer" />
					<meta name="msapplication-tooltip" content="Yash Gupta" />
					<meta name="msapplication-starturl" content="/" />

					<meta name="msapplication-tap-highlight" content="no" />
					<link rel="manifest" href="/manifest.json" />
				</Head>
				<Component {...pageProps} />
			</Fragment>
		);
	}
}
