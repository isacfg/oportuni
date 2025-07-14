import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Job, JobTag } from '@/types/job.type'
import { useJobStore } from '@/stores/job.store'

export interface SearchFilters {
  query: string
  areas: string[]
  contractTypes: string[]
  locations: string[]
  tags: JobTag[]
  remoteOnly: boolean
}

export const useSearchStore = defineStore('search', () => {
  const jobStore = useJobStore()
  
  // Search state
  const searchQuery = ref('')
  const selectedAreas = ref<string[]>([])
  const selectedContractTypes = ref<string[]>([])
  const selectedLocations = ref<string[]>([])
  const selectedTags = ref<JobTag[]>([])
  const remoteOnly = ref(false)
  const isSearchActive = ref(false)

  // Filter options
  const areas = ref([
    'Tecnologia',
    'Design',
    'Marketing',
    'Vendas',
    'Recursos Humanos',
    'Finanças',
    'Educação',
    'Saúde',
    'Engenharia',
    'Jurídico'
  ])

  const contractTypes = ref([
    'CLT',
    'PJ',
    'Estágio',
    'Freelancer',
    'Jovem Aprendiz'
  ])

  const locations = ref([
    'São Paulo',
    'Rio de Janeiro',
    'Belo Horizonte',
    'Brasília',
    'Salvador',
    'Fortaleza',
    'Recife',
    'Porto Alegre',
    'Curitiba',
    'Goiânia'
  ])

  // Computed search results
  const searchResults = computed(() => {
    if (!isSearchActive.value) {
      return jobStore.jobs // Return all jobs if search is not active
    }

    return jobStore.jobs.filter(job => {
      // Text search in title, description, and company name
      const matchesQuery = !searchQuery.value || 
        job.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        job.company.name.toLowerCase().includes(searchQuery.value.toLowerCase())

      // Area filter (based on job tags or title)
      const matchesArea = selectedAreas.value.length === 0 || 
        selectedAreas.value.some(area => 
          job.title.toLowerCase().includes(area.toLowerCase()) ||
          job.tags.some(tag => tag.name.toLowerCase().includes(area.toLowerCase()))
        )

      // Contract type filter
      const matchesContractType = selectedContractTypes.value.length === 0 ||
        selectedContractTypes.value.includes(job.contractType)

      // Location filter
      const matchesLocation = selectedLocations.value.length === 0 ||
        selectedLocations.value.some(location => 
          job.location.toLowerCase().includes(location.toLowerCase())
        )

      // Remote filter
      const matchesRemote = !remoteOnly.value || job.remote

      // Tags filter
      const matchesTags = selectedTags.value.length === 0 ||
        selectedTags.value.every(selectedTag =>
          job.tags.some(jobTag => jobTag.name.toLowerCase().includes(selectedTag.label.toLowerCase()))
        )

      return matchesQuery && matchesArea && matchesContractType && matchesLocation && matchesRemote && matchesTags
    })
  })

  // Actions
  const setSearchQuery = (query: string) => {
    searchQuery.value = query
  }

  const setAreas = (areas: string[]) => {
    selectedAreas.value = areas
  }

  const setContractTypes = (types: string[]) => {
    selectedContractTypes.value = types
  }

  const setLocations = (locations: string[]) => {
    selectedLocations.value = locations
  }

  const setTags = (tags: JobTag[]) => {
    selectedTags.value = tags
  }

  const setRemoteOnly = (remote: boolean) => {
    remoteOnly.value = remote
  }

  const performSearch = () => {
    isSearchActive.value = true
  }

  const clearSearch = () => {
    searchQuery.value = ''
    selectedAreas.value = []
    selectedContractTypes.value = []
    selectedLocations.value = []
    selectedTags.value = []
    remoteOnly.value = false
    isSearchActive.value = false
  }

  const toggleTag = (tag: JobTag) => {
    const index = selectedTags.value.findIndex(t => t.label === tag.label)
    if (index >= 0) {
      selectedTags.value.splice(index, 1)
    } else {
      selectedTags.value.push(tag)
    }
  }

  const isTagSelected = (tag: JobTag): boolean => {
    return selectedTags.value.some(t => t.label === tag.label)
  }

  return {
    // State
    searchQuery,
    selectedAreas,
    selectedContractTypes,
    selectedLocations,
    selectedTags,
    remoteOnly,
    isSearchActive,
    
    // Options
    areas,
    contractTypes,
    locations,
    
    // Computed
    searchResults,
    
    // Actions
    setSearchQuery,
    setAreas,
    setContractTypes,
    setLocations,
    setTags,
    setRemoteOnly,
    performSearch,
    clearSearch,
    toggleTag,
    isTagSelected
  }
}) 