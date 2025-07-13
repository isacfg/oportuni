# Tag System Documentation

Este documento descreve como usar o sistema de tags implementado no frontend da aplicação.

## Visão Geral

O sistema de tags consiste em:
- **TagService**: Serviço para operações CRUD com a API
- **TagStore**: Store Pinia para gerenciamento de estado das tags
- **Componentes**: Implementações de exemplo nos componentes Vue

## TagService

O `TagService` é uma classe estática que fornece métodos para interagir com a API de tags usando fetch.

### Métodos Disponíveis

```typescript
// Buscar todas as tags
const tags = await TagService.getTags()

// Buscar tags por tipo
const skillTags = await TagService.getTagsByType('skill')

// Buscar uma tag específica
const tag = await TagService.getTag(1)

// Criar uma nova tag
const newTag = await TagService.createTag({
  name: 'JavaScript',
  type: 'skill'
})

// Atualizar uma tag
const updatedTag = await TagService.updateTag(1, {
  name: 'TypeScript'
})

// Deletar uma tag
await TagService.deleteTag(1)
```

### Tipos de Tags

Segundo a documentação da API, os tipos de tags suportados são:
- `skill` - Habilidades técnicas
- `benefit` - Benefícios oferecidos
- `language` - Idiomas
- `framework` - Frameworks e tecnologias
- `contract` - Tipos de contrato
- `location` - Localizações

## TagStore

O `TagStore` é um store Pinia que gerencia o estado das tags e fornece funcionalidades reativas.

### Estado

```typescript
const tagStore = useTagStore()

// Array reativo de todas as tags
tagStore.tags

// Estado de carregamento
tagStore.loading

// Mensagem de erro
tagStore.error
```

### Computed Properties

```typescript
// Array de nomes das tags
tagStore.tagNames

// Array de tipos únicos de tags
tagStore.tagTypes

// Tags filtradas por tipo
tagStore.tagsByType('skill')

// Tag por ID
tagStore.getTagById(1)
```

### Métodos

```typescript
// Inicializar tags (busca se não existirem)
await tagStore.initializeTags()

// Buscar todas as tags
await tagStore.fetchTags()

// Buscar tags por tipo
await tagStore.fetchTagsByType('skill')

// Buscar uma tag específica
await tagStore.fetchTag(1)

// Criar nova tag
await tagStore.createTag({
  name: 'Vue.js',
  type: 'framework'
})

// Atualizar tag
await tagStore.updateTag(1, {
  name: 'React'
})

// Deletar tag
await tagStore.deleteTag(1)

// Limpar erros
tagStore.clearError()

// Limpar todas as tags
tagStore.clearTags()
```

## Uso em Componentes

### Exemplo Básico

```vue
<template>
  <div>
    <div v-if="tagStore.loading">Carregando tags...</div>
    <div v-else-if="tagStore.error">{{ tagStore.error }}</div>
    <div v-else>
      <div v-for="tag in tagStore.tags" :key="tag.id">
        {{ tag.name }} ({{ tag.type }})
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useTagStore } from '@/stores/tag.store'

const tagStore = useTagStore()

onMounted(async () => {
  await tagStore.initializeTags()
})
</script>
```

### Exemplo com Filtros

```vue
<template>
  <div>
    <input 
      v-model="searchTerm" 
      placeholder="Buscar tags..."
    />
    
    <div v-for="tag in filteredTags" :key="tag">
      {{ tag }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useTagStore } from '@/stores/tag.store'

const tagStore = useTagStore()
const searchTerm = ref('')

const filteredTags = computed(() => {
  if (!searchTerm.value) return tagStore.tagNames
  return tagStore.tagNames.filter(tag =>
    tag.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
})

onMounted(async () => {
  await tagStore.initializeTags()
})
</script>
```

### Exemplo com CRUD

```vue
<template>
  <div>
    <!-- Formulário para criar tag -->
    <form @submit.prevent="createTag">
      <input v-model="newTag.name" placeholder="Nome da tag" required />
      <select v-model="newTag.type" required>
        <option value="">Selecione o tipo</option>
        <option value="skill">Habilidade</option>
        <option value="benefit">Benefício</option>
        <option value="language">Idioma</option>
        <option value="framework">Framework</option>
        <option value="contract">Contrato</option>
        <option value="location">Localização</option>
      </select>
      <button type="submit" :disabled="tagStore.loading">
        Criar Tag
      </button>
    </form>

    <!-- Lista de tags -->
    <div v-for="tag in tagStore.tags" :key="tag.id" class="tag-item">
      <span>{{ tag.name }} ({{ tag.type }})</span>
      <button @click="deleteTag(tag.id)">Deletar</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useTagStore } from '@/stores/tag.store'

const tagStore = useTagStore()

const newTag = ref({
  name: '',
  type: ''
})

const createTag = async () => {
  try {
    await tagStore.createTag(newTag.value)
    newTag.value = { name: '', type: '' }
  } catch (error) {
    console.error('Erro ao criar tag:', error)
  }
}

const deleteTag = async (id) => {
  if (confirm('Tem certeza que deseja deletar esta tag?')) {
    try {
      await tagStore.deleteTag(id)
    } catch (error) {
      console.error('Erro ao deletar tag:', error)
    }
  }
}

onMounted(async () => {
  await tagStore.initializeTags()
})
</script>
```

## Tratamento de Erros

O sistema inclui tratamento de erros em todos os métodos:

```typescript
// No store
if (tagStore.error) {
  console.error('Erro no store:', tagStore.error)
  tagStore.clearError()
}

// Nos métodos
try {
  await tagStore.createTag(tagData)
} catch (error) {
  console.error('Erro ao criar tag:', error)
}
```

## Configuração da API

O serviço está configurado para usar `http://localhost:3333` como base URL. Para mudar isso:

```typescript
// Em src/services/tag.service.ts
const BASE_URL = 'http://localhost:3333' // Altere aqui
```

## Integração com Componentes Existentes

O componente `custom-search.component.vue` já está integrado com o sistema de tags:

- As tags são carregadas automaticamente quando o componente é montado
- A busca por tags funciona com o store
- Estados de loading e erro são exibidos
- As tags são atualizadas quando o filtro é aberto

## Extensibilidade

Para adicionar novos tipos de tags:

1. Adicione o tipo na documentação da API
2. Use o tipo nos métodos do store/service
3. Atualize as interfaces se necessário

Para adicionar novos métodos:

1. Adicione no `TagService`
2. Adicione no `TagStore`
3. Teste a funcionalidade
4. Documente o novo método

## Exemplos Completos

Veja o arquivo `src/examples/tag-usage.example.ts` para exemplos completos de uso do sistema de tags. 