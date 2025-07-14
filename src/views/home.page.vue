<template>
	<div class="min-h-screen">
		<!-- Header -->
		<AppHeaderComponent />

		<!-- Hero Section -->
		<HeroSectionComponent />

		<!-- Custom Search Section -->
		<CustomSearchSectionComponent />

		<!-- Recommendations Section -->
		<RecommendationsSectionComponent />
	</div>
</template>

<script setup lang="ts">
import AppHeaderComponent from '@/components/app-header.component.vue'
import HeroSectionComponent from '@/components/hero-section.component.vue'
import RecommendationsSectionComponent from '@/components/recommendations-section.component.vue'
import CustomSearchSectionComponent from '@/components/custom-search.component.vue'
</script>

<script lang="ts">
export default {
	name: 'HomePage'
}
</script>
