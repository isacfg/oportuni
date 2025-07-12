import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Job } from '@/types/job.type'
import { JOB_TAGS } from '@/types/job.type'

export const useJobStore = defineStore('job', () => {
  const jobs = ref<Job[]>([
    {
      id: '1',
      title: 'Vaga analista de sistemas',
      company: 'TechCorp',
      location: 'Remoto',
      type: 'CLT',
      tags: [
        JOB_TAGS.REMOTE,
        JOB_TAGS.JAVASCRIPT,
        JOB_TAGS.VUEJS,
        JOB_TAGS.CLT
      ],
      description: 'Estamos procurando um Analista de Sistemas experiente para integrar nossa equipe de desenvolvimento. Você será responsável por análise de requisitos, desenvolvimento de soluções e manutenção de sistemas existentes. Trabalhará com tecnologias modernas em um ambiente colaborativo e dinâmico.',
      requirements: [
        'Formação superior em Ciência da Computação, Sistemas de Informação ou áreas correlatas',
        'Experiência mínima de 2 anos com desenvolvimento web',
        'Conhecimento sólido em JavaScript e Vue.js',
        'Experiência com APIs REST e integração de sistemas',
        'Conhecimento em banco de dados relacionais'
      ],
      benefits: [
        'Plano de saúde e odontológico',
        'Vale refeição de R$ 35/dia',
        'Flexibilidade de horários',
        'Trabalho 100% remoto',
        'Plano de carreira estruturado'
      ],
      salary: 'R$ 4.500 - R$ 6.500',
      publishedAt: new Date('2024-01-15')
    },
    {
      id: '2',
      title: 'Vaga analista de sistemas',
      company: 'InnovaTech',
      location: 'São Paulo',
      type: 'Estágio',
      tags: [
        JOB_TAGS.INTERNSHIP,
        JOB_TAGS.PYTHON,
        JOB_TAGS.DJANGO,
        JOB_TAGS.SIMPLE_APPLICATION
      ],
      description: 'Oportunidade de estágio para estudantes interessados em desenvolvimento web com Python. Você participará de projetos reais, aprenderá boas práticas de programação e terá mentoria especializada. Ideal para quem está começando a carreira em tecnologia.',
      requirements: [
        'Cursando Ciência da Computação, Engenharia de Software ou áreas afins',
        'Conhecimento básico em Python',
        'Interesse em desenvolvimento web',
        'Disponibilidade para estagiar 6 horas/dia',
        'Proatividade e vontade de aprender'
      ],
      benefits: [
        'Bolsa auxílio de R$ 1.200',
        'Vale transporte',
        'Auxílio alimentação',
        'Mentoria especializada',
        'Certificado de conclusão'
      ],
      salary: 'R$ 1.200',
      publishedAt: new Date('2024-01-12')
    },
    {
      id: '3',
      title: 'Vaga analista de sistemas',
      company: 'DataSolutions',
      location: 'Rio de Janeiro',
      type: 'PJ',
      tags: [
        JOB_TAGS.FREELANCER,
        JOB_TAGS.REACT,
        JOB_TAGS.NODEJS,
        JOB_TAGS.ENGLISH
      ],
      description: 'Projeto de desenvolvimento de aplicação web completa utilizando React e Node.js. Trabalho em regime freelancer com possibilidade de extensão do contrato. Cliente internacional requer comunicação em inglês. Projeto com duração estimada de 6 meses.',
      requirements: [
        'Experiência comprovada com React e Node.js',
        'Inglês fluente para comunicação com cliente',
        'Portfólio com projetos similares',
        'Disponibilidade para reuniões em fuso horário internacional',
        'Conhecimento em TypeScript será um diferencial'
      ],
      benefits: [
        'Remuneração competitiva',
        'Flexibilidade total de horários',
        'Trabalho remoto',
        'Projeto internacional',
        'Possibilidade de renovação'
      ],
      salary: 'R$ 8.000 - R$ 12.000',
      publishedAt: new Date('2024-01-10')
    },
    {
      id: '4',
      title: 'Vaga analista de sistemas',
      company: 'CloudTech',
      location: 'Brasília',
      type: 'CLT',
      tags: [
        JOB_TAGS.AWS,
        JOB_TAGS.DEVOPS,
        JOB_TAGS.CLT,
        JOB_TAGS.REFERRAL_BONUS
      ],
      description: 'Posição para Analista de Sistemas com foco em infraestrutura cloud e DevOps. Responsável por implementar e manter soluções na AWS, automatizar processos e garantir a escalabilidade dos sistemas. Ambiente de trabalho moderno com metodologias ágeis.',
      requirements: [
        'Certificação AWS (Solutions Architect ou equivalente)',
        'Experiência com Docker e Kubernetes',
        'Conhecimento em automação e CI/CD',
        'Experiência com monitoramento e observabilidade',
        'Conhecimento em Infrastructure as Code (Terraform/CloudFormation)'
      ],
      benefits: [
        'Salário competitivo',
        'Plano de saúde premium',
        'Vale refeição R$ 40/dia',
        'Bônus por indicação de R$ 2.000',
        'Treinamentos e certificações pagos'
      ],
      salary: 'R$ 7.000 - R$ 10.000',
      publishedAt: new Date('2024-01-08')
    },
    {
      id: '5',
      title: 'Vaga analista de sistemas',
      company: 'StartupHub',
      location: 'Remoto',
      type: 'Bolsa',
      tags: [
        JOB_TAGS.REMOTE,
        JOB_TAGS.MACHINE_LEARNING,
        JOB_TAGS.PYTHON,
        JOB_TAGS.TALENT_BANK
      ],
      description: 'Oportunidade em startup inovadora focada em soluções de inteligência artificial. Trabalhe com Machine Learning aplicado a problemas reais, desenvolva algoritmos e participe de um ambiente de alta inovação. Ideal para quem quer fazer parte da revolução da IA.',
      requirements: [
        'Formação em áreas exatas (Computação, Matemática, Estatística)',
        'Conhecimento em Python e bibliotecas de ML',
        'Experiência com frameworks como TensorFlow ou PyTorch',
        'Conhecimento em análise de dados',
        'Inglês técnico para leitura'
      ],
      benefits: [
        'Bolsa de R$ 2.500',
        'Ambiente de startup dinâmico',
        'Trabalho 100% remoto',
        'Acesso a banco de talentos',
        'Participação em projetos inovadores'
      ],
      salary: 'R$ 2.500',
      publishedAt: new Date('2024-01-05')
    },
    {
      id: '6',
      title: 'Vaga analista de sistemas',
      company: 'FinTechCorp',
      location: 'São Paulo',
      type: 'CLT',
      tags: [
        JOB_TAGS.JAVA,
        JOB_TAGS.SPRING,
        JOB_TAGS.CLT,
        JOB_TAGS.REDUCED_HOURS
      ],
      description: 'Posição em fintech estabelecida no mercado financeiro. Desenvolva soluções robustas para processamento de transações financeiras usando Java e Spring. Ambiente regulamentado com alta exigência de qualidade e segurança. Oportunidade de crescimento em empresa consolidada.',
      requirements: [
        'Experiência sólida com Java 11+',
        'Conhecimento profundo do ecossistema Spring',
        'Experiência com arquitetura de microsserviços',
        'Conhecimento em segurança de aplicações',
        'Experiência com testes automatizados'
      ],
      benefits: [
        'Salário atrativo',
        'Jornada reduzida (7h/dia)',
        'Plano de saúde e odontológico',
        'Participação nos lucros',
        'Ambiente de trabalho moderno'
      ],
      salary: 'R$ 6.000 - R$ 9.000',
      publishedAt: new Date('2024-01-03')
    }
  ])

  const getJobById = computed(() => {
    return (id: string) => jobs.value.find(job => job.id === id)
  })

  return { jobs, getJobById }
})
