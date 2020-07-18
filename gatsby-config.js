const { join } = require("path");

module.exports = {
	plugins: [
		{
			resolve: "gatsby-plugin-react-svg",
			options: { rule: { include: /icons/ } }
		},
		{
			resolve: "gatsby-source-filesystem",
			options: {
				name: "images",
				path: join(__dirname, "src", "assets")
			}
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
				theme_color: "#00a9a5",
				background_color: "#0a111f",
				display: "standalone",
				start_url: "/",
				icon: "src/assets/logo.png",
				cache_busting_mode: "none",
				icons: [
					{
						src: "src/assets/maskable_icon.png",
						sizes: "196x196",
						type: "image/png",
						purpose: "any maskable"
					}
				]
			}
		},
		{
			resolve: "gatsby-plugin-brotli",
			options: {
				extensions: ["css", "html", "js", "svg"]
			}
		},
		{
			resolve: "gatsby-plugin-offline",
			options: {
				precachePages: ["/pages/"],
				workboxConfig: {
					globPatterns: ["**/*"]
				}
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
		emailAlt: "contact@gyuapstha.me",
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
		siteUrl: "https://gyuapstha.me",
		siteLanguage: "en",
		ogLanguage: "en_US",
		headline: "I'm Yash. React and NodeJS Full Stack Developer.",
		fbUsername: "gyuapstha",
		twitterUsername: "YashGup14686444"
	}
};
