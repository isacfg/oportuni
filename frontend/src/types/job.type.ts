export interface Job {
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
  isSaved: boolean
  company: Company
  tags: JobTag[]
}

export interface Company {
  id: number
  name: string
  description: string
  logoUrl: string | null
  facebookUrl: string | null
  linkedinUrl: string | null
  twitterUrl: string | null
  instagramUrl: string | null
  websiteUrl: string | null
  createdAt: string
  updatedAt: string
}

export interface JobTag {
  id: number
  name: string
  type: string
  createdAt: string
  updatedAt: string
}

export interface JobsResponse {
  meta: {
    total: number
    perPage: number
    currentPage: number
    lastPage: number
    firstPage: number
    firstPageUrl: string
    lastPageUrl: string
    nextPageUrl: string | null
    previousPageUrl: string | null
  }
  data: Job[]
}

export interface SearchFilters {
  query?: string
  area?: string
  type?: string
  location?: string
  tags?: string[]
}

// Predefined tags with emojis
export const JOB_TAGS: Record<string, JobTag> = {
  REMOTE: { emoji: '🏠', label: '100% Remoto' },
  TALENT_BANK: { emoji: '⭐', label: 'Banco de Talentos' },
  REFERRAL_BONUS: { emoji: '💰', label: 'Bônus por indicação' },
  SIMPLE_APPLICATION: { emoji: '✋', label: 'Candidatura simplificada' },
  CLT: { emoji: '📄', label: 'CLT' },
  SPANISH: { emoji: '💬', label: 'Espanhol' },
  INTERNSHIP: { emoji: '⭐', label: 'Estágio' },
  FRENCH: { emoji: '💬', label: 'Francês' },
  FREELANCER: { emoji: '🏴', label: 'Freelancer' },
  ENGLISH: { emoji: '💬', label: 'Inglês' },
  REDUCED_HOURS: { emoji: '⚖️', label: 'Jornada reduzida' },
  APPRENTICE: { emoji: '👤', label: 'Jovem Aprendiz' },
  JUNIOR: { emoji: '⭐', label: 'Júnior' },
  // Technology tags
  JAVASCRIPT: { emoji: '💻', label: 'JavaScript' },
  VUEJS: { emoji: '💚', label: 'Vue.js' },
  PYTHON: { emoji: '🐍', label: 'Python' },
  DJANGO: { emoji: '🎸', label: 'Django' },
  REACT: { emoji: '⚛️', label: 'React' },
  NODEJS: { emoji: '💚', label: 'Node.js' },
  AWS: { emoji: '☁️', label: 'AWS' },
  DEVOPS: { emoji: '🔧', label: 'DevOps' },
  MACHINE_LEARNING: { emoji: '🤖', label: 'Machine Learning' },
  JAVA: { emoji: '☕', label: 'Java' },
  SPRING: { emoji: '🌱', label: 'Spring' },
}
