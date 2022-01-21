const { join } = require("path");

module.exports = {
	plugins: [
		{
			resolve: "gatsby-plugin-prefetch-google-fonts",
			options: {
				fonts: [
					{ family: "Montserrat", variants: ["300", "700"] },
					{ family: "Fjalla One" }
				]
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
		"gatsby-plugin-styled-components",
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
		"gatsby-plugin-offline"
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
				name: "Honeywell",
				url:"https://honeywell.com",
				intro:"Honeywell is a MNC headquartered in Charlotte, North Carolina",
				position: "Software Engineer II",
				duration: "August 2020 - Present",
				points: [
					"Integral part of Intelligrated Software Team developing Warehouse Execution System for giants like BigLots, DMWH, Target",
					"Developed Microservices in Java with Spring Boot, RabbitMQ, Postgres, Kafka",
					"Orchestrated Deployment of Microservice Architecture in multiple environments using Kubernetes",
					"Maintained CI/CD pipeline for the project with rigorous and multi-level testing stages"
				]
			},
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
		],
		projects: [
			{
				title: "Hacknotes",
				description:
					"Hacknotes is a intuitive, light-weight application to jot down youtr ideas and tasks. Just write it down. It's cross platform app and syncs across various platforms. Available on Android, iOS and Web.",
				github: "https://github.com/gyash24x7/hacknotes",
				apkLink:
					"https://github.com/gyash24x7/hacknotes/releases/download/v1.0/hacknotes.apk",
				webLink: "https://hacknotes.yashgupta.dev",
				logo: "hacknotes",
				tech: ["React Native", "React", "NestJS"]
			},
			{
				title: "Literature",
				description:
					"Literature or Canadian Fish is a 6 player card game played in	teams of 3. Each team aims to score as many half-sets as possible. The team which scores more half sets wins. Available on Android, iOS and Web.",
				github: "https://github.com/gyash24x7/littplay",
				apkLink:
					"https://github.com/gyash24x7/littplay/releases/download/v1.0/literature-v1.0.apk",
				webLink: "https://literature.yashgupta.dev",
				logo: "literature",
				tech: ["Ionic", "React", "GraphQL", "NestJS"]
			}
		]
	}
};
