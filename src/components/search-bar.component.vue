<template>
	<div class="w-full max-w-2xl mx-auto relative">
		<!-- Main Search Input -->
		<div class="relative mb-6">
			<div class="flex items-center bg-gray-100 rounded-full  hover:shadow-md transition-shadow duration-200">
				<div class="flex-1 flex items-center">
					<div class="pl-6 pr-4 flex items-center pointer-events-none">
						<Search class="h-5 w-5 text-gray-400" />
					</div>
					<input v-model="searchStore.searchQuery" type="text" placeholder="O que você está procurando?"
						class="flex-1 py-4 bg-transparent text-gray-900 placeholder-gray-500 focus:outline-none text-base"
						@keyup.enter="handleEnter" @keydown.up.prevent="navigateUp" @keydown.down.prevent="navigateDown"
						@keydown.escape="showDropdown = false" @input="handleInput" @focus="showDropdown = true"
						@blur="handleBlur" />
				</div>
				<button @click="handleSearch"
					class="m-2 w-12 h-12 bg-purple-500 hover:bg-purple-600 rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-200 hover:shadow-xl">
					<Search class="h-5 w-5" />
				</button>
			</div>

			<!-- Search Suggestions Dropdown -->
			<div v-if="showDropdown && (searchSuggestions.length > 0 || popularSuggestions.length > 0)"
				class="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-lg z-50 max-h-80 overflow-y-auto">
				<div class="p-4">
					<!-- Search Results -->
					<div v-if="searchSuggestions.length > 0">
						<div v-for="(suggestion, index) in searchSuggestions" :key="index" :class="[
							'flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors',
							selectedIndex === index ? 'bg-purple-50 border border-purple-200' : 'hover:bg-gray-50'
						]" @mousedown="selectSuggestion(suggestion)" @mouseenter="selectedIndex = index">
							<div class="flex-shrink-0">
								<Search v-if="suggestion.type === 'query'" class="h-4 w-4 text-gray-400" />
								<div v-else-if="suggestion.type === 'company'"
									class="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
									<span class="text-purple-600 font-bold text-xs">{{ suggestion.company?.charAt(0)
									}}</span>
								</div>
								<span v-else-if="suggestion.type === 'tag'" class="text-sm">🏷️</span>
							</div>
							<div class="flex-grow">
								<div class="font-medium text-gray-900">{{ suggestion.title }}</div>
								<div v-if="suggestion.subtitle" class="text-sm text-gray-500">{{ suggestion.subtitle }}
								</div>
							</div>
						</div>
					</div>

					<!-- Popular Suggestions -->
					<div v-else-if="popularSuggestions.length > 0">
						<div class="text-xs font-medium text-gray-500 mb-3 px-3">Sugestões Populares</div>
						<div v-for="(suggestion, index) in popularSuggestions" :key="'popular-' + index" :class="[
							'flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors',
							selectedIndex === index ? 'bg-purple-50 border border-purple-200' : 'hover:bg-gray-50'
						]" @mousedown="selectSuggestion(suggestion)" @mouseenter="selectedIndex = index">
							<div class="flex-shrink-0">
								<span class="text-lg">{{ suggestion.emoji }}</span>
							</div>
							<div class="flex-grow">
								<div class="font-medium text-gray-900">{{ suggestion.title }}</div>
								<div class="text-sm text-gray-500">{{ suggestion.subtitle }}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Popular Tags Section -->
		<div class="mb-4">
			<div class="flex items-center gap-3 mb-3">
				<!-- <span class="text-sm font-medium text-gray-700">Popular:</span> -->
				<div class="flex flex-wrap gap-2">
					<button v-for="tag in popularTags" :key="tag.label" :class="[
						'cursor-pointer inline-flex items-center space-x-1 px-3 py-1.5 text-sm rounded-full transition-all duration-200 border',
						isSelected(tag)
							? 'bg-purple-500 text-white border-purple-500 shadow-md hover:bg-purple-600'
							: 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
					]" @click="toggleTag(tag)">
						<span>{{ tag.emoji }}</span>
						<span>{{ tag.label }}</span>
					</button>
				</div>
			</div>
		</div>


	</div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Search } from 'lucide-vue-next'
import type { JobTag } from '../types/job.type'
import { JOB_TAGS } from '../types/job.type'
import { useSearchStore } from '@/stores/search.store'
import { useJobStore } from '@/stores/job.store'

const searchStore = useSearchStore()
const jobStore = useJobStore()

// Dropdown state
const showDropdown = ref(false)
const selectedIndex = ref(-1)

// Search suggestion interface
interface SearchSuggestion {
	type: 'query' | 'company' | 'tag'
	title: string
	subtitle?: string
	company?: string
	value: string
	emoji?: string
}

