import type { JobTag } from '@/types/job.type'

const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3333'

export interface TagResponse {
  id: number
  name: string
  type: string
  created_at: string
  updated_at: string
}

export interface TagCreateRequest {
  name: string
  type: string
}

export interface TagUpdateRequest {
  name?: string
  type?: string
}

export class TagService {
  /**
   * Get all tags
   */
  static async getTags(): Promise<TagResponse[]> {
    const response = await fetch(`${BASE_URL}/tags`)

    if (!response.ok) {
      throw new Error(`Failed to fetch tags: ${response.statusText}`)
    }

    return response.json()
  }

  /**
   * Get tags filtered by type
   */
  static async getTagsByType(type: string): Promise<TagResponse[]> {
    const response = await fetch(`${BASE_URL}/tags?type=${encodeURIComponent(type)}`)

    if (!response.ok) {
      throw new Error(`Failed to fetch tags by type: ${response.statusText}`)
    }

    return response.json()
  }

  /**
   * Get specific tag by ID
   */
  static async getTag(id: number): Promise<TagResponse> {
    const response = await fetch(`${BASE_URL}/tags/${id}`)

    if (!response.ok) {
      throw new Error(`Failed to fetch tag: ${response.statusText}`)
    }

    return response.json()
  }

  /**
   * Create a new tag
   */
  static async createTag(tagData: TagCreateRequest): Promise<TagResponse> {
    const response = await fetch(`${BASE_URL}/tags`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tagData),
    })

    if (!response.ok) {
      throw new Error(`Failed to create tag: ${response.statusText}`)
    }

    return response.json()
  }

  /**
   * Update existing tag
   */
  static async updateTag(id: number, tagData: TagUpdateRequest): Promise<TagResponse> {
    const response = await fetch(`${BASE_URL}/tags/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tagData),
    })

    if (!response.ok) {
      throw new Error(`Failed to update tag: ${response.statusText}`)
    }

    return response.json()
  }

  /**
   * Delete tag
   */
  static async deleteTag(id: number): Promise<void> {
    const response = await fetch(`${BASE_URL}/tags/${id}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      throw new Error(`Failed to delete tag: ${response.statusText}`)
    }
  }
}
