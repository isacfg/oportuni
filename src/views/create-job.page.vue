<template>
	<div class="min-h-screen bg-gray-50 py-8">
		<div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
			<!-- Header -->
			<div class="mb-8">
				<h1 class="text-3xl font-bold text-gray-900">Cadastrar Nova Vaga</h1>
				<p class="mt-2 text-gray-600">Preencha as informações abaixo para criar uma nova oportunidade</p>
			</div>

			<!-- Form -->
			<div class="bg-white rounded-lg shadow-md p-6">
				<form @submit="onSubmit" class="space-y-6">
					<!-- Título da vaga -->
					<FormField v-slot="{ componentField }" name="title" :rules="validateTitle">
						<FormItem>
							<FormLabel>Título da Vaga*</FormLabel>
							<FormControl>
								<Input type="text" placeholder="Ex: Desenvolvedor Frontend Sênior"
									v-bind="componentField" />
							</FormControl>
							<FormDescription>
								O título deve ser claro e descritivo da posição
							</FormDescription>
							<FormMessage />
						</FormItem>
					</FormField>

					<!-- Descrição -->
					<FormField v-slot="{ componentField }" name="description" :rules="validateDescription">
						<FormItem>
							<FormLabel>Descrição*</FormLabel>
							<FormControl>
								<Textarea
									placeholder="Descreva as responsabilidades, requisitos e benefícios da vaga..."
									class="min-h-[120px]" v-bind="componentField" />
							</FormControl>
							<FormDescription>
								Inclua informações sobre a empresa, responsabilidades e requisitos
							</FormDescription>
							<FormMessage />
						</FormItem>
					</FormField>

					<!-- Tipo de contrato -->
					<FormField v-slot="{ componentField }" name="contractType" :rules="validateRequired">
						<FormItem>
							<FormLabel>Tipo de Contrato*</FormLabel>
							<Select v-bind="componentField">
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Selecione o tipo de contrato" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value="CLT">CLT</SelectItem>
									<SelectItem value="PJ">PJ</SelectItem>
									<SelectItem value="Estágio">Estágio</SelectItem>
									<SelectItem value="Freelancer">Freelancer</SelectItem>
									<SelectItem value="Jovem Aprendiz">Jovem Aprendiz</SelectItem>
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					</FormField>

					<!-- Localização -->
					<FormField v-slot="{ componentField }" name="location" :rules="validateLocation">
						<FormItem>
							<FormLabel>Localização*</FormLabel>
							<FormControl>
								<Input type="text" placeholder="Ex: São Paulo, SP" v-bind="componentField" />
							</FormControl>
							<FormDescription>
								Cidade e estado onde a vaga está localizada
							</FormDescription>
							<FormMessage />
						</FormItem>
					</FormField>

					<!-- Trabalho remoto -->
					<FormField v-slot="{ componentField }" name="remote">
						<FormItem class="flex flex-row items-center justify-between rounded-lg border p-4">
							<div class="space-y-0.5">
								<FormLabel class="text-base">Trabalho Remoto</FormLabel>
								<FormDescription>
									Esta vaga permite trabalho remoto
								</FormDescription>
							</div>
							<FormControl>
								<Switch v-bind="componentField" />
							</FormControl>
						</FormItem>
					</FormField>

					<!-- URL de candidatura -->
					<FormField v-slot="{ componentField }" name="applicationUrl" :rules="validateUrl">
						<FormItem>
							<FormLabel>URL para Candidatura*</FormLabel>
							<FormControl>
								<Input type="url" placeholder="https://empresa.com/vagas/candidatar"
									v-bind="componentField" />
							</FormControl>
							<FormDescription>
								Link onde os candidatos podem se candidatar à vaga
							</FormDescription>
							<FormMessage />
						</FormItem>
					</FormField>

					<!-- Candidatura simplificada -->
					<FormField v-slot="{ componentField }" name="simplifiedApplication">
						<FormItem class="flex flex-row items-center justify-between rounded-lg border p-4">
							<div class="space-y-0.5">
								<FormLabel class="text-base">Candidatura Simplificada</FormLabel>
								<FormDescription>
									Processo de candidatura simplificado
								</FormDescription>
							</div>
							<FormControl>
								<Switch v-bind="componentField" />
							</FormControl>
						</FormItem>
					</FormField>

					<!-- Jornada reduzida -->
					<FormField v-slot="{ componentField }" name="reducedHours">
						<FormItem class="flex flex-row items-center justify-between rounded-lg border p-4">
							<div class="space-y-0.5">
								<FormLabel class="text-base">Jornada Reduzida</FormLabel>
								<FormDescription>
									Oferece jornada de trabalho reduzida
								</FormDescription>
							</div>
							<FormControl>
								<Switch v-bind="componentField" />
							</FormControl>
						</FormItem>
					</FormField>

					<!-- URL externa (opcional) -->
					<FormField v-slot="{ componentField }" name="externalUrl" :rules="validateOptionalUrl">
						<FormItem>
							<FormLabel>URL Externa (opcional)</FormLabel>
							<FormControl>
								<Input type="url" placeholder="https://empresa.com/detalhes-vaga"
									v-bind="componentField" />
							</FormControl>
							<FormDescription>
								Link para mais detalhes sobre a vaga (opcional)
							</FormDescription>
							<FormMessage />
						</FormItem>
					</FormField>

					<!-- Buttons -->
					<div class="flex gap-4 pt-6">
						<Button type="submit" class="flex-1 cursor-pointer" :disabled="isSubmitting">
							<span v-if="isSubmitting" class="flex items-center gap-2">
								<svg class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none"
									viewBox="0 0 24 24">
									<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
										stroke-width="4"></circle>
									<path class="opacity-75" fill="currentColor"
										d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
									</path>
								</svg>
								Cadastrando...
							</span>
							<span v-else>Cadastrar Vaga</span>
						</Button>
						<Button type="button" class="cursor-pointer" variant="outline" @click="$router.push('/')">
							Cancelar
						</Button>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useForm } from 'vee-validate'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'