// Popular tags to display prominently
const popularTags = computed<(JobTag & { emoji?: string })[]>(() => [
	{ ...JOB_TAGS.JAVASCRIPT, name: JOB_TAGS.JAVASCRIPT.name },
	{ ...JOB_TAGS.VUEJS, name: JOB_TAGS.VUEJS.name },
	{ ...JOB_TAGS.PYTHON, name: JOB_TAGS.PYTHON.name },
	{ ...JOB_TAGS.REACT, name: JOB_TAGS.REACT.name },
	{ ...JOB_TAGS.NODEJS, name: JOB_TAGS.NODEJS.name },
	{ ...JOB_TAGS.AWS, name: JOB_TAGS.AWS.name }
])

// Popular suggestions when no query
const popularSuggestions = computed(() => {
	const query = searchStore.searchQuery.toLowerCase().trim()
	if (query.length >= 2) return []

	const suggestions: SearchSuggestion[] = []

	// Popular tags
	const tagSuggestions = popularTags.value.map(tag => ({
		type: 'tag' as const,
		title: tag.name,
		subtitle: 'Tag popular',
		value: tag.name,
		emoji: tag.emoji || '🏷️'
	}))

	// Top companies
	const topCompanies = Array.from(new Set(
		jobStore.jobs
			.map(job => job.company.name)
			.slice(0, 3)
	)).map(company => ({
		type: 'company' as const,
		title: company,
		subtitle: 'Empresa em destaque',
		company: company,
		value: company,
		emoji: '🏢'
	}))

	suggestions.push(...tagSuggestions.slice(0, 4), ...topCompanies)

	return suggestions.slice(0, 6)
})

// Generate search suggestions based on current query
const searchSuggestions = computed(() => {
	const query = searchStore.searchQuery.toLowerCase().trim()
	if (!query || query.length < 2) return []

	const suggestions: SearchSuggestion[] = []

	// Job title suggestions
	const jobTitles = jobStore.jobs
		.filter(job => job.title.toLowerCase().includes(query))
		.slice(0, 3)
		.map(job => ({
			type: 'query' as const,
			title: job.title,
			subtitle: job.company.name,
			value: job.title
		}))

	// Company suggestions
	const companies = Array.from(new Set(
		jobStore.jobs
			.filter(job => job.company.name.toLowerCase().includes(query))
			.map(job => job.company.name)
	))
		.slice(0, 3)
		.map(company => ({
			type: 'company' as const,
			title: company,
			subtitle: 'Empresa',
			company: company,
			value: company
		}))

	// Tag suggestions
	const tags = Array.from(new Set(
		jobStore.jobs
			.flatMap(job => job.tags)
			.filter(tag => tag.name.toLowerCase().includes(query))
			.map(tag => tag.name)
	))
		.slice(0, 3)
		.map(tag => ({
			type: 'tag' as const,
			title: tag,
			subtitle: 'Tag',
			value: tag
		}))

	// Combine all suggestions
	suggestions.push(...jobTitles, ...companies, ...tags)

	return suggestions.slice(0, 8) // Limit to 8 suggestions
})

const handleSearch = () => {
	showDropdown.value = false
	selectedIndex.value = -1
	searchStore.performSearch()
}

const handleInput = () => {
	showDropdown.value = true
	selectedIndex.value = -1
}

const handleBlur = () => {
	// Delay hiding dropdown to allow click events
	setTimeout(() => {
		showDropdown.value = false
		selectedIndex.value = -1
	}, 200)
}

const handleEnter = () => {
	if (showDropdown.value && selectedIndex.value >= 0) {
		const currentSuggestions = searchSuggestions.value.length > 0 ? searchSuggestions.value : popularSuggestions.value
		if (currentSuggestions[selectedIndex.value]) {
			selectSuggestion(currentSuggestions[selectedIndex.value])
		}
	} else {
		handleSearch()
	}
}

const navigateUp = () => {
	if (!showDropdown.value) return
	const maxIndex = Math.max(searchSuggestions.value.length, popularSuggestions.value.length) - 1
	selectedIndex.value = selectedIndex.value <= 0 ? maxIndex : selectedIndex.value - 1
}

const navigateDown = () => {
	if (!showDropdown.value) return
	const maxIndex = Math.max(searchSuggestions.value.length, popularSuggestions.value.length) - 1
	selectedIndex.value = selectedIndex.value >= maxIndex ? 0 : selectedIndex.value + 1
}

const selectSuggestion = (suggestion: SearchSuggestion) => {
	searchStore.setSearchQuery(suggestion.value)
	showDropdown.value = false
	selectedIndex.value = -1
	searchStore.performSearch()
	// Scroll suave até a seção de resultados
	setTimeout(() => {
		const el = document.getElementById('search-results')
		if (el) {
			el.scrollIntoView({ behavior: 'smooth', block: 'start' })
		}
	}, 100)
}

// Check if tag is selected
const isSelected = (tag: JobTag): boolean => {
	return searchStore.isTagSelected(tag)
}

// Toggle tag selection
const toggleTag = (tag: JobTag) => {
	searchStore.toggleTag(tag)
}
</script>
