module.exports = {
	plugins: [
		"gatsby-plugin-emotion",
		"gatsby-plugin-sass",
		{
			resolve: "gatsby-plugin-google-fonts",
			options: {
				fonts: ["oswald:300", "montserrat:600"],
				display: "swap"
			}
		},
		{
			resolve: "gatsby-plugin-react-svg",
			options: { rule: { include: /assets/ } }
		}
	]
};
