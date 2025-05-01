<script lang="ts">
	import type { PostMetaItem } from '$lib/posts';

	let { data } = $props<{ data: { posts: PostMetaItem[] } }>();
	const posts = data.posts;
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

	<div class="relative z-10 mx-auto max-w-7xl px-6 py-16">
		<div class="mb-16">
			<h1 class="font-display text-6xl font-bold">Blog</h1>
		</div>

		{#if posts.length === 0}
			<div class="flex flex-col items-center justify-center py-16">
				<div class="text-muted-foreground mb-6 text-center">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="48"
						height="48"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="mx-auto mb-4 opacity-50"
					>
						<path
							d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"
						></path>
					</svg>
					<p class="text-lg font-medium">No posts yet—check back soon!</p>
				</div>
			</div>
		{:else}
			<ul class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
				{#each posts as { slug, metadata } (slug)}
					<li class="group">
						<a
							href={`/blog/${slug}`}
							class="relative h-full flex-col overflow-hidden rounded-2xl transition-all duration-300"
						>
							<div class="flex flex-grow flex-col p-7">
								<div class="text-muted-foreground mb-4 flex items-center text-sm">
									<span class="flex items-center">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="14"
											height="14"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-width="2"
											stroke-linecap="round"
											stroke-linejoin="round"
											class="mr-1.5"
										>
											<rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
											<line x1="16" x2="16" y1="2" y2="6"></line>
											<line x1="8" x2="8" y1="2" y2="6"></line>
											<line x1="3" x2="21" y1="10" y2="10"></line>
										</svg>
										{metadata.date}
									</span>
									<span class="mx-2">•</span>
									<span>{metadata.author}</span>
								</div>

								<h2
									class="font-display group-hover:text-primary mb-3 text-2xl leading-tight font-semibold transition-colors"
								>
									{metadata.title}
								</h2>

								{#if metadata.description}
									<p class="text-muted-foreground mb-6 line-clamp-3 flex-grow">
										{metadata.description}
									</p>
								{/if}

								<div class="text-primary mt-auto flex items-center font-medium">
									<span>Read more</span>
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
										class="ml-1 transition-transform group-hover:translate-x-1"
									>
										<path d="M5 12h14"></path>
										<path d="m12 5 7 7-7 7"></path>
									</svg>
								</div>
							</div>

							<div
								class="bg-primary absolute bottom-0 left-0 h-1 w-0 transition-all duration-300 group-hover:w-full"
							></div>
						</a>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</div>
