<template>
	<section class="w-full pt-8 pb-16 bg-white">
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
									<label v-for="area in areas" :key="area" class="flex items-center gap-2">
										<input type="checkbox" v-model="selectedAreas" :value="area" class="rounded" />
										<span class="text-sm">{{ area }}</span>
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
									<label v-for="tag in filteredTags" :key="tag" class="flex items-center gap-2">
										<input type="checkbox" v-model="selectedTags" :value="tag" class="rounded" />
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
				<div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
					<JobCardComponent v-for="job in recommendations" :key="job.id" :job="job" />
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
import type { JobTag } from '../types/job.type'

const jobStore = useJobStore()

const sectionTitles = [
	'Oportunidades em destaque',
	'Novas oportunidades',
]

const recommendations = jobStore.jobs

// Search and filter state
const searchQuery = ref('')
const selectedTags = ref<JobTag[]>([])

// Filter dropdown states
const showAreaFilter = ref(false)
const showTagFilter = ref(false)
const showCompanyFilter = ref(false)
const showOtherFilter = ref(false)

// Filter values
const selectedAreas = ref<string[]>([])
const tagSearch = ref('')
const hideCompanies = ref(false)
const selectedOthers = ref<string[]>([])

// Available options
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

const allTags = [
	'100% Remoto',
	'Banco de Talentos',
	'Bônus por indicação',
	'Candidatura simplificada',
	'CLT',
	'Espanhol',
	'Estágio',
	'Francês',
	'Freelancer',
	'Inglês',
	'Jornada reduzida',
	'Jovem Aprendiz',
	'Júnior'
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
	if (!tagSearch.value) return allTags
	return allTags.filter(tag =>
		tag.toLowerCase().includes(tagSearch.value.toLowerCase())
	)
})

// Methods
const handleSearch = () => {
	console.log('Searching for:', searchQuery.value)
	console.log('Selected areas:', selectedAreas.value)
	console.log('Selected tags:', selectedTags.value)
	console.log('Selected others:', selectedOthers.value)
	console.log('Hide companies:', hideCompanies.value)
}

const toggleAreaFilter = () => {
	showAreaFilter.value = !showAreaFilter.value
	showTagFilter.value = false
	showCompanyFilter.value = false
	showOtherFilter.value = false
}

const toggleTagFilter = () => {
	showTagFilter.value = !showTagFilter.value
	showAreaFilter.value = false
	showCompanyFilter.value = false
	showOtherFilter.value = false
}

const toggleCompanyFilter = () => {
	showCompanyFilter.value = !showCompanyFilter.value
	showAreaFilter.value = false
	showTagFilter.value = false
	showOtherFilter.value = false
}

const toggleOtherFilter = () => {
	showOtherFilter.value = !showOtherFilter.value
	showAreaFilter.value = false
	showTagFilter.value = false
	showCompanyFilter.value = false
}

const toggleQuickTag = (tag: any) => {
	tag.selected = !tag.selected
}

const clearFilters = () => {
	searchQuery.value = ''
	selectedAreas.value = []
	selectedTags.value = []
	selectedOthers.value = []
	hideCompanies.value = false
	tagSearch.value = ''
	quickTags.value.forEach(tag => tag.selected = false)
}

const applyFilters = () => {
	const selectedQuickTags = quickTags.value.filter(tag => tag.selected).map(tag => tag.name)

	console.log('Applying filters:', {
		searchQuery: searchQuery.value,
		areas: selectedAreas.value,
		tags: selectedTags.value,
		quickTags: selectedQuickTags,
		others: selectedOthers.value,
		hideCompanies: hideCompanies.value
	})

	// Close all dropdowns
	showAreaFilter.value = false
	showTagFilter.value = false
	showCompanyFilter.value = false
	showOtherFilter.value = false
}

const learnMore = () => {
	console.log('Learn more clicked')
}

// Close dropdowns when clicking outside
const handleClickOutside = (event: MouseEvent) => {
	const target = event.target as HTMLElement
	if (!target.closest('.relative')) {
		showAreaFilter.value = false
		showTagFilter.value = false
		showCompanyFilter.value = false
		showOtherFilter.value = false
	}
}

onMounted(() => {
	document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
	document.removeEventListener('click', handleClickOutside)
})
</script>
