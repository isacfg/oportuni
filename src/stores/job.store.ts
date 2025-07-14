import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Job, JobsResponse } from '@/types/job.type'
import { JobService } from '@/services/job.service'
import { useAuthStore } from '@/stores/auth.store'

export const useJobStore = defineStore('job', () => {
  const jobs = ref<Job[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const meta = ref<JobsResponse['meta'] | null>(null)
  const currentPage = ref(1)

  const auth = useAuthStore()

  const fetchJobs = async (page = 1, limit = 40) => {
    loading.value = true
    error.value = null
    try {
      const response = await JobService.getJobs(page, limit, auth.token ? auth.token : null)
      jobs.value = response.data
      meta.value = response.meta
      currentPage.value = page
    } catch (err: any) {
      error.value = err.message || 'Erro ao buscar vagas'
    } finally {
      loading.value = false
    }
  }

  const searchJobs = async (filters: {
    query?: string
    contractType?: string
    location?: string
    remote?: boolean
    tags?: string[]
    page?: number
    limit?: number
  }) => {
    loading.value = true
    error.value = null
    try {
      const response = await JobService.searchJobs(filters)
      jobs.value = response.data
      meta.value = response.meta
      currentPage.value = filters.page || 1
    } catch (err: any) {
      error.value = err.message || 'Erro ao buscar vagas'
    } finally {
      loading.value = false
    }
  }

  const getJobById = computed(() => {
    return (id: number) => jobs.value.find(job => job.id === id)
  })

  const totalJobs = computed(() => meta.value?.total || 0)
  const hasNextPage = computed(() => meta.value?.nextPageUrl !== null)
  const hasPreviousPage = computed(() => meta.value?.previousPageUrl !== null)

  return {
    jobs,
    loading,
    error,
    meta,
    currentPage,
    totalJobs,
    hasNextPage,
    hasPreviousPage,
    fetchJobs,
    searchJobs,
    getJobById
  }
})
