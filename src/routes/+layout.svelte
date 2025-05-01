<script lang="ts">
	import '../app.css';
	let { children } = $props();
	const year = new Date().getFullYear();
	let mobileMenuOpen = $state(false);
</script>

<div class="dark bg-background text-foreground flex min-h-screen flex-col font-sans">
	<header class="bg-background-alt border-border border-b px-6 py-4">
		<div class="container mx-auto flex items-center justify-between">
			<h1>
				<a href="/" class="link text-2xl font-semibold">BIT</a>
			</h1>

			<!-- Desktop nav -->
			<nav class="hidden space-x-4 md:flex">
				<a href="/blog" class="link">Blog</a>
			</nav>

			<!-- Mobile menu button -->
			<button
				class="focus:outline-none md:hidden"
				onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
				aria-label="Toggle menu"
			>
				<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					{#if !mobileMenuOpen}
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						/>
					{:else}
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					{/if}
				</svg>
			</button>
		</div>

		<!-- Mobile nav panel -->
		{#if mobileMenuOpen}
			<nav class="bg-background-alt border-border border-t md:hidden">
				<div class="space-y-2 px-6 py-4">
					<a href="/blog" class="link block">Blog</a>
				</div>
			</nav>
		{/if}
	</header>

	<main class="container mx-auto flex-grow px-6 py-8">
		{@render children()}
	</main>

	<footer class="bg-background-alt border-border border-t px-6 py-4 text-center text-sm">
		&copy; {year} Based Institute of Technology
	</footer>
</div>
