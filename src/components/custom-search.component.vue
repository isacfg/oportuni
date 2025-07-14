<template>
	<section id="search-results" class="w-full pt-8 pb-16 bg-white">
		<div class="container mx-auto px-4">
			<h2 class="text-3xl font-bold text-gray-900 text-center mb-12">
				Busque por vagas
			</h2>

			<!-- custom search -->
			<div class="w-full mx-auto max-w-5xl">
				<div class="relative mb-6">
					<div
						class="flex items-center bg-gray-100 rounded-full  hover:shadow-md transition-shadow duration-200">
						<div class="flex-1 flex items-center">
							<div class="pl-6 pr-4 flex items-center pointer-events-none">
								<Search class="h-5 w-5 text-gray-400" />
							</div>
							<input v-model="searchStore.searchQuery" type="text"
								placeholder="O que você está procurando?"
								class="flex-1 py-4 bg-transparent text-gray-900 placeholder-gray-500 focus:outline-none text-base"
								@keyup.enter="handleSearch" />
						</div>
						<button @click="handleSearch"
							class="m-2 w-12 h-12 bg-purple-500 hover:bg-purple-600 rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-200 hover:shadow-xl">
							<Search class="h-5 w-5" />
						</button>
					</div>
				</div>

				<!-- Filters Section -->
				<div class="space-y-6">
					<!-- Filter Dropdown Buttons -->
					<div class="flex flex-wrap gap-3">
						<div class="relative">
							<button @click="toggleAreaFilter"
								class="cursor-pointer flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
								Áreas
								<ChevronDown class="h-4 w-4" />
							</button>
							<div v-if="showAreaFilter"
								class="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10 p-4">
								<div class="space-y-2">
									<label v-for="area in searchStore.areas" :key="area"
										class="flex items-center gap-2">
										<input type="checkbox" v-model="searchStore.selectedAreas" :value="area"
											class="rounded" />
										<span class="text-sm">{{ area }}</span>
									</label>
								</div>
							</div>
						</div>

						<div class="relative">
							<button @click="toggleContractTypeFilter"
								class="cursor-pointer flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
								Tipo de Contrato
								<ChevronDown class="h-4 w-4" />
							</button>
							<div v-if="showContractTypeFilter"
								class="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10 p-4">
								<div class="space-y-2">
									<label v-for="contractType in searchStore.contractTypes" :key="contractType"
										class="flex items-center gap-2">
										<input type="checkbox" v-model="searchStore.selectedContractTypes"
											:value="contractType" class="rounded" />
										<span class="text-sm">{{ contractType }}</span>
									</label>
								</div>
							</div>
						</div>

						<div class="relative">
							<button @click="toggleLocationFilter"
								class="cursor-pointer flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
								Localização
								<ChevronDown class="h-4 w-4" />
							</button>
							<div v-if="showLocationFilter"
								class="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10 p-4">
								<div class="space-y-2">
									<label v-for="location in searchStore.locations" :key="location"
										class="flex items-center gap-2">
										<input type="checkbox" v-model="searchStore.selectedLocations" :value="location"
											class="rounded" />
										<span class="text-sm">{{ location }}</span>
									</label>
									<label class="flex items-center gap-2">
										<input type="checkbox" v-model="searchStore.remoteOnly" class="rounded" />
										<span class="text-sm">Apenas vagas remotas</span>
									</label>
								</div>
							</div>
						</div>

						<div class="relative">
							<button @click="toggleTagFilter"
								class="cursor-pointer flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
								Tags
								<ChevronDown class="h-4 w-4" />
							</button>
							<div v-if="showTagFilter"
								class="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10 p-4">
								<input type="text" v-model="tagSearch" placeholder="Pesquisar tags..."
									class="w-full p-2 border border-gray-300 rounded-lg mb-3 text-sm" />
								<div class="space-y-2 max-h-40 overflow-y-auto">
									<div v-if="tagStore.loading" class="text-center text-gray-500 text-sm py-4">
										Carregando tags...
									</div>
									<div v-else-if="tagStore.error" class="text-center text-red-500 text-sm py-4">
										{{ tagStore.error }}
									</div>
									<label v-else v-for="tag in filteredTags" :key="tag"
										class="flex items-center gap-2">
										<input type="checkbox" v-model="searchStore.selectedTags" :value="tag"
											class="rounded" />
										<span class="text-sm">{{ tag }}</span>
									</label>
								</div>
							</div>
						</div>
					</div>

					<!-- Quick Filter Tags -->
					<!-- <div class="flex flex-wrap gap-2">
						<button v-for="tag in quickTags" :key="tag.name" @click="toggleQuickTag(tag)" :class="[
							'px-3 py-1 rounded-full text-sm border transition-colors',
							tag.selected
								? 'bg-purple-100 text-purple-700 border-purple-300'
								: 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
						]" class="flex items-center gap-2">
							<component :is="tag.icon" class="h-4 w-4" />
							{{ tag.name }}
						</button>
					</div> -->


				</div>
			</div>

			<div class="space-y-16 mt-16">
				<!-- Loading State -->
				<div v-if="jobStore.loading" class="text-center py-8">
					<div class="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
					<p class="mt-4 text-gray-600">Carregando vagas...</p>
				</div>

				<!-- Error State -->
				<div v-else-if="jobStore.error" class="text-center py-8">
					<p class="text-red-600 mb-4">{{ jobStore.error }}</p>
					<button @click="jobStore.fetchJobs()"
						class="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
						Tentar novamente
					</button>
				</div>

				<!-- Jobs Grid -->
				<div v-else-if="recommendations.length > 0"
					class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
					<JobCardComponent v-for="job in recommendations" :key="job.id" :job="job" />
				</div>

				<!-- No Results -->
				<div v-else class="text-center py-8">
					<p class="text-gray-600 mb-4">Nenhuma vaga encontrada</p>
					<button @click="clearFilters"
						class="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
						Limpar filtros
					</button>
				</div>

				<!-- Pagination -->
				<div v-if="jobStore.meta && jobStore.meta.lastPage > 1"
					class="flex justify-center items-center space-x-4 mt-8">
					<button @click="loadPage(jobStore.currentPage - 1)" :disabled="!jobStore.hasPreviousPage" :class="[
						'px-4 py-2 rounded-lg transition-colors',
						jobStore.hasPreviousPage
							? 'bg-purple-500 text-white hover:bg-purple-600'
							: 'bg-gray-300 text-gray-500 cursor-not-allowed'
					]">
						Anterior
					</button>

					<span class="text-gray-600">
						Página {{ jobStore.currentPage }} de {{ jobStore.meta.lastPage }}
					</span>

					<button @click="loadPage(jobStore.currentPage + 1)" :disabled="!jobStore.hasNextPage" :class="[
						'px-4 py-2 rounded-lg transition-colors',
						jobStore.hasNextPage
							? 'bg-purple-500 text-white hover:bg-purple-600'
							: 'bg-gray-300 text-gray-500 cursor-not-allowed'
					]">
						Próxima
					</button>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Search, ChevronDown, Globe, Star, Award, FileText, MapPin, Users, Clock, Briefcase, GraduationCap, DollarSign } from 'lucide-vue-next'
