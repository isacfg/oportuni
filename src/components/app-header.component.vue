<template>
  <header class="sticky top-0 left-0 right-0 z-20 bg-transparent backdrop-blur-sm">
    <div class="container mx-auto px-4 py-6">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <RouterLink to="/" class="flex items-center space-x-2">
          <img src="@/assets/logo.png" alt="Oportuni Logo" class="h-16 w-16 rounded bg-white/20 backdrop-blur-sm border border-white/30 object-contain -scale-x-100" />
        </RouterLink>

        <!-- Navigation -->
        <!-- <nav class="hidden md:flex items-center space-x-8">
          <a href="#" class="text-black/90 hover:text-black transition-colors font-medium">
            Oportunidades
          </a>
          <a href="#" class="text-black/90 hover:text-black transition-colors font-medium">
            Empresas
          </a>
          <a href="#" class="text-black/90 hover:text-black transition-colors font-medium">
            Sobre
          </a>
          <a href="#" class="text-black/90 hover:text-black transition-colors font-medium">
            Contato
          </a>
        </nav> -->

        <!-- Actions -->
        <div class="flex items-center space-x-4">
          <!-- <button class="px-4 py-2 text-sm font-medium text-black/90 hover:text-black transition-colors">
            Cadastrar
          </button> -->
          <button class="px-6 py-2 bg-white/20 backdrop-blur-sm border border-white/30 text-black text-sm font-medium rounded-lg hover:bg-white/30 transition-all duration-200">
            Entrar
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
