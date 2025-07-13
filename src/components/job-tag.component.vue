<template>
	<span :class="[
		'inline-flex items-center space-x-1 rounded-full transition-colors',
		sizeClasses,
		getTagStyles(tag.type)
	]">
		<span>{{ tag.name }}</span>
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

const getTagStyles = (tagType: string): string => {
	const typeStyles = {
		skill: 'bg-blue-100 border border-blue-300 text-blue-700',
		framework: 'bg-green-100 border border-green-300 text-green-700',
		language: 'bg-purple-100 border border-purple-300 text-purple-700',
		benefit: 'bg-orange-100 border border-orange-300 text-orange-700',
		contract: 'bg-gray-100 border border-gray-300 text-gray-700',
		location: 'bg-pink-100 border border-pink-300 text-pink-700',
	}

	return typeStyles[tagType as keyof typeof typeStyles] || 'bg-gray-100 border border-gray-300 text-gray-700'
}
</script>
