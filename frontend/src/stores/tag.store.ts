import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { TagService, type TagResponse, type TagCreateRequest, type TagUpdateRequest } from '@/services/tag.service'

export const useTagStore = defineStore('tag', () => {
  // State
  const tags = ref<TagResponse[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const tagsByType = computed(() => (type: string) => {
    return tags.value.filter(tag => tag.type === type)
  })

  const getTagById = computed(() => (id: number) => {
    return tags.value.find(tag => tag.id === id)
  })

  const tagNames = computed(() => {
    return tags.value.map(tag => tag.name)
  })

  const tagTypes = computed(() => {
    const types = new Set(tags.value.map(tag => tag.type))
    return Array.from(types)
  })

  // Actions
  const fetchTags = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await TagService.getTags()
      tags.value = response
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch tags'
      console.error('Error fetching tags:', err)
    } finally {
      loading.value = false
    }
  }

  const fetchTagsByType = async (type: string) => {
    loading.value = true
    error.value = null

    try {
      const response = await TagService.getTagsByType(type)
      // Update only tags of this type
      tags.value = tags.value.filter(tag => tag.type !== type).concat(response)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch tags by type'
      console.error('Error fetching tags by type:', err)
    } finally {
      loading.value = false
    }
  }

  const fetchTag = async (id: number) => {
    loading.value = true
    error.value = null

    try {
      const response = await TagService.getTag(id)
      const existingIndex = tags.value.findIndex(tag => tag.id === id)

      if (existingIndex !== -1) {
        tags.value[existingIndex] = response
      } else {
        tags.value.push(response)
      }

      return response
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch tag'
      console.error('Error fetching tag:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const createTag = async (tagData: TagCreateRequest) => {
    loading.value = true
    error.value = null

    try {
      const response = await TagService.createTag(tagData)
      tags.value.push(response)
      return response
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create tag'
      console.error('Error creating tag:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateTag = async (id: number, tagData: TagUpdateRequest) => {
    loading.value = true
    error.value = null

    try {
      const response = await TagService.updateTag(id, tagData)
      const index = tags.value.findIndex(tag => tag.id === id)

      if (index !== -1) {
        tags.value[index] = response
      }

      return response
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update tag'
      console.error('Error updating tag:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteTag = async (id: number) => {
    loading.value = true
    error.value = null

    try {
      await TagService.deleteTag(id)
      tags.value = tags.value.filter(tag => tag.id !== id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete tag'
      console.error('Error deleting tag:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const clearError = () => {
    error.value = null
  }

  const clearTags = () => {
    tags.value = []
  }

  // Initialize tags on store creation
  const initializeTags = async () => {
    if (tags.value.length === 0) {
      await fetchTags()
    }
  }

  return {
    // State
    tags,
    loading,
    error,

    // Getters
    tagsByType,
    getTagById,
    tagNames,
    tagTypes,

    // Actions
    fetchTags,
    fetchTagsByType,
    fetchTag,
    createTag,
    updateTag,
    deleteTag,
    clearError,
    clearTags,
    initializeTags,
  }
})
