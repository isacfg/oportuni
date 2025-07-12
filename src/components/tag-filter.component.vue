<template>
  <div class="w-full">
    <!-- Search Input for Tags -->
    <div class="relative mb-4">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Pesquisar tags..."
        class="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
      />
    </div>

    <!-- Available Tags -->
    <div class="flex flex-wrap gap-2">
      <button
        v-for="tag in filteredTags"
        :key="tag.label"
        :class="[
          'inline-flex items-center space-x-1 px-3 py-2 text-xs rounded-full transition-all duration-200',
          isSelected(tag)
            ? 'bg-blue-500 text-white shadow-md hover:bg-blue-600'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
        ]"
        @click="toggleTag(tag)"
      >
        <span>{{ tag.emoji }}</span>
        <span>{{ tag.label }}</span>
      </button>
    </div>

    <!-- Selected Tags Preview -->
    <div v-if="selectedTags.length > 0" class="mt-4 pt-4 border-t border-gray-300">
      <p class="text-sm text-gray-700 mb-2 font-medium">Tags selecionadas:</p>
      <div class="flex flex-wrap gap-2">
        <span
          v-for="tag in selectedTags"
          :key="tag.label"
          class="inline-flex items-center space-x-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full border border-blue-200"
        >
          <span>{{ tag.emoji }}</span>
          <span>{{ tag.label }}</span>
          <button
            @click="removeTag(tag)"
            class="ml-1 text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-150"
          >
            ×
          </button>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { JobTag } from '@/types/job.type'
import { JOB_TAGS } from '@/types/job.type'

// Props
defineProps<{
  modelValue?: JobTag[]
}>()

// Emits
const emit = defineEmits<{
  'update:modelValue': [tags: JobTag[]]
}>()

// Local state
const searchQuery = ref('')
const selectedTags = ref<JobTag[]>([])

// Available tags from the predefined list
const availableTags = Object.values(JOB_TAGS)

// Filtered tags based on search query
const filteredTags = computed(() => {
  if (!searchQuery.value) return availableTags

  const query = searchQuery.value.toLowerCase()
  return availableTags.filter(tag =>
    tag.label.toLowerCase().includes(query)
  )
})

// Check if tag is selected
const isSelected = (tag: JobTag): boolean => {
  return selectedTags.value.some(selected => selected.label === tag.label)
}

// Toggle tag selection
const toggleTag = (tag: JobTag) => {
  if (isSelected(tag)) {
    removeTag(tag)
  } else {
    selectedTags.value.push(tag)
    emit('update:modelValue', selectedTags.value)
  }
}

// Remove tag from selection
const removeTag = (tag: JobTag) => {
  selectedTags.value = selectedTags.value.filter(selected => selected.label !== tag.label)
  emit('update:modelValue', selectedTags.value)
}
</script>