import JobCardComponent from './job-card.component.vue'
import { useJobStore } from '@/stores/job.store'
import { useTagStore } from '@/stores/tag.store'
import { useSearchStore } from '@/stores/search.store'
import type { JobTag } from '../types/job.type'

const jobStore = useJobStore()
const tagStore = useTagStore()
const searchStore = useSearchStore()

const sectionTitles = [
	'Oportunidades em destaque',
	'Novas oportunidades',
]

// Filter dropdown states
const showAreaFilter = ref(false)
const showTagFilter = ref(false)
const showCompanyFilter = ref(false)
const showOtherFilter = ref(false)
const showContractTypeFilter = ref(false)
const showLocationFilter = ref(false)

// Filter values
const tagSearch = ref('')
const hideCompanies = ref(false)
const selectedOthers = ref<string[]>([])
const remoteOnly = ref(false)

// Available options
const contractTypes = ['CLT', 'PJ', 'Freelancer', 'Estágio', 'Trainee']
const locations = ['São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Remoto', 'Híbrido']

const areas = [
	'Tecnologia',
	'Marketing',
	'Vendas',
	'Recursos Humanos',
	'Finanças',
	'Design',
	'Atendimento ao Cliente',
	'Administração'
]

const otherFilters = [
	'Apenas vagas verificadas',
	'Vagas com salário',
	'Vagas recentes (últimos 7 dias)',
	'Empresas com mais de 100 funcionários'
]

// Quick filter tags with icons
const quickTags = ref([
	{ name: '100% Remoto', icon: Globe, selected: false },
	{ name: 'Banco de Talentos', icon: Star, selected: false },
	{ name: 'Bônus por indicação', icon: Award, selected: false },
	{ name: 'Candidatura simplificada', icon: FileText, selected: false },
	{ name: 'CLT', icon: Briefcase, selected: false },
	{ name: 'Espanhol', icon: Globe, selected: false },
	{ name: 'Estágio', icon: GraduationCap, selected: false },
	{ name: 'Francês', icon: Globe, selected: false },
	{ name: 'Freelancer', icon: Users, selected: false },
	{ name: 'Inglês', icon: Globe, selected: false },
	{ name: 'Jornada reduzida', icon: Clock, selected: false },
	{ name: 'Jovem Aprendiz', icon: GraduationCap, selected: false },
	{ name: 'Júnior', icon: Users, selected: false }
])

// Computed
const filteredTags = computed(() => {
	if (!tagSearch.value) return tagStore.tagNames
	return tagStore.tagNames.filter(tag =>
		tag.toLowerCase().includes(tagSearch.value.toLowerCase())
	)
})

