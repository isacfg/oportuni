<template>
	<header class="sticky top-0 left-0 right-0 z-20 bg-transparent backdrop-blur-sm">
		<div class="container mx-auto px-4 py-6">
			<div class="flex items-center justify-between">
				<!-- Logo -->
				<RouterLink to="/" class="flex items-center space-x-2">
					<img src="@/assets/logo.png" alt="Oportuni Logo"
						class="h-16 w-16 rounded bg-white/20 backdrop-blur-sm border border-white/30 object-contain -scale-x-100" />
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
					<!-- Loading state -->
					<div v-if="authStore.isLoading" class="flex items-center space-x-2">
						<div class="animate-spin rounded-full h-4 w-4 border-b-2 border-black/60"></div>
						<span class="text-sm text-black/60">Carregando...</span>
					</div>

					<!-- Authenticated user -->
					<div v-else-if="authStore.isAuthenticated" class="flex items-center space-x-4">
						<!-- Create Job button -->
						<RouterLink to="/cadastrar-vaga"
							class="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-sm hover:shadow-md">
							Cadastrar Vaga
						</RouterLink>

						<!-- User info -->
						<div class="flex items-center space-x-3">
							<img v-if="authStore.user?.avatarUrl" :src="authStore.user.avatarUrl"
								:alt="authStore.user.fullName"
								class="h-8 w-8 rounded-full object-cover border border-white/30" />
							<div v-else
								class="h-8 w-8 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
								<span class="text-black/70 text-sm font-medium">
									{{ authStore.user?.fullName?.charAt(0).toUpperCase() }}
								</span>
							</div>
							<div class="hidden md:block">
								<p class="text-sm font-medium text-black/90">{{ authStore.user?.fullName }}</p>
								<p class="text-xs text-black/60">{{ authStore.user?.email }}</p>
							</div>
						</div>

						<!-- Logout button -->
						<button @click="handleLogout"
							class="px-4 py-2 text-sm font-medium text-black/90 hover:text-black transition-colors">
							Sair
						</button>
					</div>

					<!-- Guest user -->
					<div v-else>
						<!-- <button class="px-4 py-2 text-sm font-medium text-black/90 hover:text-black transition-colors">
              Cadastrar
            </button> -->
						<button @click="handleLogin"
							class="cursor-pointer flex items-center justify-center px-6 py-3 bg-white border border-gray-300 rounded-full shadow-sm hover:shadow-md transition-all duration-200 text-gray-700 font-medium text-sm">
							<!-- Google Logo colorido -->
							<svg class="w-5 h-5 mr-3" viewBox="0 0 24 24">
								<path fill="#4285F4"
									d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
								<path fill="#34A853"
									d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
								<path fill="#FBBC05"
									d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
								<path fill="#EA4335"
									d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
							</svg>
							<span>Entrar com Google</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	</header>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'
import { onMounted } from 'vue'

const authStore = useAuthStore()

const handleLogin = () => {
	authStore.loginWithGoogle()
}

const handleLogout = async () => {
	await authStore.logout()
}

// Initialize auth when component mounts
onMounted(() => {
	authStore.initializeAuth()

	// If user is authenticated, fetch latest user data
	if (authStore.isAuthenticated) {
		authStore.fetchUser()
	}
})
</script>
