module.exports = {
	plugins: [
		"gatsby-plugin-emotion",
		"gatsby-plugin-sass",
		"gatsby-plugin-react-svg",
		{
			resolve: "gatsby-plugin-google-fonts",
			options: {
				fonts: ["oswald:300", "montserrat:600"],
				display: "swap"
			}
		}
	]
};
