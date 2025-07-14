import { useAuthStore } from '@/stores/auth.store'

const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3333'

export const saveJob = async (jobPostId: number) => {
  const auth = useAuthStore()
  if (!auth.token) throw new Error('Usuário não autenticado')

  const response = await fetch(`${backendUrl}/saved-jobs`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${auth.token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ job_post_id: jobPostId })
  })

  if (!response.ok) {
    throw new Error('Erro ao salvar vaga')
  }
  return await response.json()
}

export const removeSavedJob = async (jobPostId: number) => {
  const auth = useAuthStore()
  if (!auth.token) throw new Error('Usuário não autenticado')

  const response = await fetch(`${backendUrl}/saved-jobs/job-post/${jobPostId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${auth.token}`,
      'Content-Type': 'application/json',
    }
  })

  if (!response.ok) {
    throw new Error('Erro ao remover vaga salva')
  }
  return await response.json()
}

export const getSavedJobs = async () => {
  const auth = useAuthStore()
  if (!auth.token) throw new Error('Usuário não autenticado')

  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3333'
  const response = await fetch(`${backendUrl}/saved-jobs?page=1&limit=100`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${auth.token}`,
      'Content-Type': 'application/json',
    }
  })

  if (!response.ok) {
    throw new Error('Erro ao buscar vagas salvas')
  }
  return await response.json()
} 