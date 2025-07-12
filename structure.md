# Estrutura do Projeto Oportuni

## Diretórios Principais

```
oportuni/
├── src/
│   ├── components/           # Componentes reutilizáveis
│   │   ├── ui/              # Componentes base (shadcn-vue)
│   │   ├── header.component.vue
│   │   ├── hero-section.component.vue
│   │   ├── search-bar.component.vue
│   │   ├── job-card.component.vue
│   │   └── recommendations-section.component.vue
│   ├── views/               # Páginas principais
│   │   └── home.page.vue
│   ├── types/               # Definições de tipos TypeScript
│   │   └── job.type.ts
│   ├── router/              # Configuração de rotas
│   │   └── index.ts
│   ├── stores/              # Estados globais (Pinia)
│   │   └── counter.ts
│   ├── lib/                 # Utilitários
│   │   └── utils.ts
│   ├── assets/              # Recursos estáticos
│   │   └── main.css
│   ├── App.vue              # Componente raiz
│   └── main.ts              # Ponto de entrada
├── memory-bank/             # Documentação do projeto
│   ├── progress.md          # Progresso do desenvolvimento
│   └── architecture.md      # Arquitetura do projeto
├── public/                  # Arquivos públicos
├── e2e/                     # Testes E2E
└── [arquivos de configuração]
```

## Componentes Implementados

### 🏠 Home Page (`home.page.vue`)
- Página principal da aplicação
- Combina todos os componentes da home

### 🧩 Componentes

#### HeaderComponent (`header.component.vue`)
- Cabeçalho com navegação
- Logo da aplicação
- Menu de navegação (Oportunidades, Empresas, Sobre, Contato)
- Botões de ação (Cadastrar, Entrar)

#### HeroSectionComponent (`hero-section.component.vue`)
- Seção hero com título principal
- Subtítulo explicativo
- Integra o componente de busca

#### SearchBarComponent (`search-bar.component.vue`)
- Barra de pesquisa com ícone
- Placeholder "Filtre área ou tecnologia"
- Funcionalidade de busca preparada

#### JobCardComponent (`job-card.component.vue`)
- Card para exibir oportunidades
- Logo da empresa (iniciais)
- Título da vaga
- Informações da empresa (nome, localização, tipo)
- Tags de tecnologias

#### RecommendationsSectionComponent (`recommendations-section.component.vue`)
- Seção "Recomendações Personalizadas com IA"
- Grid responsivo de cards de vagas
- Mock data de 6 vagas exemplo

## Tipos TypeScript

### Job (`job.type.ts`)
```typescript
interface Job {
  id: string
  title: string
  company: string
  location: string
  type: 'CLT' | 'PJ' | 'Estágio' | 'Bolsa' | 'Monitoria'
  tags: string[]
  // ... outros campos opcionais
}
```

### SearchFilters (`job.type.ts`)
```typescript
interface SearchFilters {
  query?: string
  area?: string
  type?: Job['type']
  location?: string
  tags?: string[]
}
```

## Stack Tecnológico

- **Framework**: Vue 3 + TypeScript + Vite
- **Estilização**: Tailwind CSS 4.1
- **Componentes**: Reka UI (shadcn-vue)
- **Ícones**: Lucide Vue Next
- **Roteamento**: Vue Router
- **Estado**: Pinia
- **Testes**: Playwright

## Status de Implementação

✅ **Concluído**:
- Estrutura base do projeto
- Todos os componentes da home page
- Tipos TypeScript
- Roteamento básico
- Design responsivo

🔄 **Próximos passos**:
- Funcionalidade de busca
- Sistema de recomendações IA
- Autenticação de usuários
- Menu mobile
- Estados de loading/error 