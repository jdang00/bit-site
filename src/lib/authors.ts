export type Author = {
	name: string;
	role: string;
	avatar: string;
	bio: string;
	github: string;
	instagram: string;
	site?: string;
};

export const authors: Author[] = [
	{
		name: 'Justin A. Dang',
		role: 'Editor',
		avatar: 'https://9g74ko9d91.ufs.sh/f/f42f91d1-4c4e-4b6f-a604-66170a807a71-1bqzy.webp',
		bio: 'Justin Dang is a student at the Northeastern State University Oklahoma College of Optometry, where he blends his classical education and background in computer science to build tools like LearnTerms.com—designed to help students study with depth, precision, and meaning.',
		github: 'jdang00',
		instagram: 'justin_a_dang',
		site: 'https://justindang.dev'
	},
	{
		name: 'Jane Smith',
		role: 'UX Designer',
		avatar: '/images/authors/jane-smith.webp',
		bio: 'Creating user-centered experiences for web and mobile applications.',
		github: 'janesmith',
		instagram: 'janedesigns',
		site: 'https://janedesigns.io'
	}
];
