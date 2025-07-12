<template>
  <div class="min-h-screen">
    <!-- Header -->
    <AppHeaderComponent />

    <!-- Hero Section -->
    <HeroSectionComponent />

    <!-- Recommendations Section -->
    <RecommendationsSectionComponent />
  </div>
</template>

<script setup lang="ts">
import AppHeaderComponent from '@/components/app-header.component.vue'
import HeroSectionComponent from '@/components/hero-section.component.vue'
import RecommendationsSectionComponent from '@/components/recommendations-section.component.vue'
</script>
