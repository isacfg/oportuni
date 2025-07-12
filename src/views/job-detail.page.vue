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
							<div v-if="job.publishedAt" class="text-sm text-gray-500 mb-2">
								Última atualização: {{ formatDate(job.publishedAt) }}
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
							</div>

							<!-- Tags -->
							<div class="flex flex-wrap gap-2 mb-6">
								<JobTagComponent v-for="tag in job.tags" :key="tag.label" :tag="tag" size="md" />
							</div>

							<div class="text-sm text-gray-600">
								Via Vagas
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
									Esta posição é para atuar na <strong>Ânima</strong>, o maior e o mais inovador
									ecossistema de ensino de qualidade do país, com instituições espalhadas por todo o
									Brasil. Somos uma empresa em constante evolução, que energiza em cada detalhe novas
									formas de promover a educação. Por aqui, essa é a essência que nos faz ser
									diferentes.
								</p>
								<p class="mb-4">
									ANI: independente de cor, idade, gênero, orientação sexual, origem, religião ou
									qualquer outra característica, sei particularmente que tenha, se você tem desejo e
									energia para contribuir para a transformação de vidas por meio da Educação, aqui é o
									seu lugar!
								</p>
								<p class="mb-4">
									Confira mais sobre a nossa oportunidade.
								</p>
							</div>
						</div>

						<!-- Requirements Section -->
						<div class="bg-white rounded-2xl   p-8">
							<h3 class="text-xl font-bold text-gray-900 mb-4">
								Do que você precisa para concorrer à vaga:
							</h3>
							<ul class="space-y-3 text-gray-700">
								<li v-for="requirement in job.requirements" :key="requirement"
									class="flex items-start space-x-3">
									<span class="text-purple-600 text-lg">•</span>
									<span>{{ requirement }}</span>
								</li>
							</ul>
						</div>

						<!-- Responsibilities Section -->
						<div class="bg-white rounded-2xl   p-8">
							<h3 class="text-xl font-bold text-gray-900 mb-4">
								Como será seu dia a dia como educador ou educadora:
							</h3>
							<ul class="space-y-3 text-gray-700">
								<li class="flex items-start space-x-3">
									<span class="text-purple-600 text-lg">•</span>
									<span>Responsável por auxiliar no desenvolvimento e coordenação das ações
										relacionadas à internacionalização das IES do Ecossistema Ânima, alinhando-se às
										práticas acadêmicas via EZA, às necessidades sociais e às metas estabelecidas
										pelo MEC;</span>
								</li>
								<li class="flex items-start space-x-3">
									<span class="text-purple-600 text-lg">•</span>
									<span>Elaborar material e gerir a divulgação dos programas internacionais para todo
										o Ecossistema Ânima;</span>
								</li>
								<li class="flex items-start space-x-3">
									<span class="text-purple-600 text-lg">•</span>
									<span>Organizar os eventos online de internacionalização;</span>
								</li>
								<li class="flex items-start space-x-3">
									<span class="text-purple-600 text-lg">•</span>
									<span>Gerir e atualizar o conteúdo das páginas internacionais de todas as IES do
										Ecossistema Ânima;</span>
								</li>
								<li class="flex items-start space-x-3">
									<span class="text-purple-600 text-lg">•</span>
									<span>Acompanhar e responder as mensagens direcionadas para o e-mail;</span>
								</li>
								<li class="flex items-start space-x-3">
									<span class="text-purple-600 text-lg">•</span>
									<span>Atender e gerir as inscrições dos programas de curta duração no
										exterior;</span>
								</li>
							</ul>
						</div>

						<!-- Benefits Section -->
						<div class="bg-white rounded-2xl   p-8">
							<h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center">
								💝 Benefícios
							</h2>
							<ul class="space-y-3">
								<li v-for="benefit in job.benefits" :key="benefit" class="flex items-start space-x-3">
									<span class="text-green-600 text-lg">•</span>
									<span class="text-gray-700">{{ benefit }}</span>
								</li>
							</ul>
						</div>

						<!-- Other Information Section -->
						<div class="bg-white rounded-2xl   p-8">
							<h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center">
								ℹ️ Outras Informações
							</h2>
							<p class="text-gray-700 mb-4">
								Selecionamos as principais informações da posição. Para conferir o descritivo completo,
								clique em <strong>"Acessar"</strong>.
							</p>
							<!-- <div class="bg-purple-600 text-white p-6 rounded-2xl">
                <div class="flex items-center space-x-3 mb-4">
                  <div class="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <span class="text-purple-600 font-bold">👋</span>
                  </div>
                  <span class="font-semibold text-lg">Hey!</span>
                </div>
                <p class="text-sm mb-4">
                  Cadastre-se na Remotar para ter acesso a todos os recursos da plataforma, inclusive inscrever-se em vagas exclusivas e selecionadas!
                </p>
                <Button variant="default" size="lg" class="rounded-full cursor-pointer text-sm">
                  Acessar
                </Button>
              </div> -->
						</div>
					</div>

					<!-- Right Column - Sidebar -->
					<div class="lg:col-span-1 space-y-8">
						<!-- Company Info -->
						<div class="bg-white rounded-2xl   p-6">
							<div class="flex items-center space-x-4 mb-4">
								<div class="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
									<span class="text-white font-bold text-lg">A</span>
								</div>
								<div>
									<h3 class="font-bold text-gray-900">Anima Educação</h3>
								</div>
							</div>
							<p class="text-sm text-gray-600 mb-4">
								Com o propósito de "Transformar o Brasil pela Educação", a Ânima Educação é o maior
								ecossistema de educação de qualidade do país, com um portfólio de marcas vencedoras que
								atendem desde a educação básica até a pós-graduação.
							</p>
							<div class="mb-4">
								<h4 class="font-semibold text-gray-900 mb-2">Saiba mais</h4>
								<div class="space-y-2">
									<div class="flex items-center space-x-2">
										<span class="text-blue-600">📘</span>
										<span class="text-sm text-gray-600">Facebook</span>
									</div>
									<div class="flex items-center space-x-2">
										<span class="text-purple-600">📷</span>
										<span class="text-sm text-gray-600">Instagram</span>
									</div>
									<div class="flex items-center space-x-2">
										<span class="text-blue-500">💼</span>
										<span class="text-sm text-gray-600">LinkedIn</span>
									</div>
									<div class="flex items-center space-x-2">
										<span class="text-blue-400">🐦</span>
										<span class="text-sm text-gray-600">Twitter</span>
									</div>
								</div>
							</div>
							<Button variant="default" size="lg" class="w-full rounded-full cursor-pointer text-sm">
								Acessar
							</Button>
						</div>

						<!-- Related Jobs -->
						<div class="bg-white rounded-2xl   p-6">
							<h3 class="font-bold text-gray-900 mb-4 flex items-center">
								🔗 Relacionadas
							</h3>
							<div class="space-y-4">
								<div class=" rounded-xl p-4">
									<div class="flex items-center space-x-3 mb-3">
										<div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
											<span class="text-green-600 font-bold">💰</span>
										</div>
										<div class="flex-grow">
											<h4 class="font-semibold text-gray-900 text-sm">Analista De Estratégia De
												Prevenção A Fraude Sênior</h4>
											<div class="text-xs text-gray-500">Conta Simples</div>
											<div class="text-xs text-gray-500">Via Gupy</div>
										</div>
									</div>
									<div class="flex flex-wrap gap-1 mb-3">
										<JobTagComponent :tag="{ emoji: '📄', label: 'CLT' }" size="sm" />
										<JobTagComponent :tag="{ emoji: '⭐', label: 'Sênior' }" size="sm" />
										<JobTagComponent :tag="{ emoji: '🏠', label: '100% Remoto' }" size="sm" />
									</div>
									<Button variant="secondary" size="sm"
										class="w-full rounded-full cursor-pointer text-xs">
										Saber mais
									</Button>
								</div>

								<div class=" rounded-xl p-4">
									<div class="flex items-center space-x-3 mb-3">
										<div
											class="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
											<span class="text-yellow-600 font-bold">📝</span>
										</div>
										<div class="flex-grow">
											<h4 class="font-semibold text-gray-900 text-sm">Estagiário Administrativo Em
												Pesquisa Clínica</h4>
											<div class="text-xs text-gray-500">Synvia</div>
											<div class="text-xs text-gray-500">Via Gupy</div>
										</div>
									</div>
									<div class="flex flex-wrap gap-1 mb-3">
										<JobTagComponent :tag="{ emoji: '⭐', label: 'Estágio' }" size="sm" />
										<JobTagComponent :tag="{ emoji: '⭐', label: 'Júnior' }" size="sm" />
										<JobTagComponent :tag="{ emoji: '🏠', label: '100% Remoto' }" size="sm" />
									</div>
									<Button variant="secondary" size="sm"
										class="w-full rounded-full cursor-pointer text-xs">
										Saber mais
									</Button>
								</div>

								<div class=" rounded-xl p-4">
									<div class="flex items-center space-x-3 mb-3">
										<div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
											<span class="text-blue-600 font-bold">C</span>
										</div>
										<div class="flex-grow">
											<h4 class="font-semibold text-gray-900 text-sm">Analista Fiscal Júnior</h4>
											<div class="text-xs text-gray-500">Contabilizei</div>
											<div class="text-xs text-gray-500">Via Gupy</div>
										</div>
									</div>
									<div class="flex flex-wrap gap-1 mb-3">
										<JobTagComponent :tag="{ emoji: '📄', label: 'CLT' }" size="sm" />
										<JobTagComponent :tag="{ emoji: '⭐', label: 'Júnior' }" size="sm" />
										<JobTagComponent :tag="{ emoji: '🏠', label: '100% Remoto' }" size="sm" />
									</div>
									<Button variant="secondary" size="sm"
										class="w-full rounded-full cursor-pointer text-xs">
										Saber mais
									</Button>
								</div>
							</div>
						</div>
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
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppHeaderComponent from '@/components/app-header.component.vue'
import { useJobStore } from '@/stores/job.store'
import { Button } from '@/components/ui/button'
import JobTagComponent from '@/components/job-tag.component.vue'

const route = useRoute()
const jobStore = useJobStore()

const job = computed(() => {
	const id = route.params.id as string
	return jobStore.getJobById(id)
})

const formatDate = (date: Date): string => {
	return date.toLocaleDateString('pt-BR', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	})
}
</script>
