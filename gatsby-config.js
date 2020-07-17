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
				path: join(__dirname, "src", "assets", "images")
			}
		},
		"gatsby-plugin-sass",
		"gatsby-transformer-sharp",
		"gatsby-plugin-sharp"
	],
	siteMetadata: {
		me: "Yash Gupta",
		social: {
			facebook: "https://facebook.com/gyuapstha",
			twitter: "https://twitter.com/YashGup14686444",
			linkedin: "https://www.linkedin.com/in/gyuapstha/",
			github: "https://github.com/gyash24x7",
			instagram: "https://instagram.com/__yash.gupta_/"
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
		toolbox: {}
	}
};
