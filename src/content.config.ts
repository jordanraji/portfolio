import { defineCollection, reference, z } from "astro:content";
import { file } from "astro/loaders";

const achievement = z.object({
	text: z.string(),
	categories: z.array(z.string()),
});

const companies = defineCollection({
	loader: file("src/data/career.raw.json", {
		parser: (text) => JSON.parse(text).companies,
	}),
	schema: z.object({
		id: z.string(),
		name: z.string(),
		url: z.string().url().optional(),
		location: z.string(),
	}),
});

const skills = defineCollection({
	loader: file("src/data/career.raw.json", {
		parser: (text) => JSON.parse(text).skills,
	}),
	schema: z.object({
		id: z.string(),
		name: z.string(),
		category: z.string(),
		importance: z.enum(["core", "secondary"]),
		keywords: z.array(z.string()).optional(),
		yearsExperience: z.number().optional(),
		proficiency: z.enum(["intermediate", "advanced", "expert"]).optional(),
		icon: z.string().optional(),
		url: z.string().url().optional(),
	}),
});

const experiences = defineCollection({
	loader: file("src/data/career.raw.json", {
		parser: (text) => JSON.parse(text).experiences,
	}),
	schema: z.object({
		id: z.string(),
		companyId: reference("companies"),
		collections: z.array(z.string()),
		tags: z.array(z.string()),
		relatedSkills: z.array(reference("skills")),
		metadata: z.object({
			dateStart: z.string(),
			dateEnd: z.string().nullable(),
		}),
		languages: z.object({
			en: z.object({
				role: z.string(),
				summary: z.string(),
				achievements: z.array(achievement),
			}),
			es: z.object({
				role: z.string(),
				summary: z.string(),
				achievements: z.array(achievement),
			}),
		}),
	}),
});

const projects = defineCollection({
	loader: file("src/data/career.raw.json", {
		parser: (text) => JSON.parse(text).projects,
	}),
	schema: z.object({
		id: z.string(),
		projectType: z.string(),
		experienceId: reference("experiences").nullable(),
		clientId: reference("companies").nullable(),
		collections: z.array(z.string()),
		tags: z.array(z.string()),
		relatedSkills: z.array(reference("skills")),
		urlGitHub: z.string().url().optional(),
		metadata: z.object({
			status: z.string(),
			dateStart: z.string(),
			dateEnd: z.string(),
		}),
		languages: z.object({
			en: z.object({
				title: z.string(),
				role: z.string(),
				shortDescription: z.string(),
				detailedContent: z
					.object({
						context: z.string(),
						challenge: z.string(),
						solution: z.string(),
					})
					.optional(),
				resumeBullets: z.array(achievement),
			}),
			es: z.object({
				title: z.string(),
				role: z.string(),
				shortDescription: z.string(),
				detailedContent: z
					.object({
						context: z.string(),
						challenge: z.string(),
						solution: z.string(),
					})
					.optional(),
				resumeBullets: z.array(achievement),
			}),
		}),
	}),
});

const publications = defineCollection({
	loader: file("src/data/career.raw.json", {
		parser: (text) => JSON.parse(text).publications,
	}),
	schema: z.object({
		id: z.string(),
		title: z.string(),
		authors: z.array(z.string()),
		publisher: z.string(),
		date: z.string(),
		doi: z.string().optional(),
		url: z.string().url().optional(),
		relatedSkills: z.array(reference("skills")),
		languages: z.object({
			en: z.object({ abstract: z.string() }),
			es: z.object({ abstract: z.string() }),
		}),
	}),
});

const teaching = defineCollection({
	loader: file("src/data/career.raw.json", {
		parser: (text) => JSON.parse(text).teaching,
	}),
	schema: z.object({
		id: z.string(),
		institutionId: reference("companies"),
		collections: z.array(z.string()),
		metadata: z.object({
			dateStart: z.string(),
			dateEnd: z.string(),
		}),
		languages: z.object({
			en: z.object({
				role: z.string(),
				courses: z.array(z.string()),
				achievements: z.array(z.string()),
			}),
			es: z.object({
				role: z.string(),
				courses: z.array(z.string()),
				achievements: z.array(z.string()),
			}),
		}),
	}),
});

export const collections = {
	companies,
	skills,
	experiences,
	projects,
	publications,
	teaching,
};
