import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import { Helmet } from "react-helmet";

const query = graphql`
	{
		site {
			buildTime(formatString: "YYYY-MM-DD")
			siteMetadata {
				title
				me
				title
				email
				description
				keywords
				siteLanguage
				ogLanguage
				siteUrl
				headline
				fbUsername
				twitterUsername
			}
		}
		file(name: { eq: "siteImage" }) {
			name
			childImageSharp {
				resize(width: 400) {
					src
					aspectRatio
				}
			}
		}
	}
`;

export default () => {
	const {
		site: { siteMetadata, buildTime },
		file: {
			childImageSharp: {
				resize: { src: image }
			}
		}
	} = useStaticQuery(query);

	const schemaOrgWebPage = {
		"@context": "http://schema.org",
		"@type": "WebPage",
		url: siteMetadata.siteUrl,
		headline: siteMetadata.headline,
		inLanguage: siteMetadata.siteLanguage,
		mainEntityOfPage: siteMetadata.siteUrl,
		description: siteMetadata.description,
		name: siteMetadata.title,
		author: { "@type": "Person", name: siteMetadata.me },
		copyrightHolder: { "@type": "Person", name: siteMetadata.me },
		copyrightYear: "2019",
		creator: { "@type": "Person", name: siteMetadata.me },
		publisher: { "@type": "Person", name: siteMetadata.me },
		datePublished: "2020-07-15T10:30:00+01:00",
		dateModified: buildTime,
		image: { "@type": "ImageObject", url: `${siteMetadata.siteUrl}${image}` }
	};

	const breadcrumb = {
		"@context": "http://schema.org",
		"@type": "BreadcrumbList",
		description: "Breadcrumbs list",
		name: "Breadcrumbs",
		itemListElement: [
			{
				"@type": "ListItem",
				item: { "@id": siteMetadata.siteUrl, name: "Homepage" },
				position: 1
			}
		]
	};

	return (
		<Helmet
			title={siteMetadata.title}
			defer={false}
			htmlAttributes={{ lang: siteMetadata.siteLanguage }}
		>
			<meta charSet="utf-8" />
			<link
				href="https://fonts.googleapis.com/css2?family=Fjalla+One&family=Montserrat:wght@300;700&display=swap"
				rel="stylesheet"
			/>
			<link rel="canonical" href={siteMetadata.siteUrl} />
			<meta httpEquiv="X-UA-Compatible" content="IE=edge" />

			<meta name="image" content={image} />
			<meta
				name="viewport"
				content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=10"
			/>
			<meta name="description" content={siteMetadata.description} />
			<meta name="keywords" content={siteMetadata.keywords} />

			<script type="application/ld+json">
				{JSON.stringify(schemaOrgWebPage)}
			</script>
			<script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>

			<meta property="og:site_name" content={siteMetadata.fbUsername} />
			<meta property="og:locale" content={siteMetadata.ogLanguage} />
			<meta property="og:url" content={siteMetadata.siteUrl} />
			<meta property="og:type" content="website" />
			<meta property="og:title" content={siteMetadata.title} />
			<meta property="og:description" content={siteMetadata.description} />
			<meta property="og:image" content={image} />
			<meta property="og:image:alt" content={siteMetadata.description} />

			<meta name="twitter:creator" content={siteMetadata.twitterUsername} />
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:title" content={siteMetadata.title} />
			<meta name="twitter:description" content={siteMetadata.description} />
			<meta name="twitter:image" content={image} />
			<meta name="twitter:image:alt" content={siteMetadata.description} />

			<meta name="theme-color" content="#00a9a5" />
			<meta name="mobile-web-app-capable" content="yes" />

			<meta name="apple-mobile-web-app-title" content={siteMetadata.title} />
			<meta name="apple-mobile-web-app-capable" content="yes" />
			<meta name="apple-mobile-web-app-status-bar-style" content="default" />

			<meta name="msapplication-navbutton-color" content="#00a9a5" />
			<meta name="msapplication-TileColor" content="#00a9a5" />

			<meta name="application-name" content={siteMetadata.me} />
			<meta name="msapplication-tooltip" content={siteMetadata.me} />
			<meta name="msapplication-starturl" content="/" />
		</Helmet>
	);
};
