import type { PageServerLoad } from './$types';
import { getPostBySlug } from '$lib/posts';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const full = await getPostBySlug(params.slug);
	if (!full) throw error(404, 'Not found');

	return {
		slug: full.slug,
		metadata: full.metadata
	};
};
