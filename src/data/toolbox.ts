import {
	siAngular,
	siApachekafka,
	siApollographql,
	siDatabricks,
	siDocker,
	siExpo,
	siGraphql,
	siIonic,
	siKong,
	siKubernetes,
	siMongodb,
	siNestjs,
	siNextdotjs,
	siNodedotjs,
	siOpenjdk,
	siPostgresql,
	siPython,
	siRabbitmq,
	siReact,
	siRedux,
	siSpringboot,
	siTurborepo,
	siTypescript
} from "simple-icons";

export type GroupId = "frontend" | "backend" | "mobile" | "data" | "cloud";

export interface Tool {
	id: string;
	name: string;
	group: GroupId;
	/** Simple Icons path data on a 24×24 grid; tools without a mark get a monogram */
	icon?: string;
	monogram?: string;
}

export const groups: { id: GroupId; label: string }[] = [
	{ id: "frontend", label: "frontend" },
	{ id: "backend", label: "backend" },
	{ id: "mobile", label: "mobile" },
	{ id: "data", label: "data" },
	{ id: "cloud", label: "cloud" }
];

export const tools: Tool[] = [
	{ id: "react", name: "React", group: "frontend", icon: siReact.path },
	{ id: "nextjs", name: "Next.js", group: "frontend", icon: siNextdotjs.path },
	{ id: "angular", name: "Angular", group: "frontend", icon: siAngular.path },
	{ id: "typescript", name: "TypeScript", group: "frontend", icon: siTypescript.path },
	{ id: "redux", name: "Redux", group: "frontend", icon: siRedux.path },
	{ id: "turborepo", name: "Turborepo", group: "frontend", icon: siTurborepo.path },

	{ id: "nodejs", name: "Node.js", group: "backend", icon: siNodedotjs.path },
	{ id: "nestjs", name: "NestJS", group: "backend", icon: siNestjs.path },
	{ id: "java", name: "Java", group: "backend", icon: siOpenjdk.path },
	{ id: "springboot", name: "Spring Boot", group: "backend", icon: siSpringboot.path },
	{ id: "micronaut", name: "Micronaut", group: "backend", monogram: "Mn" },
	{ id: "python", name: "Python", group: "backend", icon: siPython.path },
	{ id: "graphql", name: "GraphQL", group: "backend", icon: siGraphql.path },
	{ id: "apollo", name: "Apollo", group: "backend", icon: siApollographql.path },

	{ id: "reactnative", name: "React Native", group: "mobile", monogram: "RN" },
	{ id: "expo", name: "Expo", group: "mobile", icon: siExpo.path },
	{ id: "ionic", name: "Ionic", group: "mobile", icon: siIonic.path },

	{ id: "postgresql", name: "PostgreSQL", group: "data", icon: siPostgresql.path },
	{ id: "mongodb", name: "MongoDB", group: "data", icon: siMongodb.path },
	{ id: "kafka", name: "Kafka", group: "data", icon: siApachekafka.path },
	{ id: "rabbitmq", name: "RabbitMQ", group: "data", icon: siRabbitmq.path },
	{ id: "hazelcast", name: "Hazelcast", group: "data", monogram: "Hz" },
	{ id: "databricks", name: "Databricks", group: "data", icon: siDatabricks.path },

	{ id: "docker", name: "Docker", group: "cloud", icon: siDocker.path },
	{ id: "kubernetes", name: "Kubernetes", group: "cloud", icon: siKubernetes.path },
	{ id: "azure", name: "Azure", group: "cloud", monogram: "Az" },
	{ id: "aws", name: "AWS", group: "cloud", monogram: "aws" },
	{ id: "kong", name: "Kong", group: "cloud", icon: siKong.path }
];

/** Tools that work together in projects Yash has shipped */
export const links: [ string, string ][] = [
	[ "react", "nextjs" ],
	[ "react", "reactnative" ],
	[ "react", "redux" ],
	[ "react", "ionic" ],
	[ "react", "apollo" ],
	[ "typescript", "react" ],
	[ "typescript", "nodejs" ],
	[ "nextjs", "turborepo" ],
	[ "reactnative", "expo" ],
	[ "nodejs", "nestjs" ],
	[ "nestjs", "graphql" ],
	[ "nestjs", "postgresql" ],
	[ "nestjs", "mongodb" ],
	[ "graphql", "apollo" ],
	[ "java", "springboot" ],
	[ "java", "micronaut" ],
	[ "springboot", "kafka" ],
	[ "springboot", "rabbitmq" ],
	[ "springboot", "hazelcast" ],
	[ "python", "databricks" ],
	[ "databricks", "azure" ],
	[ "kubernetes", "docker" ],
	[ "kubernetes", "azure" ],
	[ "kong", "kubernetes" ],
	[ "nodejs", "aws" ],
	[ "docker", "aws" ]
];
