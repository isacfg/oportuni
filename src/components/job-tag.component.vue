<template>
  <span
    :class="[
      'inline-flex items-center space-x-1 rounded-full transition-colors',
      sizeClasses,
      getTagStyles(tag.label)
    ]"
  >
    <span>{{ tag.emoji }}</span>
    <span>{{ tag.label }}</span>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { JobTag } from '@/types/job.type'

interface Props {
  tag: JobTag
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'outline'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  variant: 'default'
})

const sizeClasses = computed(() => {
  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-3 py-1.5 text-sm'
  }
  return sizes[props.size]
})

const getTagStyles = (tagLabel: string): string => {
  const tagStyles: { [key: string]: string } = {
    'CLT': 'bg-purple-100 text-purple-700',
    'PJ': 'bg-blue-100 text-blue-700',
    'Estágio': 'bg-orange-100 text-orange-700',
    'Bolsa': 'bg-yellow-100 text-yellow-700',
    'Júnior': 'bg-orange-100 text-orange-700',
    'Sênior': 'bg-green-100 text-green-700',
    '100% Remoto': 'bg-green-100 text-green-700',
    'Remoto': 'bg-green-100 text-green-700',
    'Freelancer': 'bg-indigo-100 text-indigo-700',
    'JavaScript': 'bg-yellow-100 text-yellow-700',
    'Vue.js': 'bg-green-100 text-green-700',
    'Python': 'bg-blue-100 text-blue-700',
    'React': 'bg-cyan-100 text-cyan-700',
    'Node.js': 'bg-green-100 text-green-700',
    'AWS': 'bg-orange-100 text-orange-700',
    'DevOps': 'bg-purple-100 text-purple-700',
    'Machine Learning': 'bg-purple-100 text-purple-700',
    'Java': 'bg-red-100 text-red-700',
    'Spring': 'bg-green-100 text-green-700',
    'Django': 'bg-green-100 text-green-700',
    'Inglês': 'bg-blue-100 text-blue-700',
    'Espanhol': 'bg-red-100 text-red-700',
    'Francês': 'bg-blue-100 text-blue-700'
  }

  return tagStyles[tagLabel] || 'bg-gray-100 text-gray-700'
}
</script>