import { useAuthStore } from '@/stores/auth.store'
import { JobService } from '@/services/job.service'

const router = useRouter()
const authStore = useAuthStore()
const isSubmitting = ref(false)

// Redirect if not authenticated
if (!authStore.isAuthenticated) {
	router.push('/')
}

// Validation functions
const validateRequired = (value: unknown) => {
	if (!value || value === '') {
		return 'Este campo é obrigatório'
	}
	return true
}

const validateTitle = (value: unknown) => {
	const str = String(value || '')
	if (!str || str === '') {
		return 'Título é obrigatório'
	}
	if (str.length < 5) {
		return 'Título deve ter pelo menos 5 caracteres'
	}
	if (str.length > 100) {
		return 'Título deve ter no máximo 100 caracteres'
	}
	return true
}

const validateDescription = (value: unknown) => {
	const str = String(value || '')
	if (!str || str === '') {
		return 'Descrição é obrigatória'
	}
	if (str.length < 50) {
		return 'Descrição deve ter pelo menos 50 caracteres'
	}
	if (str.length > 5000) {
		return 'Descrição deve ter no máximo 5000 caracteres'
	}
	return true
}

const validateLocation = (value: unknown) => {
	const str = String(value || '')
	if (!str || str === '') {
		return 'Localização é obrigatória'
	}
	if (str.length < 2) {
		return 'Localização deve ter pelo menos 2 caracteres'
	}
	if (str.length > 100) {
		return 'Localização deve ter no máximo 100 caracteres'
	}
	return true
}

const validateUrl = (value: unknown) => {
	const str = String(value || '')
	if (!str || str === '') {
		return 'URL é obrigatória'
	}
	try {
		new URL(str)
		return true
	} catch {
		return 'URL inválida'
	}
}

const validateOptionalUrl = (value: unknown) => {
	const str = String(value || '')
	if (!str || str === '') {
		return true // Optional field
	}
	try {
		new URL(str)
		return true
	} catch {
		return 'URL inválida'
	}
}

// Form setup
const form = useForm({
	initialValues: {
		title: '',
		description: '',
		contractType: '',
		location: '',
		remote: false,
		applicationUrl: '',
		simplifiedApplication: false,
		reducedHours: false,
		externalUrl: ''
	}
})

// Submit handler
const onSubmit = form.handleSubmit(async (values) => {
	try {
		isSubmitting.value = true

		// Check if user is authenticated
		if (!authStore.token) {
			alert('Você precisa estar logado para cadastrar uma vaga.')
			router.push('/')
			return
		}

		// Prepare data for API
		const jobData = {
			title: values.title,
			description: values.description,
			company_id: 1, // TODO: Get user's company ID or create company selection
			contract_type: values.contractType,
			location: values.location,
			remote: Boolean(values.remote),
			application_url: values.applicationUrl,
			simplified_application: Boolean(values.simplifiedApplication),
			reduced_hours: Boolean(values.reducedHours),
			external_url: values.externalUrl || null
		}

		// Call job service to create job
		await JobService.createJob(jobData, authStore.token)

		// Show success message and redirect
		alert('Vaga cadastrada com sucesso!')
		router.push('/')

	} catch (error) {
		console.error('Erro ao cadastrar vaga:', error)
		alert('Erro ao cadastrar vaga. Tente novamente.')
	} finally {
		isSubmitting.value = false
	}
})
</script>
