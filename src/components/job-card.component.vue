<template>
	<RouterLink :to="{ name: 'job-detail', params: { id: job.id } }"
		class="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow block relative">

		<div class="flex items-start space-x-4">
			<!-- Company Logo -->
			<div class="flex-shrink-0">
				<div class="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center">
					<span class="text-lg font-semibold text-gray-600">{{ getInitials(job.company.name) }}</span>
				</div>
			</div>

			<!-- Job Details -->
			<div class="flex-grow">
				<h3 class="text-lg font-semibold text-gray-900 mb-2">
					{{ job.title }}
				</h3>

				<div class="flex items-center space-x-4 text-sm text-gray-600 mb-3">
					<span>{{ job.company.name }}</span>
					<span>•</span>
					<span>{{ job.location }}</span>
					<span>•</span>
					<span>{{ job.contractType }}</span>
					<span v-if="job.remote" class="text-green-600">• Remoto</span>
				</div>

				<!-- Tags with Emojis -->
				<div class="flex flex-wrap gap-2">
					<JobTagComponent v-for="tag in job.tags" :key="tag.id" :tag="tag" size="sm" />
				</div>
			</div>

			<FavoriteHeartComponent v-model="isFavorited" size="sm" variant="simple" @favorited="onFavorited" />
		</div>
	</RouterLink>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { Job } from '@/types/job.type'
import JobTagComponent from '@/components/job-tag.component.vue'
import FavoriteHeartComponent from '@/components/favorite-heart.component.vue'
import { ref } from 'vue'

defineProps<{
	job: Job
}>()

const getInitials = (companyName: string): string => {
	return companyName
		.split(' ')
		.map(word => word.charAt(0))
		.join('')
		.toUpperCase()
		.slice(0, 2)
}

const isFavorited = ref(false)

const onFavorited = (favorited: boolean) => {
	console.log('Job favorited:', favorited)
	// Here you could emit to parent, call API, etc.
}
</script>
