/* Telemedicina integrada ao motor 3D original. Não cria câmera, canvas ou renderizador.
 * Conteúdo das faces derivado de projetos/telemedicina/index.html. */
const FACES = [
  {
    "slug": "visao",
    "label": "Visão",
    "title": "Problema e oportunidade",
    "description": "Teleconsulta exige mais do que vídeo: prontuário, identidade profissional, autenticidade documental, autorização, segurança e continuidade de dados. A plataforma busca oferecer essa infraestrutura a profissionais independentes e clínicas.",
    "paragraphs": [
      "O objetivo inicial é demonstrar um produto viável e a possibilidade técnica de certificação; não há certificação ou tração comercial presumidas."
    ],
    "points": [],
    "documents": [
      {
        "title": "Apresentação de captação",
        "url": "./projetos/telemedicina/index.html?doc=apresentacao#visao"
      },
      {
        "title": "Auditoria de investimento",
        "url": "./projetos/telemedicina/index.html?doc=auditoria#visao"
      }
    ],
    "url": "./projetos/telemedicina/index.html#visao"
  },
  {
    "slug": "produto",
    "label": "Produto",
    "title": "Produto SaaS",
    "description": "Funcionalidades e premissas do produto proposto: Agenda e cadastro de pacientes., Registro de episódios assistenciais., Prescrição e documentos clínicos assináveis..",
    "paragraphs": [],
    "points": [
      "Agenda e cadastro de pacientes.",
      "Registro de episódios assistenciais.",
      "Prescrição e documentos clínicos assináveis.",
      "Comunicação e atendimento remoto.",
      "Futuros módulos para organizações e integrações."
    ],
    "documents": [
      {
        "title": "Brochura técnica",
        "url": "./projetos/telemedicina/index.html?doc=requisitos#produto"
      },
      {
        "title": "Normas e e-SUS APS",
        "url": "./projetos/telemedicina/index.html?doc=regulacao-esus#produto"
      }
    ],
    "url": "./projetos/telemedicina/index.html#produto"
  },
  {
    "slug": "teleconsulta",
    "label": "Teleconsulta",
    "title": "Teleconsulta",
    "description": "Integração de videoconferência WebRTC contratada com provedor especializado. Cada sessão vinculada a profissional, paciente e atendimento. Tokens temporários, validação de permissões e protocolos de fallback.",
    "paragraphs": [
      "Custos de mídia por participante-minuto devem ser tratados como variáveis, com câmbio e regras de faturamento próprios."
    ],
    "points": [],
    "documents": [
      {
        "title": "Brochura técnica",
        "url": "./projetos/telemedicina/index.html?doc=requisitos#teleconsulta"
      },
      {
        "title": "Terceirização e operação",
        "url": "./projetos/telemedicina/index.html?doc=fornecedores-modelos#teleconsulta"
      }
    ],
    "url": "./projetos/telemedicina/index.html#teleconsulta"
  },
  {
    "slug": "prontuario",
    "label": "Prontuário",
    "title": "Prontuário eletrônico",
    "description": "Cadastros únicos, evolução clínica, prescrições, documentos, histórico de mudanças e exportação. Modelo de dados e autorização controlados internamente para preservar independência comercial.",
    "paragraphs": [
      "O e-SUS APS é referência funcional de atenção primária; sua licença de código completo para adaptação comercial não foi confirmada."
    ],
    "points": [],
    "documents": [
      {
        "title": "Brochura técnica",
        "url": "./projetos/telemedicina/index.html?doc=requisitos#prontuario"
      },
      {
        "title": "Normas e e-SUS APS",
        "url": "./projetos/telemedicina/index.html?doc=regulacao-esus#prontuario"
      }
    ],
    "url": "./projetos/telemedicina/index.html#prontuario"
  },
  {
    "slug": "certificacao",
    "label": "Certificação",
    "title": "SBIS NGS2 — Estágio 1",
    "description": "Meta de conformidade com o conjunto aplicável ECF, NGS1 e NGS2 para Telessaúde/Teleconsulta. A conformidade exige testes e evidências; contratação de serviços não certifica o sistema automaticamente.",
    "paragraphs": [
      "Provisão de referência para certificação inicial: R$ 12.500 no menor perfil de receita, sujeita à tabela e condições vigentes da SBIS.",
      "Manual e requisitos oficiais"
    ],
    "points": [],
    "documents": [
      {
        "title": "Brochura técnica",
        "url": "./projetos/telemedicina/index.html?doc=requisitos#certificacao"
      },
      {
        "title": "Normas e e-SUS APS",
        "url": "./projetos/telemedicina/index.html?doc=regulacao-esus#certificacao"
      }
    ],
    "url": "./projetos/telemedicina/index.html#certificacao"
  },
  {
    "slug": "seguranca",
    "label": "Segurança",
    "title": "Segurança e responsabilidade",
    "description": "Identidade e acesso por papel, auditoria imutável/verificável, criptografia em trânsito e repouso, backup testado, gestão de incidentes, proteção de dados pessoais e validação de assinaturas ICP-Brasil.",
    "paragraphs": [
      "Fornecedor validado transfere execução e estabelece responsabilidades contratuais, mas não elimina o dever de diligência da plataforma."
    ],
    "points": [],
    "documents": [
      {
        "title": "Brochura técnica",
        "url": "./projetos/telemedicina/index.html?doc=requisitos#seguranca"
      },
      {
        "title": "Auditoria de investimento",
        "url": "./projetos/telemedicina/index.html?doc=auditoria#seguranca"
      }
    ],
    "url": "./projetos/telemedicina/index.html#seguranca"
  },
  {
    "slug": "arquitetura",
    "label": "Arquitetura",
    "title": "Arquitetura híbrida",
    "description": "Núcleo clínico próprio, banco PostgreSQL gerenciado, hospedagem escalável, mídia de vídeo por API, assinatura como serviço, monitoramento externo e revisão independente. Interfaces internas isolam integrações para reduzir custo de troca de fornecedor.",
    "paragraphs": [
      "Contratos precisam estabelecer SLA, tratamento de dados, contingência e portabilidade."
    ],
    "points": [],
    "documents": [
      {
        "title": "Brochura técnica",
        "url": "./projetos/telemedicina/index.html?doc=requisitos#arquitetura"
      },
      {
        "title": "Terceirização e operação",
        "url": "./projetos/telemedicina/index.html?doc=fornecedores-modelos#arquitetura"
      }
    ],
    "url": "./projetos/telemedicina/index.html#arquitetura"
  },
  {
    "slug": "desenvolvimento",
    "label": "Desenvolvimento",
    "title": "Desenvolvimento: esforço e custo",
    "description": "Auditoria-base: 1.810 horas produtivas, custo econômico aproximado de R$ 228.250, equivalente a R$ 126,10/h ponderados. Faixa da auditoria: R$ 156.250–399.803. Grau de confiança C (estimativa de engenharia).",
    "paragraphs": [
      "O esforço próprio reduz desembolso, não o custo econômico. Implantação e certificação são rubricas separadas."
    ],
    "points": [],
    "documents": [
      {
        "title": "Custos editáveis",
        "url": "./projetos/telemedicina/index.html?doc=simulador-custos#desenvolvimento"
      },
      {
        "title": "Auditoria de investimento",
        "url": "./projetos/telemedicina/index.html?doc=auditoria#desenvolvimento"
      }
    ],
    "url": "./projetos/telemedicina/index.html#desenvolvimento"
  },
  {
    "slug": "operacao",
    "label": "Operação 24m",
    "title": "Operação por 24 meses",
    "description": "As faixas e classes referem-se às premissas da auditoria fornecida; não equivalem a orçamentos vinculantes.",
    "paragraphs": [],
    "points": [],
    "documents": [
      {
        "title": "Pesquisa de custos",
        "url": "./projetos/telemedicina/index.html?doc=estudos-custos#operacao"
      },
      {
        "title": "Custos editáveis",
        "url": "./projetos/telemedicina/index.html?doc=simulador-custos#operacao"
      },
      {
        "title": "Auditoria de investimento",
        "url": "./projetos/telemedicina/index.html?doc=auditoria#operacao"
      }
    ],
    "url": "./projetos/telemedicina/index.html#operacao"
  },
  {
    "slug": "unitarios",
    "label": "Custos unitários",
    "title": "Simulador unitário",
    "description": "Estimativas com custos de desenvolvimento separados da sustentação. Ajuste o cenário para obter custo por consulta, médico-mês, margem e ponto de equilíbrio.",
    "paragraphs": [
      "Cenário com carteira constante durante 24 meses; não é a curva de crescimento linear 25→150 da auditoria. Exclui tributos e aquisição de clientes."
    ],
    "points": [],
    "documents": [
      {
        "title": "Pesquisa de custos",
        "url": "./projetos/telemedicina/index.html?doc=estudos-custos#unitarios"
      },
      {
        "title": "Custos editáveis",
        "url": "./projetos/telemedicina/index.html?doc=simulador-custos#unitarios"
      }
    ],
    "url": "./projetos/telemedicina/index.html#unitarios"
  },
  {
    "slug": "mercado",
    "label": "Mercado e riscos",
    "title": "Mercado, fornecedores e riscos",
    "description": "Referências de mercado: NOXCARE, Prontu+, Ti.Clinic, Medicina Direta e Feegow. Comparações precisam observar escopo, categoria e validade da certificação.",
    "paragraphs": [
      "Fornecedores para avaliar: AWS Chime SDK, Twilio/Daily, DigitalOcean, Cloudflare e provedores de assinatura ICP-Brasil. Preços são indicativos e dependem de cotação, volume e câmbio.",
      "Riscos dominantes: conformidade NGS2, engenharia de segurança, aquisição de assinantes, sustentação e dependência de terceiros."
    ],
    "points": [],
    "documents": [
      {
        "title": "Pesquisa de custos",
        "url": "./projetos/telemedicina/index.html?doc=estudos-custos#mercado"
      },
      {
        "title": "Terceirização e operação",
        "url": "./projetos/telemedicina/index.html?doc=fornecedores-modelos#mercado"
      }
    ],
    "url": "./projetos/telemedicina/index.html#mercado"
  },
  {
    "slug": "investimento",
    "label": "Investimento",
    "title": "Captação e execução",
    "description": "A auditoria sugere duas tranches ilustrativas: R$ 80 mil para preparação pré-operacional e R$ 180–220 mil para tração. Não se trata de oferta vinculante, nem cobre o custo econômico integral se o fundador remunerar todas as horas.",
    "paragraphs": [
      "Marcos: núcleo clínico → integração → conformidade → pré-auditoria → piloto → expansão condicionada à adesão.",
      "Contato para colaboração"
    ],
    "points": [],
    "documents": [
      {
        "title": "Apresentação de captação",
        "url": "./projetos/telemedicina/index.html?doc=apresentacao#investimento"
      },
      {
        "title": "Auditoria de investimento",
        "url": "./projetos/telemedicina/index.html?doc=auditoria#investimento"
      }
    ],
    "url": "./projetos/telemedicina/index.html#investimento"
  }
];
export default {
  id: 'telemedicina',
  name: 'Telemedicina',
  title: 'Telemedicina <em>e saúde digital.</em>',
  intro: 'Proposta de prontuário eletrônico e teleconsulta como serviço. Estudo de produto, conformidade, arquitetura, investimento e custos estimados em 24 meses.',
  subtitle: 'Projeto em estudo · sem certificação ou implantação clínica',
  color: '#55dfd0',
  rgb: '85,223,208',
  theme: {
    background: './assets/themes/telemedicina.svg',
    base: '#081b25', mid: '#134553', accent: '#55dfd0',
    text: '#effffd', muted: '#b6dce0', panel: '#102c38', panel2: '#205260'
  },
  position: [20, 8, -12],
  texturePath: './assets/modules/telemedicina/face-{n}.jpg',
  menu: FACES.map(face => face.label),
  pages: FACES.map(face => ({
    title: face.title, description: face.description, paragraphs: face.paragraphs,
    points: face.points, documents: face.documents, url: face.url
  })),
  feeds: []
};
