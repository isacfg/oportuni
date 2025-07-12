# Arquitetura do Projeto Oportuni

## Visão Geral
Oportuni é uma plataforma para conectar pessoas às melhores oportunidades acadêmicas, com recomendações personalizadas baseadas em IA.

## Stack Tecnológico
- **Frontend**: Vue 3 + TypeScript + Vite
- **Estilização**: Tailwind CSS + Shadcn-vue
- **Roteamento**: Vue Router
- **Estado**: Pinia
- **Testes**: Playwright (E2E)

## Estrutura de Pastas
```
src/
├── components/          # Componentes reutilizáveis
│   ├── ui/             # Componentes base (shadcn-vue)
│   └── [feature]/      # Componentes específicos de funcionalidade
├── views/              # Páginas principais
├── stores/             # Estados globais (Pinia)
├── router/             # Configuração de rotas
├── lib/                # Utilitários
└── assets/             # Recursos estáticos
```

## Convenções de Nomenclatura
- **Componentes**: `name.component.tsx` (kebab-case)
- **Páginas**: `name.page.tsx` (kebab-case)
- **Serviços**: `name.service.ts` (kebab-case)
- **Stores**: `name.store.ts` (kebab-case)
- **Utils**: `name.util.ts` (kebab-case)
- **Types**: `name.type.ts` (kebab-case)

## Funcionalidades Principais
1. **Home Page**: Página inicial com busca e recomendações
2. **Sistema de Busca**: Filtros por área e tecnologia
3. **Recomendações IA**: Sugestões personalizadas de vagas
4. **Autenticação**: Login/registro de usuários
5. **Perfil**: Gerenciamento de perfil e preferências 