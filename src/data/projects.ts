export interface Project {
	/** Two-letter corner index for the card */
	index: string;
	title: string;
	description: string;
	points: string[];
	tech?: string[];
	links?: { label: string; href: string }[];
	pip?: "marigold" | "chilli" | "peacock";
}

/** Source: résumé, plus Hacknotes from the v1 site. */
export const projects: Project[] = [
	{
		index: "ST",
		title: "Stairway",
		description: "A real-time multiplayer game arena for Literature, Call Break and Wordle, playable on Android, iOS and the web.",
		points: [
			"Built and deployed it cross-platform from a single real-time codebase.",
			"Grew its own scalable design system and React UI library along the way.",
			"Structured as a modern monorepo with Turborepo and Next.js."
		],
		tech: [ "React", "Next.js", "Turborepo" ],
		pip: "chilli"
	},
	{
		index: "SP",
		title: "Shaastra Prime",
		description: "A suite of in-house cloud apps that ran the internal workings of Shaastra, the tech fest of IIT Madras.",
		points: [
			"One home for 500+ members across 12 teams.",
			"A task manager that kept the fest's teams talking to each other.",
			"A registration portal with a live dashboard of sign-ups and insights.",
			"A room allocation app that made participants' stay smoother."
		],
		pip: "peacock"
	},
	{
		index: "HN",
		title: "Hacknotes",
		description: "A light, cross-platform app for jotting down ideas and tasks the moment they show up.",
		points: [
			"Built around one idea: just write it down.",
			"Syncs across Android, iOS and the web."
		],
		tech: [ "React Native", "React", "NestJS" ],
		links: [
			{ label: "Code", href: "https://github.com/gyash24x7/hacknotes" },
			{
				label: "Android app",
				href: "https://github.com/gyash24x7/hacknotes/releases/download/v1.0/hacknotes.apk"
			}
		],
		pip: "marigold"
	}
];
