<template>
	<div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
		<div class="max-w-md w-full mx-auto p-8">
			<div class="text-center">
				<!-- Loading state -->
				<div v-if="isLoading" class="space-y-4">
					<div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
					<h2 class="text-2xl font-bold text-gray-900">Finalizando login...</h2>
					<p class="text-gray-600">Aguarde enquanto processamos sua autenticação</p>
				</div>

				<!-- Success state -->
				<div v-else-if="authSuccess" class="space-y-4">
					<div class="rounded-full h-12 w-12 bg-green-100 flex items-center justify-center mx-auto">
						<svg class="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7">
							</path>
						</svg>
					</div>
					<h2 class="text-2xl font-bold text-gray-900">Login realizado com sucesso!</h2>
					<p class="text-gray-600">Você será redirecionado em instantes...</p>
				</div>

				<!-- Error state -->
				<div v-else-if="authError" class="space-y-4">
					<div class="rounded-full h-12 w-12 bg-red-100 flex items-center justify-center mx-auto">
						<svg class="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
								d="M6 18L18 6M6 6l12 12"></path>
						</svg>
					</div>
					<h2 class="text-2xl font-bold text-gray-900">Erro no login</h2>
					<p class="text-gray-600">{{ authError }}</p>
					<button @click="redirectToHome"
						class="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
						Tentar novamente
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'

const router = useRouter()
const authStore = useAuthStore()

const isLoading = ref(true)
const authSuccess = ref(false)
const authError = ref<string | null>(null)

const redirectToHome = () => {
	router.push('/')
}

const getErrorMessage = (error: string) => {
	const errorMessages: Record<string, string> = {
		'access_denied': 'Acesso negado. Você cancelou o login.',
		'state_mismatch': 'Erro de segurança. Tente novamente.',
		'oauth_error': 'Erro durante a autenticação com Google.',
		'email_not_verified': 'Email não verificado. Verifique seu email com o Google.',
		'auth_failed': 'Falha na autenticação. Tente novamente.',
	}
	return errorMessages[error] || 'Erro desconhecido durante o login.'
}

onMounted(async () => {
	try {
		// Check URL parameters
		const urlParams = new URLSearchParams(window.location.search)
		const success = urlParams.get('success')
		const error = urlParams.get('error')
		const userParam = urlParams.get('user')
		const tokenParam = urlParams.get('token')

		if (error) {
			authError.value = getErrorMessage(error)
			isLoading.value = false
			return
		}

		if (success === 'true' && userParam && tokenParam) {
			try {
				// Decode user and token data
				const userData = JSON.parse(decodeURIComponent(userParam))
				const tokenData = JSON.parse(decodeURIComponent(tokenParam))

				// Set authentication in the store
				authStore.setAuth(userData, tokenData.value)

				authSuccess.value = true
				isLoading.value = false

				// Redirect to home after a brief delay
				setTimeout(() => {
					router.push('/')
				}, 2000)
			} catch (parseError) {
				console.error('Error parsing auth data:', parseError)
				authError.value = 'Erro ao processar dados de autenticação.'
				isLoading.value = false
			}
		} else {
			authError.value = 'Parâmetros de autenticação inválidos.'
			isLoading.value = false
		}
	} catch (error) {
		console.error('OAuth callback error:', error)
		authError.value = 'Erro durante a autenticação. Tente novamente.'
		isLoading.value = false
	}
})
</script>
