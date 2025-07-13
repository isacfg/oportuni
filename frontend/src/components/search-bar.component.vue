<template>
	<div class="w-full max-w-4xl mx-auto">
		<!-- Main Search Input -->
		<div class="relative mb-6">
			<div class="flex items-center bg-gray-100 rounded-full  hover:shadow-md transition-shadow duration-200">
				<div class="flex-1 flex items-center">
					<div class="pl-6 pr-4 flex items-center pointer-events-none">
						<Search class="h-5 w-5 text-gray-400" />
					</div>
					<input v-model="searchQuery" type="text" placeholder="O que você está procurando?"
						class="flex-1 py-4 bg-transparent text-gray-900 placeholder-gray-500 focus:outline-none text-base"
						@keyup.enter="handleSearch" />
				</div>
				<button @click="handleSearch"
					class="m-2 w-12 h-12 bg-purple-500 hover:bg-purple-600 rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-200 hover:shadow-xl">
					<Search class="h-5 w-5" />
				</button>
			</div>
		</div>

		<!-- Filter Categories -->
		<div class="mb-6 border-b border-gray-200">
			<div class="flex space-x-8">
				<button v-for="category in filterCategories" :key="category.key" :class="[
					'pb-3 px-1 text-sm font-medium border-b-2 transition-colors duration-200',
					activeCategory === category.key
						? 'border-purple-500 text-purple-600'
						: 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
				]" @click="setActiveCategory(category.key)">
					{{ category.label }}
					<ChevronDown v-if="category.expandable" class="inline w-4 h-4 ml-1" />
				</button>
			</div>
		</div>

		<!-- Filter Content -->
		<div class="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg">
			<!-- Areas Filter -->
			<div v-if="activeCategory === 'areas'" class="space-y-4">
				<div class="flex flex-wrap gap-2">
					<button v-for="area in jobAreas" :key="area" :class="[
						'px-4 py-2 text-sm rounded-full border transition-all duration-200',
						selectedAreas.includes(area)
							? 'bg-purple-500 text-white border-purple-500'
							: 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
					]" @click="toggleArea(area)">
						{{ area }}
					</button>
				</div>
			</div>

			<!-- Tags Filter -->
			<div v-if="activeCategory === 'tags'" class="space-y-4">
				<!-- Tag Search -->
				<div class="relative">
					<input v-model="tagSearchQuery" type="text" placeholder="Pesquisar tags..."
						class="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200" />
				</div>

				<!-- Tag Buttons -->
				<div class="flex flex-wrap gap-2">
					<button v-for="tag in filteredTags" :key="tag.label" :class="[
						'inline-flex items-center space-x-1 px-3 py-2 text-sm rounded-full border transition-all duration-200',
						isTagSelected(tag)
							? 'bg-purple-500 text-white border-purple-500'
							: 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
					]" @click="toggleTag(tag)">
						<span>{{ tag.emoji }}</span>
						<span>{{ tag.label }}</span>
					</button>
				</div>
			</div>

			<!-- Companies Filter -->
			<div v-if="activeCategory === 'companies'" class="space-y-4">
				<div class="flex flex-wrap gap-2">
					<button v-for="option in companyOptions" :key="option" :class="[
						'px-4 py-2 text-sm rounded-full border transition-all duration-200',
						selectedCompanyOptions.includes(option)
							? 'bg-purple-500 text-white border-purple-500'
							: 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
					]" @click="toggleCompanyOption(option)">
						{{ option }}
					</button>
				</div>
			</div>

			<!-- Other Options Filter -->
			<div v-if="activeCategory === 'others'" class="space-y-4">
				<div class="flex flex-wrap gap-2">
					<button v-for="option in otherOptions" :key="option" :class="[
						'px-4 py-2 text-sm rounded-full border transition-all duration-200',
						selectedOtherOptions.includes(option)
							? 'bg-purple-500 text-white border-purple-500'
							: 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
					]" @click="toggleOtherOption(option)">
						{{ option }}
					</button>
				</div>
			</div>

			<!-- Action Buttons -->
			<div class="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
				<button @click="clearFilters"
					class="px-6 py-2 text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors duration-200">
					Limpar
				</button>
				<button @click="applyFilters"
					class="px-8 py-2 bg-purple-500 hover:bg-purple-600 text-white text-sm font-medium rounded-full transition-all duration-200 shadow-md hover:shadow-lg">
					Filtrar
				</button>
			</div>
		</div>

		<!-- Active Filters Display -->
		<div v-if="hasActiveFilters" class="mt-4 p-4 bg-gray-50 rounded-lg">
			<h4 class="text-sm font-medium text-gray-700 mb-2">Filtros ativos:</h4>
			<div class="flex flex-wrap gap-2">
				<!-- Search Query -->
				<span v-if="searchQuery"
					class="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
					"{{ searchQuery }}"
					<button @click="searchQuery = ''" class="ml-1 text-purple-600 hover:text-purple-800">×</button>
				</span>

				<!-- Areas -->
				<span v-for="area in selectedAreas" :key="area"
					class="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
					{{ area }}
					<button @click="toggleArea(area)" class="ml-1 text-blue-600 hover:text-blue-800">×</button>
				</span>

				<!-- Tags -->
				<span v-for="tag in selectedTags" :key="tag.label"
					class="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full">
					{{ tag.emoji }} {{ tag.label }}
					<button @click="toggleTag(tag)" class="ml-1 text-green-600 hover:text-green-800">×</button>
				</span>

				<!-- Company Options -->
				<span v-for="option in selectedCompanyOptions" :key="option"
					class="inline-flex items-center px-3 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">
					{{ option }}
					<button @click="toggleCompanyOption(option)"
						class="ml-1 text-orange-600 hover:text-orange-800">×</button>
				</span>

				<!-- Other Options -->
				<span v-for="option in selectedOtherOptions" :key="option"
					class="inline-flex items-center px-3 py-1 bg-red-100 text-red-800 text-xs rounded-full">
					{{ option }}
					<button @click="toggleOtherOption(option)" class="ml-1 text-red-600 hover:text-red-800">×</button>
				</span>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Search, ChevronDown } from 'lucide-vue-next'
