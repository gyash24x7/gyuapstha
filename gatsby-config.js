const { join } = require("path");

module.exports = {
	plugins: [
		{
			resolve: "gatsby-plugin-google-analytics",
			options: {
				trackingId: "UA-175821612-1",
				head: true,
				optimizeId: "OPT-WK6Q6CT",
				anonymize: false,
				respectDNT: false
			}
		},
		{
			resolve: "gatsby-plugin-google-tagmanager",
			options: {
				id: "GTM-MPT2ZR9",
				includeInDevelopment: false,
				defaultDataLayer: { platform: "gatsby" },
				routeChangeEventName: "PORTFOLIO_ROUTE_CHANGE_EVENT",
				gtmAuth: "Yt4vWsVNj3Mez5pK18ptHQ",
				gtmPreview: "env-3"
			}
		},
		{
			resolve: "gatsby-plugin-react-svg",
			options: { rule: { include: /icons/ } }
		},
		{
			resolve: "gatsby-source-filesystem",
			options: { name: "images", path: join(__dirname, "src", "assets") }
		},
		"gatsby-plugin-sass",
		"gatsby-transformer-sharp",
		"gatsby-plugin-sharp",
		"gatsby-plugin-react-helmet",
		{
			resolve: "gatsby-plugin-manifest",
			options: {
				name: "Yash Gupta",
				short_name: "yash-gupta",
				theme_color: "#fca311",
				background_color: "#141414",
				display: "standalone",
				start_url: "/",
				icon: "src/assets/logo.png",
				cache_busting_mode: "none",
				icon_options: { purpose: "any maskable" }
			}
		},
		{
			resolve: "gatsby-plugin-iltorb",
			options: { extensions: ["css", "html", "js", "svg"] }
		},
		{
			resolve: "gatsby-plugin-offline",
			options: {
				precachePages: ["/pages/"],
				workboxConfig: { globPatterns: ["**/*"] }
			}
		}
	],
	siteMetadata: {
		me: "Yash Gupta",
		title: "Yash Gupta | Developer",
		social: {
			facebook: "https://facebook.com/gyuapstha",
			twitter: "https://twitter.com/YashGup14686444",
			linkedin: "https://www.linkedin.com/in/gyuapstha",
			github: "https://github.com/gyash24x7",
			instagram: "https://instagram.com/__yash.gupta_"
		},
		email: "yash.gupta.0519@gmail.com",
		emailAlt: "contact@yashgupta.dev",
		intro:
			"An IIT Madras graduate, based in Kanpur, India specializing in building remarkable websites, applications and everything in between.",
		typed: [
			"I am a Frontend Developer.",
			"I work on the Backend too.",
			"I build things for the web.",
			"And for Mobile as well."
		],
		partingNote:
			"I'm glad that you are interested in what I do. At present, I'm looking for full‑time on‑site job offers across the globe.",
		description:
			"Hi, I am a developer. I work on both frontend and backend. I am skilled in NodeJS, React and related frameworks and libraries. I am actively looking for a full-time job across the globe.",
		keywords:
			"Developer Frontend Backend Software Engineer React NodeJS NestJS NextJS HTML CSS Sass Emotion MongoDB Postgres Redux Hire Available App Application React Native Android iOS Javascript Typescript Angular Express Hapi Fastify UI UX Gatsby Expo cross-platform Web Development Node Jobs Full-stack fullstack Stack MERNStack MEAN MERN GraphQL graph database",
		siteUrl: "https://yashgupta.dev",
		siteLanguage: "en",
		ogLanguage: "en_US",
		headline: "I'm Yash. React and NodeJS Full Stack Developer.",
		fbUsername: "gyuapstha",
		twitterUsername: "YashGup14686444",
		experience: [
			{
				name: "Hakimo",
				url: "https://hakimo.ai",
				intro:
					"Hakimo is an early stage startup based in US, focusing on security surveillance",
				position: "Software Developer",
				duration: "March 2020 - April 2020",
				points: [
					"Co-Headed the development of the primary cloud based application for viewing ​live camera feed and playback​ from security cameras using ​RTSP​ and ​AWS Kinesis Video Streams​ in React & Node.",
					"Orchestrated deployment of new Producer SDK Container for each customer using ​Docker​ and ​AWS."
				]
			},
			{
				name: "LeanAgri",
				url: "https://leanagri.com",
				intro: "AgriTech Startup based in Pune",
				position: "Software Development Intern",
				duration: "May 2019 - July 2019",
				points: [
					"Integral part of 5 member team working on Customer Relationship Management Software, driving ​33% increase​ in onboarded customers & ​generating leads",
					"Developed a ​cloud based​, Content Management System for creating and linking ​multilingual blogs",
					"Redesigned the User Interface for ​LeanAgri Enterprise​, B2B software for tracking farmer activities"
				]
			},
			{
				name: "W3Villa",
				url: "https://w3villa.com",
				intro: "Software Development Company based in Noida",
				position: "Web Development Intern",
				duration: "June 2018 - July 2018",
				points: [
					"Programmed a ​Realtime Notification System based on WebSockets and event-based APIs in ​NodeJs and implemented it in a Chat App used by over ​70 people​ within the company",
					"Collaborated with ​6 people​ to revamp e-commerce platform ‘APFusion’, written in AngularJS and Electron, visited by ​3000+​ ​users​ daily"
				]
			}
		]
	}
};
