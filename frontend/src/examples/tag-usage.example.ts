/**
 * Example file showing how to use the TagService and TagStore
 * This file demonstrates different usage patterns for the tag system
 */

import { TagService } from '@/services/tag.service'
import { useTagStore } from '@/stores/tag.store'
import { ref, computed, onMounted } from 'vue'

// Example 1: Using TagService directly
export const useTagServiceExample = () => {
  const tags = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchAllTags = async () => {
    loading.value = true
    try {
      tags.value = await TagService.getTags()
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const fetchSkillTags = async () => {
    loading.value = true
    try {
      const skillTags = await TagService.getTagsByType('skill')
      console.log('Skill tags:', skillTags)
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const createNewTag = async (name: string, type: string) => {
    loading.value = true
    try {
      const newTag = await TagService.createTag({ name, type })
      console.log('Created tag:', newTag)
      // Refresh tags list
      await fetchAllTags()
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const updateTag = async (id: number, name: string) => {
    loading.value = true
    try {
      const updatedTag = await TagService.updateTag(id, { name })
      console.log('Updated tag:', updatedTag)
      // Refresh tags list
      await fetchAllTags()
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const deleteTag = async (id: number) => {
    loading.value = true
    try {
      await TagService.deleteTag(id)
      console.log('Deleted tag:', id)
      // Refresh tags list
      await fetchAllTags()
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  return {
    tags,
    loading,
    error,
    fetchAllTags,
    fetchSkillTags,
    createNewTag,
    updateTag,
    deleteTag
  }
}

// Example 2: Using TagStore (recommended approach)
export const useTagStoreExample = () => {
  const tagStore = useTagStore()

  // Initialize tags on component mount
  onMounted(async () => {
    await tagStore.initializeTags()
  })

  // Computed properties for filtered tags
  const skillTags = computed(() => tagStore.tagsByType('skill'))
  const benefitTags = computed(() => tagStore.tagsByType('benefit'))
  const languageTags = computed(() => tagStore.tagsByType('language'))

  // Search functionality
  const searchTerm = ref('')
  const filteredTags = computed(() => {
    if (!searchTerm.value) return tagStore.tagNames
    return tagStore.tagNames.filter(tag =>
      tag.toLowerCase().includes(searchTerm.value.toLowerCase())
    )
  })

  // CRUD operations using store
  const createTag = async (name: string, type: string) => {
    try {
      const newTag = await tagStore.createTag({ name, type })
      console.log('Created tag:', newTag)
    } catch (error) {
      console.error('Error creating tag:', error)
    }
  }

  const updateTag = async (id: number, name: string) => {
    try {
      const updatedTag = await tagStore.updateTag(id, { name })
      console.log('Updated tag:', updatedTag)
    } catch (error) {
      console.error('Error updating tag:', error)
    }
  }

  const deleteTag = async (id: number) => {
    try {
      await tagStore.deleteTag(id)
      console.log('Deleted tag:', id)
    } catch (error) {
      console.error('Error deleting tag:', error)
    }
  }

  // Get tag by ID
  const getTag = (id: number) => {
    return tagStore.getTagById(id)
  }

  // Refresh tags
  const refreshTags = async () => {
    await tagStore.fetchTags()
  }

  // Fetch tags by type
  const fetchTagsByType = async (type: string) => {
    await tagStore.fetchTagsByType(type)
  }

  return {
    // Store state
    tags: tagStore.tags,
    loading: tagStore.loading,
    error: tagStore.error,

    // Computed properties
    skillTags,
    benefitTags,
    languageTags,
    filteredTags,
    tagTypes: tagStore.tagTypes,
    tagNames: tagStore.tagNames,

    // Methods
    createTag,
    updateTag,
    deleteTag,
    getTag,
    refreshTags,
    fetchTagsByType,

    // Reactive refs
    searchTerm,

    // Store methods
    clearError: tagStore.clearError,
    clearTags: tagStore.clearTags
  }
}

// Example 3: Component usage pattern
export const TagManagerExample = {
  setup() {
    const {
      tags,
      loading,
      error,
      skillTags,
      benefitTags,
      searchTerm,
      filteredTags,
      createTag,
      updateTag,
      deleteTag,
      refreshTags,
      clearError
    } = useTagStoreExample()

    // Example form handlers
    const handleCreateTag = async (formData: { name: string; type: string }) => {
      await createTag(formData.name, formData.type)
      // Form will automatically reflect the new tag due to reactivity
    }

    const handleUpdateTag = async (id: number, newName: string) => {
      await updateTag(id, newName)
    }

    const handleDeleteTag = async (id: number) => {
      if (confirm('Are you sure you want to delete this tag?')) {
        await deleteTag(id)
      }
    }

    const handleRefresh = async () => {
      await refreshTags()
    }

    return {
      // State
      tags,
      loading,
      error,
      skillTags,
      benefitTags,
      searchTerm,
      filteredTags,

      // Methods
      handleCreateTag,
      handleUpdateTag,
      handleDeleteTag,
      handleRefresh,
      clearError
    }
  }
}