import type { JobTag } from '../types/job.type'
import { JOB_TAGS } from '../types/job.type'

// Search state
const searchQuery = ref('')
const tagSearchQuery = ref('')
const activeCategory = ref('areas')

// Filter selections
const selectedAreas = ref<string[]>([])
const selectedTags = ref<JobTag[]>([])
const selectedCompanyOptions = ref<string[]>([])
const selectedOtherOptions = ref<string[]>([])

// Filter options
const filterCategories = [
	{ key: 'areas', label: 'Áreas', expandable: false },
	{ key: 'tags', label: 'Tags', expandable: true },
	{ key: 'companies', label: 'Ocultar empresas', expandable: false },
	{ key: 'others', label: 'Outros', expandable: false }
]

const jobAreas = [
	'Tecnologia',
	'Design',
	'Marketing',
	'Vendas',
	'Recursos Humanos',
	'Finanças',
	'Operações',
	'Produto',
	'Dados',
	'Jurídico'
]

const companyOptions = [
	'Empresas com processos longos',
	'Empresas sem benefícios',
	'Startups',
	'Grandes corporações'
]

const otherOptions = [
	'Salário não informado',
	'Vagas antigas',
	'Sem home office',
	'Apenas CLT',
	'Apenas PJ'
]

// Available tags from the predefined list
const availableTags = Object.values(JOB_TAGS)

// Filtered tags based on search query
const filteredTags = computed(() => {
	if (!tagSearchQuery.value) return availableTags

	const query = tagSearchQuery.value.toLowerCase()
	return availableTags.filter(tag =>
		tag.label.toLowerCase().includes(query)
	)
})

// Check if there are active filters
const hasActiveFilters = computed(() => {
	return searchQuery.value ||
		selectedAreas.value.length > 0 ||
		selectedTags.value.length > 0 ||
		selectedCompanyOptions.value.length > 0 ||
		selectedOtherOptions.value.length > 0
})

// Category management
const setActiveCategory = (category: string) => {
	activeCategory.value = category
}

// Area filters
const toggleArea = (area: string) => {
	const index = selectedAreas.value.indexOf(area)
	if (index > -1) {
		selectedAreas.value.splice(index, 1)
	} else {
		selectedAreas.value.push(area)
	}
}

// Tag filters
const isTagSelected = (tag: JobTag): boolean => {
	return selectedTags.value.some(selected => selected.label === tag.label)
}

const toggleTag = (tag: JobTag) => {
	if (isTagSelected(tag)) {
		selectedTags.value = selectedTags.value.filter(selected => selected.label !== tag.label)
	} else {
		selectedTags.value.push(tag)
	}
}

// Company option filters
const toggleCompanyOption = (option: string) => {
	const index = selectedCompanyOptions.value.indexOf(option)
	if (index > -1) {
		selectedCompanyOptions.value.splice(index, 1)
	} else {
		selectedCompanyOptions.value.push(option)
	}
}

// Other option filters
const toggleOtherOption = (option: string) => {
	const index = selectedOtherOptions.value.indexOf(option)
	if (index > -1) {
		selectedOtherOptions.value.splice(index, 1)
	} else {
		selectedOtherOptions.value.push(option)
	}
}

// Actions
const handleSearch = () => {
	applyFilters()
}

const clearFilters = () => {
	searchQuery.value = ''
	tagSearchQuery.value = ''
	selectedAreas.value = []
	selectedTags.value = []
	selectedCompanyOptions.value = []
	selectedOtherOptions.value = []
}

const applyFilters = () => {
	// TODO: Implement search functionality with filters
	console.log('Applying filters:', {
		searchQuery: searchQuery.value,
		areas: selectedAreas.value,
		tags: selectedTags.value,
		companyOptions: selectedCompanyOptions.value,
		otherOptions: selectedOtherOptions.value
	})
}
</script>
