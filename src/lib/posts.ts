// src/lib/posts.ts
import type { Component } from 'svelte';

export type PostMetadata = {
	title: string;
	date: string;
	description?: string;
	author?: string;
};

export type PostMetaItem = {
	slug: string;
	metadata: PostMetadata;
};

export type Post = PostMetaItem & {
	component: Component;
};

type MdxModule = {
	metadata: PostMetadata;
	default: Component;
};

const modules = import.meta.glob<MdxModule>('/src/posts/*.svx');

export async function getAllPosts(): Promise<Post[]> {
	const items: Post[] = [];

	// DEBUG: uncomment to verify your glob is finding files
	//console.log('mdx modules:', Object.keys(modules));

	for (const path in modules) {
		const slug = path
			.split('/')
			.pop()!
			.replace(/\.svx$/, '');

		const mod = await modules[path]();
		items.push({
			slug,
			metadata: mod.metadata,
			component: mod.default
		});
	}

	// newest first
	items.sort((a, b) => new Date(b.metadata.date).valueOf() - new Date(a.metadata.date).valueOf());

	return items;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
	const posts = await getAllPosts();
	return posts.find((p) => p.slug === slug) ?? null;
}
