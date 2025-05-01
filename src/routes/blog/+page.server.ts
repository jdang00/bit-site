import type { PageServerLoad } from './$types';
import { getAllPosts } from '$lib/posts';

export const load: PageServerLoad = async () => {
	const all = await getAllPosts();

	const posts = all.map(({ slug, metadata }) => ({ slug, metadata }));

	return { posts };
};
