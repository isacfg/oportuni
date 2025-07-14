<template>
	<section class="w-full pt-8 pb-16 bg-white">
		<div class="container mx-auto px-4">
			<div class="space-y-16">
				<div v-for="(section, idx) in sectionTitles.length" :key="section">
					<h3 class="text-2xl font-semibold text-gray-800 mb-8 text-center">{{ sectionTitles[idx] }}</h3>
					<div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
						<JobCardComponent v-for="job in recommendations" :key="section + '-' + job.id" :job="job" />
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import JobCardComponent from './job-card.component.vue'
import { useSearchStore } from '@/stores/search.store'

const searchStore = useSearchStore()

const sectionTitles = [
	'Oportunidades em destaque',
	'Novas oportunidades',
]

const recommendations = searchStore.searchResults
</script>
