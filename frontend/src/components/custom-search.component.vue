<template>
	<section class="w-full pt-8 pb-16 bg-white">
		<div class="container mx-auto px-4">
			<h2 class="text-3xl font-bold text-gray-900 text-center mb-12">
				Busque por vagas
			</h2>

			<!-- Search Bar Component -->
			<SearchBarComponent />
		</div>
	</section>
</template>

<script setup lang="ts">
import SearchBarComponent from '@/components/search-bar.component.vue'
</script>
