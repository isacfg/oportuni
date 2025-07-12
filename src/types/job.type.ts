export interface Job {
  id: string
  title: string
  company: string
  location: string
  type: 'CLT' | 'PJ' | 'Estágio' | 'Bolsa' | 'Monitoria'
  tags: JobTag[]
  description?: string
  requirements?: string[]
  benefits?: string[]
  salary?: string
  publishedAt?: Date
}

export interface JobTag {
  label: string
  emoji: string
}

export interface SearchFilters {
  query?: string
  area?: string
  type?: Job['type']
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
