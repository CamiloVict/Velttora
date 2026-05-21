export default {
  meta: {
    title: 'Velttora LLC — Software con IA para el mundo real',
    description:
      'Velttora LLC construye plataformas de software con inteligencia artificial que transforman industrias lentas y fragmentadas — desde cobranza y GovTech hasta educación y fitness.',
  },
  nav: {
    about: 'Nosotros',
    products: 'Productos',
    capabilities: 'Capacidades',
    team: 'Equipo',
    contact: 'Contacto',
  },
  hero: {
    label: 'Wyoming LLC · Est. 2026 · Global',
    titleLine1: 'Construimos software',
    titleLine2: 'que hace avanzar',
    titleLine3: 'industrias enteras.',
    titleAccent: 'Impulsado por IA.',
    desc: 'Velttora LLC es un estudio tecnológico que identifica industrias con sistemas rotos, manuales o fragmentados — y los reemplaza con plataformas inteligentes y escalables.',
    ctaPrimary: 'Ver productos',
    ctaSecondary: 'Hablemos',
    stats: [
      { value: '4', suffix: '+', label: 'Productos en desarrollo' },
      { value: '3', suffix: '+', label: 'Industrias transformadas' },
      { value: '$400', suffix: 'B', label: 'Mercado direccionable total' },
      { value: '1', suffix: '', label: 'Misión: impacto real' },
    ],
  },
  about: {
    eyebrow: 'Quiénes somos',
    titleLine1: 'Un estudio basado en',
    titleLine2: 'apuestas deliberadas.',
    lead1:
      'Velttora LLC es un estudio de software con sede en Wyoming, EE. UU., fundado por Camilo Arturo Victoria Labrada desde Cali, Colombia. No seguimos modas — identificamos sectores donde la tecnología ha faltado demasiado tiempo y construimos la plataforma que se vuelve el nuevo estándar.',
    lead2:
      'Cada producto que lanzamos es una apuesta deliberada en una industria lista para cambiar. Trabajamos lean, entregamos rápido y construimos para escala global desde el día uno.',
    cards: [
      {
        title: '🎯 Nuestra misión',
        text: 'Construir plataformas de software con IA que transformen industrias con sistemas obsoletos, fragmentados o manuales — más rápidas, justas y transparentes para todos.',
      },
      {
        title: '🔭 Nuestra visión',
        text: 'Ser el estudio de referencia para Latinoamérica y el mundo hispano — una empresa cuyos productos definan el nuevo estándar en GovTech, EdTech, FinTech y más.',
      },
      {
        title: '⚡ Nuestro enfoque',
        text: 'Elegimos sectores con alta fricción, baja digitalización y mercados grandes. Construimos con stacks modernos, integramos IA desde el día uno y diseñamos para el usuario final.',
      },
      {
        title: '🌎 Nuestra base',
        text: 'Constituidos en Wyoming, EE. UU. Operamos globalmente desde Cali, Colombia. Mercados prioritarios: Latinoamérica, el mercado hispano en EE. UU. y España.',
      },
    ],
  },
  products: {
    eyebrow: 'Portafolio',
    titleLine1: 'Cuatro apuestas.',
    titleLine2: 'Una tesis.',
    lead: 'Cada producto apunta a un sector donde la IA puede eliminar fricción que existe desde hace décadas.',
    openWebsite: 'abrir sitio web',
    viewPitch: 'ver pitch deck',
    items: [
      {
        num: '01',
        status: 'MVP operativo',
        icon: '📚',
        name: 'Edify',
        href: 'https://www.edifyacademy.co/',
        tagline: '// Marketplace de educación y cuidado infantil',
        description:
          'Edify conecta familias con educadores y cuidadores certificados, con un plan anual de aprendizaje basado en ciencia. Integra metodología OMS/AAP/UNICEF, matching con IA, verificación KYC y seguimiento curricular por niño.',
        tags: ['EdTech', 'Marketplace', 'IA', 'Global'],
        delay: null,
      },
      {
        num: '02',
        status: 'Pre-seed · Piloto listo',
        icon: '🏙️',
        name: 'Urbi',
        href: '/urbi-pitch-deck.html',
        tagline: '// Plataforma cívica con IA',
        description:
          'Urbi permite reportar problemas urbanos en menos de 60 segundos. La IA clasifica, detecta duplicados, geolocaliza y enruta al departamento correcto. Diseñada para ciudades en Colombia y Latinoamérica, con ambición de estándar GovTech.',
        tags: ['GovTech', 'Visión computacional', 'Smart Cities', 'B2G SaaS'],
        delay: 1,
      },
      {
        num: '03',
        status: 'Desarrollo activo',
        icon: '🐍',
        name: 'CobraAI',
        href: '/cobraai-pitch-deck.html',
        tagline: '// Cobranza inteligente',
        description:
          'CobraAI automatiza todo el ciclo de cobranza — desde la ingesta de cartera hasta planes de pago, contacto digital y escalamiento legal. Reemplaza flujos manuales con un motor de IA que puntúa, orquesta y recupera más y más rápido.',
        tags: ['FinTech', 'Orquestación IA', 'B2B SaaS', 'LATAM'],
        delay: null,
      },
      {
        num: '04',
        status: 'MVP en progreso',
        icon: '🏋️',
        name: 'Hicap',
        tagline: '// OS para competencias fitness',
        description:
          'Hicap es el sistema operativo para competencias de fitness funcional — CrossFit, Hyrox, Iron Race. Perfiles digitales, leaderboards en tiempo real y gamificación. Inscripciones, heats y resultados en vivo desde una sola plataforma.',
        tags: ['SportsTech', 'Tiempo real', 'Mobile-first', 'LATAM'],
        delay: 3,
      },
    ],
  },
  capabilities: {
    eyebrow: 'Qué hacemos',
    titleLine1: 'Capacidad full-stack.',
    titleLine2: 'Sin relleno.',
    lead: 'Diseñamos, construimos y desplegamos software de producción. De apps móviles a pipelines de IA, dominamos todo el stack.',
    items: [
      {
        icon: '🤖',
        title: 'IA y Machine Learning',
        description:
          'Visión por computador, LLMs, matching inteligente, detección de anomalías y analítica predictiva — integrados desde el día uno.',
      },
      {
        icon: '📱',
        title: 'Aplicaciones móviles',
        description:
          'Apps iOS y Android con React Native + Expo. Tiempo real, modo offline, push notifications y deep links.',
      },
      {
        icon: '⚙️',
        title: 'Backend y APIs',
        description:
          'APIs escalables con NestJS + TypeScript + PostgreSQL. Arquitectura orientada a eventos, WebSockets, colas y despliegue cloud-native.',
      },
      {
        icon: '🗺️',
        title: 'Geoespacial y datos',
        description:
          'Consultas PostGIS, heatmaps, clustering y dashboards en tiempo real. Convertimos ubicación en inteligencia accionable.',
      },
      {
        icon: '💳',
        title: 'Pagos y FinTech',
        description:
          'Stripe Connect, multimoneda, orquestación de pagos y detección de fraude. Flujos compliant para marketplaces y B2B.',
      },
      {
        icon: '🛡️',
        title: 'Confianza y seguridad',
        description:
          'KYC/biometría, verificación de antecedentes, moderación y marcos de cumplimiento. La seguridad es infraestructura.',
      },
    ],
  },
  team: {
    eyebrow: 'Las personas',
    titleBefore: 'Detrás de ',
    titleEm: 'Velttora.',
    name: 'Camilo A. Victoria L.',
    role: '// Fundador · CEO · Arquitecto de producto',
    bio1:
      'Builder, estratega de producto y emprendedor de Cali, Colombia. Camilo fundó Velttora LLC con una tesis: las empresas de tecnología más impactantes las construyen quienes entienden profundamente los problemas de su región — y tienen la ambición de resolverlos a escala global.',
    bio2:
      'Lidera estrategia de producto, arquitectura técnica y relaciones comerciales en todos los productos Velttora — desde GovTech para gobiernos hasta fintech con IA y marketplaces educativos globales.',
    linkedin: 'LinkedIn',
    location: 'Cali, Colombia',
  },
  contact: {
    eyebrow: 'Hablemos',
    titleLine1: '¿Listos para construir',
    titleLine2: 'algo real?',
    subtitle:
      'Ya seas socio, inversionista, institución pública o builder — nos encantaría escucharte.',
    name: 'Nombre *',
    email: 'Correo *',
    organization: 'Organización',
    reason: 'Motivo del contacto *',
    message: 'Mensaje *',
    namePlaceholder: 'Tu nombre completo',
    emailPlaceholder: 'tu@empresa.com',
    orgPlaceholder: 'Empresa o institución (opcional)',
    messagePlaceholder: 'Cuéntanos tu proyecto, alianza o pregunta...',
    sending: 'Enviando…',
    send: 'Enviar mensaje',
    success: 'Gracias. Recibimos tu mensaje y te contactaremos pronto.',
    error: 'No pudimos enviar tu mensaje. Intenta de nuevo o escribe a contact@velttora.com.',
    location: 'Cali, Colombia · Wyoming, EE. UU.',
    reasons: [
      { value: 'partner', label: 'Alianza / partnership' },
      { value: 'investor', label: 'Inversión' },
      { value: 'government', label: 'Gobierno / institución' },
      { value: 'builder', label: 'Builder / técnico' },
      { value: 'press', label: 'Prensa / medios' },
      { value: 'other', label: 'Otro' },
    ],
  },
  footer: {
    rights: '© 2026 Velttora LLC. Todos los derechos reservados. · Wyoming, EE. UU.',
    about: 'Nosotros',
    products: 'Productos',
    contact: 'Contacto',
  },
};
