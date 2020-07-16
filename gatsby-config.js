module.exports = {
	plugins: [
		{
			resolve: "gatsby-plugin-react-svg",
			options: { rule: { include: /icons/ } }
		},
		"gatsby-plugin-sass"
	],
	siteMetadata: {
		title: "Yash Gupta"
	}
};
