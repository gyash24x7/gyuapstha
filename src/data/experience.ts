export interface Role {
	title: string;
	team?: string;
	start: string;
	/** Omit for a current role */
	end?: string;
	points: string[];
	awards?: string[];
}

export interface Company {
	name: string;
	url: string;
	about?: string;
	kind: "full-time" | "internship";
	/** Most recent first */
	roles: Role[];
}

/** Synced from the master branch (src/data/experience.ts): the current résumé, plus W3Villa. Most recent first. */
export const experience: Company[] = [
	{
		name: "Honeywell",
		url: "https://honeywell.com",
		about: "Honeywell Technology Solutions",
		kind: "full-time",
		roles: [
			{
				title: "Advanced Software Engineer",
				team: "Performance+",
				start: "Dec 2024",
				points: [
					"Own features of the Performance+ application end to end, from first design sketch to production, on Honeywell's Forge platform.",
					"Work across the whole stack: React interfaces that stay fast as they grow, backed by robust Node.js microservices."
				]
			},
			{
				title: "Advanced Software Engineer",
				team: "Flight Efficiency, Honeywell Aerospace",
				start: "Jul 2024",
				end: "Dec 2024",
				points: [
					"Joined the ETL team behind NextGen Flight Efficiency, Honeywell Aerospace's software for helping airlines fly more efficiently, built on Azure Databricks.",
					"Went looking for trouble in the ETL pipeline before it found us: traced the gaps where data could slip through and designed fixes to close them.",
					"Wrote Python tooling that cleans up raw flight data and flags missing records, so downstream analytics work from data the team can trust."
				]
			},
			{
				title: "Software Engineer II",
				team: "Intelligrated Software, Honeywell SPS",
				start: "Aug 2020",
				end: "Jul 2024",
				points: [
					"Designed and led the storage selection module that let the putaway service scale horizontally, using Hazelcast as a distributed cache. It earned a Silver Award.",
					"Tripled API performance by hunting down slow response paths, taking load capacity from 2k to 6k requests an hour. It won the SPS Star Award 2022.",
					"Drove the REDS framework, the groundwork for moving the warehouse execution system to Azure Cloud, and mapped out how Azure Service Bus and Kong Gateway plug into the existing AKS cluster.",
					"Filed an invention disclosure, “Data Processing via DataOps Platform in WES for multitenancy”, showing how a DataOps platform could cut data pipeline maintenance costs by ~40% while keeping HA/DR in place.",
					"Built the Java microservices that keep warehouses for retailers like Target and Big Lots moving, with Spring Boot, Apache Kafka, RabbitMQ and Hazelcast."
				],
				awards: [ "Silver Award", "SPS Star Award 2022" ]
			}
		]
	},
	{
		name: "Hakimo",
		url: "https://hakimo.ai",
		about: "Early-stage US startup focused on security surveillance",
		kind: "internship",
		roles: [
			{
				title: "Software Developer Intern",
				start: "Mar 2020",
				end: "Apr 2020",
				points: [
					"Co-led the build of Hakimo's core product: a cloud app for watching live feeds and playback from security cameras, streamed through RTSP and AWS Kinesis Video Streams.",
					"Wrote it in React and Node.js, pushing live video to the browser over WebSockets.",
					"Made onboarding a customer a deployment, not a project: each one got its own Producer SDK container, spun up with Docker on AWS ECS."
				]
			}
		]
	},
	{
		name: "LeanAgri",
		url: "https://leanagri.com",
		about: "Agritech startup based in Pune",
		kind: "internship",
		roles: [
			{
				title: "Software Development Intern",
				start: "May 2019",
				end: "Jul 2019",
				points: [
					"One of five engineers on the CRM that grew onboarded customers by 33% and became a steady source of new leads.",
					"Built a multilingual blogging platform from scratch, serving farmers content in their own language based on where they are.",
					"Redesigned LeanAgri Enterprise, the B2B tool businesses use to track farmer activity, to make it clearer and easier to use."
				]
			}
		]
	},
	{
		name: "W3Villa",
		url: "https://w3villa.com",
		about: "Software development company based in Noida",
		kind: "internship",
		roles: [
			{
				title: "Web Development Intern",
				start: "Jun 2018",
				end: "Jul 2018",
				points: [
					"Built a real-time notification system in Node.js on WebSockets and event-based APIs, and shipped it inside the company chat app used by 70+ colleagues.",
					"Helped a team of six revamp APFusion, an AngularJS and Electron e-commerce platform with 3000+ daily visitors."
				]
			}
		]
	}
];
