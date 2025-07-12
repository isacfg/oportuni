<template>
  <section
    class="w-full min-h-screen bg-cover bg-white bg-center bg-no-repeat relative"
  >
    <!-- Content -->
    <div class="relative z-10 container mx-auto px-4 flex items-center justify-between min-h-screen">
      <!-- Left Column - Content -->
      <div class="flex-1 pr-8">
        <!-- Main Title -->
        <h1 class="text-5xl font-bold text-black mb-2 leading-tight md:leading-[1.1]">
          Descubra o Seu Próximo Passo com o Oportuni
        </h1>

        <!-- Subtitle -->
        <p class="text-base text-gray-600 font-normal mb-5 max-w-2xl leading-relaxed md:leading-relaxed">
          Bolsas, monitorias e estágios organizados, filtrados e recomendados especialmente para o seu perfil.
        </p>

        <!-- Search Bar -->
        <div class="w-full max-w-2xl">
          <SearchBarComponent />
        </div>
      </div>

      <!-- Right Column - Illustration -->
      <div class="flex-1 relative h-screen flex items-center justify-center">
        <!-- Background gradient circle -->
        <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] max-w-[600px] aspect-square bg-gradient-to-br from-purple-200 via-purple-200 to-yellow-200 rounded-full opacity-50 animate-pulse"></div>

        <!-- Rotating container for people circles -->
        <div class="absolute inset-0 animate-spin-slow">
          <!-- People circles posicionados com animações extras -->
          <div class="absolute top-20 left-20 w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg aspect-square animate-radial-1 animate-wobble-1 animate-rotate-1">
            👩‍💼
          </div>
          <div class="absolute top-16 right-24 w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg aspect-square animate-radial-2 animate-wobble-2 animate-rotate-2">
            👨‍🎓
          </div>
          <div class="absolute top-1/2 left-8 transform -translate-y-1/2 w-18 h-18 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-white font-bold text-base shadow-lg aspect-square animate-radial-3 animate-wobble-3 animate-rotate-3">
            👩‍🔬
          </div>
          <div class="absolute top-1/2 right-8 transform -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg aspect-square animate-radial-4 animate-wobble-4 animate-rotate-4">
            👨‍💻
          </div>
          <div class="absolute bottom-24 left-16 w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg aspect-square animate-radial-5 animate-wobble-5 animate-rotate-5">
            👩‍🎨
          </div>
          <div class="absolute bottom-20 right-20 w-16 h-16 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg aspect-square animate-radial-6 animate-wobble-6 animate-rotate-6">
            👨‍🏫
          </div>
          <div class="absolute top-12 left-1/2 transform -translate-x-1/2 w-18 h-18 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-base shadow-lg aspect-square animate-radial-7 animate-wobble-7 animate-rotate-7">
            👩‍⚕️
          </div>
          <div class="absolute bottom-12 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg aspect-square animate-radial-8 animate-wobble-8 animate-rotate-8">
            👨‍🔧
          </div>
        </div>

        <!-- Central "Open to Work" element -->
        <div class="relative z-10 bg-white rounded-2xl shadow-2xl p-8 border-2 border-gray-100 text-center">
          <div class="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4 aspect-square">
            💼
          </div>
          <h3 class="text-2xl font-bold text-gray-800 mb-2">Open to Work</h3>
          <p class="text-gray-600 text-sm">Conectando talentos</p>
        </div>

        <!-- Floating connecting lines/dots -->
        <div class="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-300 rounded-full opacity-60 animate-bounce"></div>
        <div class="absolute top-3/4 right-1/4 w-2 h-2 bg-purple-300 rounded-full opacity-60 animate-bounce delay-150"></div>
        <div class="absolute top-1/2 left-1/3 w-1 h-1 bg-yellow-300 rounded-full opacity-60 animate-pulse"></div>
        <div class="absolute bottom-1/3 right-1/3 w-1 h-1 bg-blue-300 rounded-full opacity-60 animate-pulse delay-300"></div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import SearchBarComponent from './search-bar.component.vue'
// import backgroundImage from '@/assets/background.png'
</script>

<style scoped>
@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin-slow {
  animation: spin-slow 20s linear infinite;
}

/* Radial movement animations */
@keyframes radial-move {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(0.82); }
}

/* Wobble (oscilação horizontal/vertical) */
@keyframes wobble {
  0%, 100% { translate: 0 0; }
  20% { translate: 2px -3px; }
  40% { translate: -3px 2px; }
  60% { translate: 3px 3px; }
  80% { translate: -2px -2px; }
}

.animate-wobble-1 { animation: wobble 3.7s ease-in-out infinite; animation-delay: 0.2s; }
.animate-wobble-2 { animation: wobble 4.1s ease-in-out infinite; animation-delay: 0.7s; }
.animate-wobble-3 { animation: wobble 3.9s ease-in-out infinite; animation-delay: 1.1s; }
.animate-wobble-4 { animation: wobble 4.3s ease-in-out infinite; animation-delay: 0.5s; }
.animate-wobble-5 { animation: wobble 3.8s ease-in-out infinite; animation-delay: 1.3s; }
.animate-wobble-6 { animation: wobble 4.2s ease-in-out infinite; animation-delay: 0.9s; }
.animate-wobble-7 { animation: wobble 3.6s ease-in-out infinite; animation-delay: 1.7s; }
.animate-wobble-8 { animation: wobble 4.0s ease-in-out infinite; animation-delay: 0.4s; }

/* Rotação individual extra */
@keyframes rotate-individual {
  0% { rotate: 0deg; }
  20% { rotate: 6deg; }
  40% { rotate: -8deg; }
  60% { rotate: 4deg; }
  80% { rotate: -4deg; }
  100% { rotate: 0deg; }
}

.animate-rotate-1 { animation: rotate-individual 7.2s ease-in-out infinite; animation-delay: 0.3s; }
.animate-rotate-2 { animation: rotate-individual 6.8s ease-in-out infinite; animation-delay: 1.1s; }
.animate-rotate-3 { animation: rotate-individual 7.5s ease-in-out infinite; animation-delay: 0.6s; }
.animate-rotate-4 { animation: rotate-individual 6.5s ease-in-out infinite; animation-delay: 1.5s; }
.animate-rotate-5 { animation: rotate-individual 7.1s ease-in-out infinite; animation-delay: 0.8s; }
.animate-rotate-6 { animation: rotate-individual 6.9s ease-in-out infinite; animation-delay: 1.3s; }
.animate-rotate-7 { animation: rotate-individual 7.3s ease-in-out infinite; animation-delay: 0.5s; }
.animate-rotate-8 { animation: rotate-individual 6.7s ease-in-out infinite; animation-delay: 1.7s; }

/* Ensure perfect circles */
.aspect-square {
  aspect-ratio: 1 / 1;
}
</style>
