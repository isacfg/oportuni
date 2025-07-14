<template>
	<div class="min-h-screen bg-white">
		<!-- Header -->
		<AppHeaderComponent />

		<!-- Job Detail Content -->
		<div class="container mx-auto px-4 py-8">
			<div v-if="job" class="max-w-7xl mx-auto">
				<!-- Job Header -->
				<div class="bg-white rounded-2xl   p-8 mb-8">
					<div class="flex items-start justify-between">
						<div class="flex-grow">
							<div class="text-sm text-gray-500 mb-2">
								Última atualização: {{ formatDate(job.updatedAt) }}
							</div>

							<h1 class="text-4xl font-bold text-gray-900 mb-4">
								{{ job.title }}
							</h1>

							<div class="flex items-center space-x-4 mb-6">
								<Button variant="default" size="lg" class="rounded-full cursor-pointer">
									Compartilhar
								</Button>
								<Button variant="outline" size="lg"
									class="rounded-full flex items-center gap-2 cursor-pointer">
									Reportar vaga
								</Button>
								<FavoriteHeartComponent v-model="isFavorited" size="md" variant="button"
									@favorited="onFavorited" />
							</div>

							<!-- Tags -->
							<div v-if="job.tags && job.tags.length" class="flex flex-wrap gap-2 mb-6">
								<JobTagComponent v-for="tag in job.tags" :key="tag.id" :tag="tag" size="md" />
							</div>

							<div class="text-sm text-gray-600">
								{{ job.company.name }}
							</div>
						</div>
					</div>
				</div>

				<!-- Main Content Grid -->
				<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
					<!-- Left Column - Main Content -->
					<div class="lg:col-span-2 space-y-8">
						<!-- About Section -->
						<div class="bg-white rounded-2xl   p-8">
							<h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center">
								📋 Sobre
							</h2>
							<div class="prose prose-gray max-w-none text-gray-700 leading-relaxed">
								<p class="mb-4">
									{{ job.description }}
								</p>
							</div>
						</div>

						<!-- Requirements Section -->
						<!-- Requisitos não disponíveis no modelo atual -->

						<!-- Responsibilities Section removido: não há dados na API -->

						<!-- Benefits Section -->
						<!-- Benefícios não disponíveis no modelo atual -->

						<!-- Other Information Section removido: não há dados na API -->
					</div>

					<!-- Right Column - Sidebar -->
					<div class="lg:col-span-1 space-y-8">
						<!-- Company Info -->
						<div class="bg-white rounded-2xl   p-6">
							<div class="flex items-center space-x-4 mb-4">
								<div class="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
									<span class="text-white font-bold text-lg">
										{{ job.company.name.charAt(0) }}
									</span>
								</div>
								<div>
									<h3 class="font-bold text-gray-900">{{ job.company.name }}</h3>
								</div>
							</div>
							<p class="text-sm text-gray-600 mb-4">
								{{ job.company.description }}
							</p>
							<div class="mb-4" v-if="job.company.websiteUrl">
								<h4 class="font-semibold text-gray-900 mb-2">Site</h4>
								<a :href="job.company.websiteUrl" target="_blank"
									class="text-blue-600 underline text-sm">
									{{ job.company.websiteUrl }}
								</a>
							</div>
						</div>

						<!-- Related Jobs removido: não há dados na API -->
					</div>
				</div>
			</div>

			<!-- Job Not Found -->
			<div v-else class="max-w-2xl mx-auto text-center py-16">
				<div class="text-6xl mb-4">😔</div>
				<h1 class="text-3xl font-bold text-gray-900 mb-4">Vaga não encontrada</h1>
				<p class="text-gray-600 mb-8">A vaga que você está procurando não existe ou foi removida.</p>
				<router-link to="/"
					class="bg-purple-600 text-white px-8 py-3 rounded-full hover:bg-purple-700 transition-colors font-medium inline-block">
					Voltar para o início
				</router-link>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import AppHeaderComponent from '@/components/app-header.component.vue'
import { Button } from '@/components/ui/button'
import JobTagComponent from '@/components/job-tag.component.vue'
import FavoriteHeartComponent from '@/components/favorite-heart.component.vue'

interface Company {
	id: number
	name: string
	description: string
	logoUrl?: string | null
	facebookUrl?: string | null
	linkedinUrl?: string | null
	twitterUrl?: string | null
	instagramUrl?: string | null
	websiteUrl?: string | null
	createdAt: string
	updatedAt: string
}

interface Tag {
	id: number
	name: string
	type: string
	createdAt: string
	updatedAt: string
}

interface Job {
	id: number
	title: string
	description: string
	companyId: number
	contractType: string
	location: string
	remote: boolean
	applicationUrl: string
	simplifiedApplication: boolean
	reducedHours: boolean
	externalUrl: string | null
	createdAt: string
	updatedAt: string
	isSaved?: boolean
	company: Company
	tags: Tag[]
}

const route = useRoute()

const job = ref<Job | null>(null)
const isFavorited = ref(false)
const isLoading = ref(true)

onMounted(async () => {
	isLoading.value = true
	try {
		const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3333'
		const id = route.params.id
		const response = await fetch(`${backendUrl}/job-posts/${id}`)
		if (!response.ok) throw new Error('Erro ao buscar vaga')
		const data = await response.json()
		job.value = data
		isFavorited.value = !!data.isSaved
	} catch {
		job.value = null
	} finally {
		isLoading.value = false
	}
})

const onFavorited = (favorited: boolean) => {
	// Aqui você pode chamar o serviço de favoritar/desfavoritar se necessário
	isFavorited.value = favorited
}

const formatDate = (dateString: string): string => {
	const date = new Date(dateString)
	return date.toLocaleDateString('pt-BR', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	})
}
</script>
