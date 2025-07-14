import type { Job, JobsResponse } from '@/types/job.type'

const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3333'

export class JobService {
  /**
   * Get all jobs (paginated)
   */
  static async getJobs(page = 1, limit = 40, bearerToken?: string | null): Promise<JobsResponse> {
    const response = await fetch(`${BASE_URL}/job-posts?page=${page}&limit=${limit}`, bearerToken ? {
      headers: {
        Authorization: `Bearer ${bearerToken}`
      }
    } : {})
    if (!response.ok) {
      throw new Error(`Failed to fetch jobs: ${response.statusText}`)
    }
    const data = await response.json()
    return data
  }

  /**
   * Get a specific job by ID
   */
  static async getJobById(id: number): Promise<Job> {
    const response = await fetch(`${BASE_URL}/job-posts/${id}`)
    if (!response.ok) {
      throw new Error(`Failed to fetch job: ${response.statusText}`)
    }
    return response.json()
  }

  /**
   * Search jobs with filters
   */
  static async searchJobs(filters: {
    query?: string
    contractType?: string
    location?: string
    remote?: boolean
    tags?: string[]
    page?: number
    limit?: number
  }): Promise<JobsResponse> {
    const params = new URLSearchParams()

    if (filters.query) params.append('query', filters.query)
    if (filters.contractType) params.append('contractType', filters.contractType)
    if (filters.location) params.append('location', filters.location)
    if (filters.remote !== undefined) params.append('remote', filters.remote.toString())
    if (filters.tags && filters.tags.length > 0) {
      filters.tags.forEach(tag => params.append('tags[]', tag))
    }
    if (filters.page) params.append('page', filters.page.toString())
    if (filters.limit) params.append('limit', filters.limit.toString())

    const response = await fetch(`${BASE_URL}/job-posts/search?${params}`)
    if (!response.ok) {
      throw new Error(`Failed to search jobs: ${response.statusText}`)
    }
    return response.json()
  }

  /**
   * Create a new job posting
   */
  static async createJob(jobData: {
    title: string
    description: string
    company_id: number
    contract_type: string
    location: string
    remote: boolean
    application_url: string
    simplified_application: boolean
    reduced_hours: boolean
    external_url: string | null
  }, bearerToken: string): Promise<Job> {
    const response = await fetch(`${BASE_URL}/job-posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${bearerToken}`
      },
      body: JSON.stringify(jobData)
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `Failed to create job: ${response.statusText}`)
    }

    return response.json()
  }
}
