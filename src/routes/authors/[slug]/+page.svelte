<script lang="ts">
	import type { Author } from '$lib/authors';
	let { data } = $props<{ author: Author }>();
	let author = data.author;
</script>

<div class="relative">
	<div
		class="from-background/50 to-background absolute inset-0 z-0 overflow-hidden bg-gradient-to-br"
	>
		<div
			class="absolute inset-0 opacity-[0.03]"
			style="background-image: radial-gradient(#000 1px, transparent 0); background-size: 40px 40px;"
		></div>
	</div>

	<div class="relative z-10 mx-auto max-w-4xl px-6 py-16">
		<div class="mb-12 flex flex-col items-center text-center">
			<div class="relative mb-6">
				<div
					class="from-primary/50 to-primary-foreground/50 absolute -inset-0.5 rounded-full bg-gradient-to-r opacity-70 blur"
				></div>
				<img
					src={author.avatar}
					alt={author.name}
					class="border-background relative h-32 w-32 rounded-full border-4 object-cover shadow-xl"
				/>
			</div>

			<h1
				class="font-display from-foreground to-foreground/80 mb-3 bg-gradient-to-r bg-clip-text text-5xl font-bold text-transparent"
			>
				{author.name}
			</h1>

			<div class="bg-primary/10 text-muted-foreground mb-6 inline-block rounded-full px-4 py-1">
				<p class="text-sm font-medium">{author.role}</p>
			</div>

			{#if author.bio}
				<p class=" max-w-2xl text-lg leading-relaxed">
					{author.bio}
				</p>
			{/if}

			<div class="mt-8 flex flex-wrap justify-center gap-3">
				{#if author.site}
					<a
						href={author.site}
						target="_blank"
						rel="noopener noreferrer"
						class="bg-background-alt hover:bg-primary/10 border-border flex items-center rounded-lg border px-4 py-2 transition-colors"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="mr-1"
							><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path
								d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
							/></svg
						>
						<span>Website</span>
					</a>
				{/if}

				{#if author.github}
					<a
						href={`https://github.com/${author.github}`}
						target="_blank"
						rel="noopener noreferrer"
						class="bg-background-alt hover:bg-primary/10 border-border flex items-center rounded-lg border px-4 py-2 transition-colors"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="mr-1"
							><path
								d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
							/><path d="M9 18c-4.51 2-5-2-7-2" /></svg
						>

						<span>GitHub</span>
					</a>
				{/if}

				{#if author.instagram}
					<a
						href={`https://instagram.com/${author.instagram}`}
						target="_blank"
						rel="noopener noreferrer"
						class="bg-background-alt hover:bg-primary/10 border-border flex items-center rounded-lg border px-4 py-2 transition-colors"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="mr-1"
							><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path
								d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"
							/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg
						>
						<span>Instagram</span>
					</a>
				{/if}
			</div>
		</div>

		<div class="border-border mt-16 border-t pt-8">
			<h2 class="mb-6 text-2xl font-bold">Recent Articles</h2>

			<div class="grid gap-6 md:grid-cols-2">
				<div
					class="border-border hover:border-primary/50 cursor-pointer rounded-lg border p-6 transition-colors"
				>
					<h3 class="mb-2 text-lg font-semibold">Sample Article Title</h3>
					<p class="text-muted-foreground">
						A brief description of the article would go here, enticing readers to click.
					</p>
					<div class="text-primary mt-4 text-sm">Read more →</div>
				</div>

				<div
					class="border-border hover:border-primary/50 cursor-pointer rounded-lg border p-6 transition-colors"
				>
					<h3 class="mb-2 text-lg font-semibold">Another Article Title</h3>
					<p class="text-muted-foreground">
						A brief description of another article to showcase the author's work.
					</p>
					<div class="text-primary mt-4 text-sm">Read more →</div>
				</div>
			</div>
		</div>
	</div>
</div>
