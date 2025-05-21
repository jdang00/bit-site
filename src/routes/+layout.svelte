<script lang="ts">
	import '../app.css';
	import { browser } from '$app/environment';
	import { slide } from 'svelte/transition';
	import { page } from '$app/stores';
	let { children } = $props();
	const year = new Date().getFullYear();
	let mobileMenuOpen = $state(false);
	let theme = $state<'dark' | 'light'>(browser ? (localStorage.getItem('theme') as 'dark' | 'light') || 'dark' : 'dark');

	$effect(() => {
		if (browser) {
			localStorage.setItem('theme', theme);
			document.documentElement.classList.toggle('dark', theme === 'dark');
		}
	});
</script>

<div class="bg-background text-foreground flex min-h-screen flex-col font-sans">
	<header class="bg-background-alt border-border border-b px-6 py-4">
		<div class="container mx-auto flex items-center justify-between">
			<h1>
				<a href="/" class="link text-2xl font-semibold">BIT</a>
			</h1>

			<!-- Desktop nav -->
			<nav class="hidden items-center space-x-4 md:flex">
				<a href="/blog" class="link">Blog</a>
				<button
					class="link"
					onclick={() => (theme = theme === 'dark' ? 'light' : 'dark')}
					aria-label="Toggle theme"
				>
					{#if theme === 'dark'}
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<circle cx="12" cy="12" r="4"/>
							<path d="M12 2v2"/>
							<path d="M12 20v2"/>
							<path d="m4.93 4.93 1.41 1.41"/>
							<path d="m17.66 17.66 1.41 1.41"/>
							<path d="M2 12h2"/>
							<path d="M20 12h2"/>
							<path d="m6.34 17.66-1.41 1.41"/>
							<path d="m19.07 4.93-1.41 1.41"/>
						</svg>
					{:else}
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
						</svg>
					{/if}
				</button>
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
			<nav
				class="bg-background-alt border-border border-t md:hidden"
				transition:slide={{ duration: 200 }}
			>
				<div class="space-y-1 px-6 py-4">
					<a
						href="/blog"
						class="link block rounded-lg px-3 py-2 hover:bg-background/50 transition-colors"
						onclick={() => (mobileMenuOpen = false)}
					>
						Blog
					</a>
					<button
						class="link block w-full rounded-lg px-3 py-2 text-left hover:bg-background/50 transition-colors"
						onclick={() => {
							theme = theme === 'dark' ? 'light' : 'dark';
							mobileMenuOpen = false;
						}}
						aria-label="Toggle theme"
					>
						<div class="flex items-center gap-2">
							{#if theme === 'dark'}
								<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
									<circle cx="12" cy="12" r="4"/>
									<path d="M12 2v2"/>
									<path d="M12 20v2"/>
									<path d="m4.93 4.93 1.41 1.41"/>
									<path d="m17.66 17.66 1.41 1.41"/>
									<path d="M2 12h2"/>
									<path d="M20 12h2"/>
									<path d="m6.34 17.66-1.41 1.41"/>
									<path d="m19.07 4.93-1.41 1.41"/>
								</svg>
								<span>Light Mode</span>
							{:else}
								<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
									<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
								</svg>
								<span>Dark Mode</span>
							{/if}
						</div>
					</button>
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
