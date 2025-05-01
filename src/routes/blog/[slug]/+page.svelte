<script lang="ts">
	import { browser } from '$app/environment';
	import type { Component } from 'svelte';
	import type { PostMetaItem } from '$lib/posts';
	import { Avatar } from 'bits-ui';
	import type { Author } from '$lib/authors';
	import { authors } from '$lib/authors';
	import { slugify } from '$lib/utils';

	let { data } = $props<{ data: PostMetaItem }>();
	const { slug, metadata } = data;

	const authorData: Author = authors.find(
		(a) => a.name.toLowerCase() === metadata.author?.toLowerCase()
	) ?? {
		name: metadata.author || 'Unknown Author',
		role: 'Contributor',
		avatar: '',
		bio: '',
		github: '',
		instagram: '',
		site: ''
	};

	const authorSlug = slugify(authorData.name);

	let postModule: Promise<{ default: Component }> | null = browser
		? import(`../../../posts/${slug}.svx`)
		: null;

	let articleRef: HTMLElement;
	let observer: MutationObserver | null = null;

	const copyIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`;
	const checkIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg>`;
	const errorIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-alert-circle"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>`;

	function copyCodeAction(node: HTMLElement) {
		function addCopyButtons() {
			const preBlocks = node.querySelectorAll('pre');
			preBlocks.forEach((pre) => {
				if (pre.querySelector('.copy-btn')) return;
				pre.classList.add('relative');
				const btn = document.createElement('button');
				btn.innerHTML = copyIconSvg;
				btn.className =
					'copy-btn absolute top-2 right-2 bg-background-alt p-1.5 rounded hover:bg-background transition-colors flex items-center justify-center';
				btn.setAttribute('aria-label', 'Copy code');
				btn.setAttribute('title', 'Copy code');
				btn.addEventListener('click', () => {
					const codeEl = pre.querySelector('code');
					if (codeEl) {
						navigator.clipboard
							.writeText(codeEl.textContent || '')
							.then(() => {
								btn.innerHTML = checkIconSvg;
								setTimeout(() => {
									btn.innerHTML = copyIconSvg;
								}, 2000);
							})
							.catch(() => {
								btn.innerHTML = errorIconSvg;
								setTimeout(() => {
									btn.innerHTML = copyIconSvg;
								}, 2000);
							});
					}
				});
				pre.appendChild(btn);
			});
		}
		observer = new MutationObserver(addCopyButtons);
		observer.observe(node, { childList: true, subtree: true });
		addCopyButtons();
		return {
			destroy() {
				observer?.disconnect();
				observer = null;
			}
		};
	}

	function getInitials(name: string): string {
		return name
			.split(' ')
			.map((part) => part.charAt(0))
			.join('')
			.toUpperCase()
			.substring(0, 2);
	}
</script>

<article
	bind:this={articleRef}
	use:copyCodeAction
	class="prose dark:prose-invert mx-auto px-6 py-12"
>
	<!-- Back button -->
	<a href="/blog" class=" mb-6 inline-flex items-center no-underline hover:text-blue-300">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="mr-2 h-5 w-5"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
		>
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
		</svg>
		Back to Blog
	</a>

	<h1 class="font-display mb-4 text-5xl">{metadata.title}</h1>
	<time class="mb-10 block text-sm">{metadata.date}</time>

	<a
		href="/authors/{authorSlug}"
		class="mb-12 block items-center gap-5 border-t border-b no-underline transition hover:text-blue-200"
	>
		<div class="flex items-center gap-5 border-t border-b py-6">
			<Avatar.Root
				delayMs={200}
				class="data-[status=loaded]:border-foreground bg-muted text-muted-foreground h-16 w-16 rounded-full border-2 text-[20px] font-medium uppercase shadow-sm data-[status=loading]:border-transparent"
			>
				<div
					class="flex h-full w-full items-center justify-center overflow-hidden rounded-full border-2 border-transparent"
				>
					<Avatar.Image
						src={authorData.avatar}
						alt={`@${authorData.name.toLowerCase().replace(/\s+/g, '')}`}
					/>
					<Avatar.Fallback class="border-muted border"
						>{getInitials(authorData.name)}</Avatar.Fallback
					>
				</div>
			</Avatar.Root>

			<div class="flex flex-col">
				<span class="text-lg font-semibold">{authorData.name}</span>
				<span class="text-muted-foreground">{authorData.role}</span>
			</div>
		</div>
	</a>

	{#if postModule}
		{#await postModule then mod}
			{@const Content = mod.default}
			<Content />
		{:catch error}
			<p class="text-destructive">Failed to load post content: {error.message}</p>
		{/await}
	{:else}
		<p>Loading post…</p>
	{/if}
</article>
