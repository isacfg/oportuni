<template>
  <div class="w-full max-w-2xl mx-auto">
    <!-- Main Search Input -->
    <div class="relative mb-6">
      <div class="flex items-center bg-gray-100 rounded-full  hover:shadow-md transition-shadow duration-200">
        <div class="flex-1 flex items-center">
          <div class="pl-6 pr-4 flex items-center pointer-events-none">
            <Search class="h-5 w-5 text-gray-400" />
          </div>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="O que você está procurando?"
            class="flex-1 py-4 bg-transparent text-gray-900 placeholder-gray-500 focus:outline-none text-base"
            @keyup.enter="handleSearch"
          />
        </div>
        <button
          @click="handleSearch"
          class="m-2 w-12 h-12 bg-purple-500 hover:bg-purple-600 rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-200 hover:shadow-xl"
        >
          <Search class="h-5 w-5" />
        </button>
      </div>
    </div>

    <!-- Popular Tags Section -->
    <div class="mb-4">
      <div class="flex items-center gap-3 mb-3">
        <!-- <span class="text-sm font-medium text-gray-700">Popular:</span> -->
        <div class="flex flex-wrap gap-2">
          <button
            v-for="tag in popularTags"
            :key="tag.label"
            :class="[
              'cursor-pointer inline-flex items-center space-x-1 px-3 py-1.5 text-sm rounded-full transition-all duration-200 border',
              isSelected(tag)
                ? 'bg-purple-500 text-white border-purple-500 shadow-md hover:bg-purple-600'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
            ]"
            @click="toggleTag(tag)"
          >
            <span>{{ tag.emoji }}</span>
            <span>{{ tag.label }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Selected Tags Display -->
    <div v-if="selectedTags.length > 0" class="mb-4">
      <div class="flex flex-wrap gap-2">
        <span
          v-for="tag in selectedTags"
          :key="tag.label"
          class="inline-flex items-center space-x-2 px-3 py-2 bg-purple-100 text-purple-800 text-sm rounded-full border border-purple-200"
        >
          <span>{{ tag.emoji }}</span>
          <span>{{ tag.label }}</span>
          <button
            @click="removeTag(tag)"
            class="ml-1 text-purple-600 hover:text-purple-800 font-semibold transition-colors duration-150"
          >
            ×
          </button>
        </span>
      </div>
    </div>

    <!-- Advanced Filter Toggle -->
    <!-- <div class="text-center">
      <button
        @click="toggleTagFilter"
        class="inline-flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200"
      >
        <Filter class="h-4 w-4" />
        <span>{{ showTagFilter ? 'Hide filters' : 'More filters' }}</span>
      </button>
    </div> -->

    <!-- Advanced Tag Filter (expandable) -->
    <div
      v-if="showTagFilter"
      class="mt-4 bg-white border border-gray-200 rounded-2xl p-6 shadow-lg"
    >
      <TagFilterComponent v-model="selectedTags" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Search, Filter } from 'lucide-vue-next'
import TagFilterComponent from './tag-filter.component.vue'
import type { JobTag } from '../types/job.type'
import { JOB_TAGS } from '../types/job.type'

const searchQuery = ref('')
const selectedTags = ref<JobTag[]>([])
const showTagFilter = ref(false)

// Popular tags to display prominently
const popularTags = computed(() => [
  JOB_TAGS.JAVASCRIPT,
  JOB_TAGS.VUEJS,
  JOB_TAGS.PYTHON,
  JOB_TAGS.REACT,
  JOB_TAGS.NODEJS,
  JOB_TAGS.AWS
])

const handleSearch = () => {
  // TODO: Implement search functionality
  console.log('Searching for:', searchQuery.value)
  console.log('Selected tags:', selectedTags.value)
}

const toggleTagFilter = () => {
  showTagFilter.value = !showTagFilter.value
}

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
  }
}

// Remove tag from selection
const removeTag = (tag: JobTag) => {
  selectedTags.value = selectedTags.value.filter(selected => selected.label !== tag.label)
}
</script>
