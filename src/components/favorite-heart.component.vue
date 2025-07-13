<template>
    <div role="button" tabindex="0"
        class="relative overflow-hidden flex items-center justify-center rounded-full cursor-pointer focus:outline-none"
        :class="[
            size === 'sm' ? 'w-10 h-10' : 'w-12 h-12',
            variant === 'button' ? 'border border-gray-300 bg-white hover:bg-gray-50' : ''
        ]" :aria-label="isFavorited ? 'Desfavoritar' : 'Favoritar'" @click.stop.prevent="toggleFavorite"
        @keydown.enter.stop.prevent="toggleFavorite" @keydown.space.stop.prevent="toggleFavorite">
        <Heart :class="[
            size === 'sm' ? 'w-6 h-6' : 'w-7 h-7',
            'transition-all duration-150',
            isFavorited ? 'text-red-500 fill-red-500' : 'text-gray-400',
            isAnimating ? 'animate-pulse scale-125' : '',
            isPulsing ? 'scale-110' : 'scale-100'
        ]" />
        <!-- Spark animation elements -->
        <div v-if="isAnimating" class="absolute inset-0 pointer-events-none">
            <div class="spark spark-1"></div>
            <div class="spark spark-2"></div>
            <div class="spark spark-3"></div>
            <div class="spark spark-4"></div>
            <div class="spark spark-5"></div>
            <div class="spark spark-6"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { Heart } from 'lucide-vue-next'

interface Props {
    modelValue?: boolean
    size?: 'sm' | 'md'
    variant?: 'simple' | 'button'
}

const props = withDefaults(defineProps<Props>(), {
    modelValue: false,
    size: 'sm',
    variant: 'simple'
})

const emit = defineEmits<{
    'update:modelValue': [value: boolean]
    'favorited': [isFavorited: boolean]
}>()

const isFavorited = ref(props.modelValue)
const isAnimating = ref(false)
const isPulsing = ref(false)

const toggleFavorite = () => {
    // Trigger pulse effect on every click
    isPulsing.value = true
    setTimeout(() => {
        isPulsing.value = false
    }, 150)

    if (!isFavorited.value) {
        // Trigger spark animation when favoriting
        isAnimating.value = true
        setTimeout(() => {
            isAnimating.value = false
        }, 300)
    }

    isFavorited.value = !isFavorited.value
    emit('update:modelValue', isFavorited.value)
    emit('favorited', isFavorited.value)
}

// Watch for external changes to modelValue
watch(() => props.modelValue, (newValue) => {
    isFavorited.value = newValue
})
</script>

<style scoped>
.spark {
    position: absolute;
    width: 3px;
    height: 3px;
    background: #ef4444;
    border-radius: 50%;
    animation: sparkle 0.3s ease-out forwards;
}

.spark-1 {
    top: 2px;
    left: 50%;
    animation-delay: 0s;
}

.spark-2 {
    top: 50%;
    right: 2px;
    animation-delay: 0.05s;
}

.spark-3 {
    bottom: 2px;
    left: 50%;
    animation-delay: 0.1s;
}

.spark-4 {
    top: 50%;
    left: 2px;
    animation-delay: 0.05s;
}

.spark-5 {
    top: 25%;
    right: 25%;
    animation-delay: 0.025s;
}

.spark-6 {
    bottom: 25%;
    left: 25%;
    animation-delay: 0.075s;
}

@keyframes sparkle {
    0% {
        transform: scale(0) translate(0, 0);
        opacity: 1;
    }

    50% {
        transform: scale(1.2) translate(0, 0);
        opacity: 1;
    }

    100% {
        transform: scale(0) translate(var(--spark-x, 0), var(--spark-y, 0));
        opacity: 0;
    }
}

.spark-1 {
    --spark-x: 0;
    --spark-y: -10px;
}

.spark-2 {
    --spark-x: 10px;
    --spark-y: 0;
}

.spark-3 {
    --spark-x: 0;
    --spark-y: 10px;
}

.spark-4 {
    --spark-x: -10px;
    --spark-y: 0;
}

.spark-5 {
    --spark-x: 8px;
    --spark-y: -8px;
}

.spark-6 {
    --spark-x: -8px;
    --spark-y: 8px;
}
</style>
