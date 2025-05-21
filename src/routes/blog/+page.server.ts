import type { PageServerLoad } from './$types';
import { getAllPosts } from '$lib/posts';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.getSession();

	if (!session) {
		throw redirect(303, '/login');
	}

	const all = await getAllPosts();

	const posts = all.map(({ slug, metadata }) => ({ slug, metadata }));

	return {
		session,
		posts
	};
};