const recommendations = computed(() => searchStore.searchResults)

// Methods
const handleSearch = async () => {
	searchStore.performSearch()
}

const loadPage = async (page: number) => {
	if (page < 1 || (jobStore.meta && page > jobStore.meta.lastPage)) return

	// If we have active filters, use search, otherwise use regular fetch
	if (searchStore.searchQuery || searchStore.selectedTags.length > 0 || searchStore.selectedContractTypes.length > 0 || searchStore.selectedLocations.length > 0 || searchStore.remoteOnly) {
		const filters = {
			query: searchStore.searchQuery || undefined,
			contractType: searchStore.selectedContractTypes.length > 0 ? searchStore.selectedContractTypes[0] : undefined,
			location: searchStore.selectedLocations.length > 0 ? searchStore.selectedLocations[0] : undefined,
			remote: searchStore.remoteOnly || undefined,
			tags: searchStore.selectedTags.length > 0 ? searchStore.selectedTags.map(tag => tag.name) : undefined,
			page,
			limit: 40
		}
		await jobStore.searchJobs(filters)
	} else {
		await jobStore.fetchJobs(page)
	}
}

const toggleAreaFilter = () => {
	showAreaFilter.value = !showAreaFilter.value
	showTagFilter.value = false
	showCompanyFilter.value = false
	showOtherFilter.value = false
	showContractTypeFilter.value = false
	showLocationFilter.value = false
}

const toggleContractTypeFilter = () => {
	showContractTypeFilter.value = !showContractTypeFilter.value
	showAreaFilter.value = false
	showTagFilter.value = false
	showOtherFilter.value = false
	showLocationFilter.value = false
}

const toggleLocationFilter = () => {
	showLocationFilter.value = !showLocationFilter.value
	showAreaFilter.value = false
	showTagFilter.value = false
	showOtherFilter.value = false
	showContractTypeFilter.value = false
}

const toggleTagFilter = async () => {
	showTagFilter.value = !showTagFilter.value
	showAreaFilter.value = false
	showCompanyFilter.value = false
	showOtherFilter.value = false
	showContractTypeFilter.value = false
	showLocationFilter.value = false

	// Refresh tags when opening the filter
	if (showTagFilter.value) {
		await tagStore.fetchTags()
	}
}

const toggleCompanyFilter = () => {
	showCompanyFilter.value = !showCompanyFilter.value
	showAreaFilter.value = false
	showTagFilter.value = false
	showOtherFilter.value = false
	showContractTypeFilter.value = false
	showLocationFilter.value = false
}

const toggleOtherFilter = () => {
	showOtherFilter.value = !showOtherFilter.value
	showAreaFilter.value = false
	showTagFilter.value = false
	showCompanyFilter.value = false
	showContractTypeFilter.value = false
	showLocationFilter.value = false
}

const toggleQuickTag = (tag: any) => {
	tag.selected = !tag.selected
}

const clearFilters = async () => {
	searchStore.clearSearch()
	selectedOthers.value = []
	hideCompanies.value = false
	tagSearch.value = ''
	quickTags.value.forEach(tag => tag.selected = false)
}

const applyFilters = () => {
	const selectedQuickTags = quickTags.value.filter(tag => tag.selected).map(tag => tag.name)

	console.log('Applying filters:', {
		searchQuery: searchStore.searchQuery,
		areas: searchStore.selectedAreas,
		tags: searchStore.selectedTags,
		contractTypes: searchStore.selectedContractTypes,
		locations: searchStore.selectedLocations,
		remoteOnly: searchStore.remoteOnly,
		quickTags: selectedQuickTags,
		others: selectedOthers.value,
		hideCompanies: hideCompanies.value,
		availableTags: tagStore.tagNames,
		filteredTags: filteredTags.value
	})

	// Close all dropdowns
	showAreaFilter.value = false
	showTagFilter.value = false
	showCompanyFilter.value = false
	showOtherFilter.value = false
	showContractTypeFilter.value = false
	showLocationFilter.value = false
}

const learnMore = () => {
	console.log('Learn more clicked')
}

const fetchTagsByType = async (type: string) => {
	try {
		await tagStore.fetchTagsByType(type)
	} catch (error) {
		console.error('Error fetching tags by type:', error)
	}
}


// Close dropdowns when clicking outside
const handleClickOutside = (event: MouseEvent) => {
	const target = event.target as HTMLElement
	if (!target.closest('.relative')) {
		showAreaFilter.value = false
		showTagFilter.value = false
		showCompanyFilter.value = false
		showOtherFilter.value = false
		showContractTypeFilter.value = false
		showLocationFilter.value = false
	}
}

onMounted(async () => {
	document.addEventListener('click', handleClickOutside)
	await tagStore.initializeTags()
	await jobStore.fetchJobs()
})

onUnmounted(() => {
	document.removeEventListener('click', handleClickOutside)
})
</script>
