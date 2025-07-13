<template>
	<span :class="[
		'inline-flex items-center space-x-1 rounded-full transition-colors',
		sizeClasses,
		getTagStyles(tag.label)
	]">
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

	return 'bg-white border border-gray-300 text-gray-700'
}
</script>
