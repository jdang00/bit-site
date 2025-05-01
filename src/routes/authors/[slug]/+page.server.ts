import type { PageServerLoad } from './$types';
import type { Author } from '$lib/authors';
import { authors } from '$lib/authors';
import { error } from '@sveltejs/kit';
import { slugify } from '$lib/utils';

export const load: PageServerLoad = async ({ params }) => {
	const author: Author | undefined = authors.find((a) => slugify(a.name) === params.slug);

	if (!author) {
		throw error(404, 'Author not found');
	}

	return { author };
};
