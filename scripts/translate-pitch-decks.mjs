/**
 * Generates English pitch decks from Spanish sources.
 * Run: node scripts/translate-pitch-decks.mjs
 */
import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '../public');

/** Longest phrases first to avoid partial replacements */
const PHRASES = [
  ['Confidencial · Uso interno', 'Confidential · Internal use'],
  ['La infraestructura de participación ciudadana digital', 'The digital civic participation infrastructure'],
  ['de Cali — y de toda Colombia.', 'for Cali — and all of Colombia.'],
  ['Geolocalización + deduplicación', 'Geolocation + deduplication'],
  ['Geolocalización', 'Geolocation'],
  ['millones', 'million'],
  ['Mercado objetivo', 'Target market'],
  ['Capital que buscamos', 'Capital we are raising'],
  ['Categoría', 'Category'],
  ['PITCH DECK · 2026', 'PITCH DECK · 2026'],
  ['Tiempo total: PQR tradicional vs. Urbi', 'Total time: traditional PQR vs. Urbi'],
  ['Urbi reemplaza todo eso', 'Urbi replaces all of that'],
  ['Primero en Colombia. Diseñado para LATAM.', 'First in Colombia. Built for LATAM.'],
  ['Referente más cercano a lo que construimos.', 'Closest reference to what we are building.'],
  ['Modelo cerrado', 'Closed model'],
  ['Cierre de loop real', 'Real closed-loop resolution'],
  ['IA routing automático', 'Automatic AI routing'],
  ['Soberanía de datos', 'Data sovereignty'],
  ['Offline-first', 'Offline-first'],
  ['70% más barato', '70% cheaper'],
  ['Gamificación real', 'Real gamification'],
  ['IA clasificación nativa', 'Native AI classification'],
  ['Open source datos', 'Open data'],
  ['Cali → Valle del Cauca → Colombia', 'Cali → Valle del Cauca → Colombia'],
  ['Lo que pasa sin CobraAI', 'What happens without CobraAI'],
  ['DSO excedente', 'Excess DSO'],
  ['Eficiencia cobrador', 'Collector efficiency'],
  ['Costo legal innecesario', 'Unnecessary legal cost'],
  ['Clientes nunca contactados', 'Customers never contacted'],
  ['La solución', 'The solution'],
  ['El problema', 'The problem'],
  ['El mercado', 'The market'],
  ['El modelo', 'The model'],
  ['El equipo', 'The team'],
  ['Contacto', 'Contact'],
  ['Sig →', 'Next →'],
  ['← Ant', '← Prev'],
  ['No es un CRM.', 'It is not a CRM.'],
  ['Es el sistema operativo', 'It is the operating system'],
  ['de cuentas por cobrar.', 'of accounts receivable.'],
  ['CobraAI conecta directamente a los ERPs de la empresa', 'CobraAI connects directly to the company ERPs'],
  ['sin intervención humana en el 80% de los casos.', 'without human intervention in 80% of cases.'],
  ['Reporte urbano en', 'Urban reporting in'],
  ['Resolución con', 'Resolution with'],
  ['evidencia', 'evidence'],
  ['Datos para la', 'Data for the'],
  ['ciudad', 'city'],
  ['Para el ciudadano', 'For citizens'],
  ['Para la ciudad', 'For the city'],
  ['Para el funcionario', 'For city staff'],
  ['El ciudadano', 'Citizens'],
  ['El funcionario', 'City staff'],
  ['Desconfianza ciudadana', 'Citizen distrust'],
  ['Desconexión gobierno-ciudadanía', 'Government-citizen disconnect'],
  ['Sin visibilidad', 'No visibility'],
  ['Sin seguimiento', 'No follow-up'],
  ['Sin datos', 'No data'],
  ['Sin canal único', 'No single channel'],
  ['Año 1', 'Year 1'],
  ['Año 2', 'Year 2'],
  ['Año 3', 'Year 3'],
  ['Mes ', 'Month '],
  ['Inversión', 'Investment'],
  ['Alianzas', 'Partnerships'],
  ['Prensa', 'Press'],
  ['Gracias', 'Thank you'],
  ['¿Preguntas?', 'Questions?'],
  ['Cierre', 'Close'],
  ['Resumen', 'Summary'],
  ['Oportunidad', 'Opportunity'],
  ['Tracción', 'Traction'],
  ['Roadmap', 'Roadmap'],
  ['Financiero', 'Financials'],
  ['Competencia', 'Competition'],
  ['Ventaja competitiva', 'Competitive advantage'],
  ['Tamaño de mercado', 'Market size'],
  ['ciudadanos', 'citizens'],
  ['ciudadano', 'citizen'],
  ['ciudades', 'cities'],
  ['ciudad', 'city'],
  ['gobierno', 'government'],
  ['Gobierno', 'Government'],
  ['municipio', 'municipality'],
  ['secretaría', 'department'],
  ['reportes', 'reports'],
  ['reporte', 'report'],
  ['duplicados', 'duplicates'],
  ['geolocaliza', 'geolocates'],
  ['clasifica', 'classifies'],
  ['notificación', 'notification'],
  ['satisfacción', 'satisfaction'],
  ['encuesta', 'survey'],
  ['piloto', 'pilot'],
  ['cobranza', 'collections'],
  ['deuda', 'debt'],
  ['deudor', 'debtor'],
  ['cartera', 'portfolio'],
  ['recuperación', 'recovery'],
  ['ingresos', 'revenue'],
  ['costos', 'costs'],
  ['utilidad', 'profit'],
  ['mercado', 'market'],
  ['objetivo', 'target'],
  ['estrategia', 'strategy'],
  ['producto', 'product'],
  ['plataforma', 'platform'],
  ['tecnología', 'technology'],
  ['inteligencia artificial', 'artificial intelligence'],
  ['aplicación', 'application'],
  ['móvil', 'mobile'],
  ['datos abiertos', 'open data'],
  ['transparencia', 'transparency'],
  ['participación', 'participation'],
  ['infraestructura', 'infrastructure'],
  ['digital', 'digital'],
  ['automático', 'automatic'],
  ['automática', 'automatic'],
  ['manual', 'manual'],
  ['fragmentado', 'fragmented'],
  ['escalable', 'scalable'],
  ['latinoamérica', 'Latin America'],
  ['colombia', 'Colombia'],
  ['cali', 'Cali'],
];

function translateHtml(html) {
  let out = html.replace(/lang="es"/i, 'lang="en"');
  if (!out.includes('pitch-deck-mobile.css')) {
    out = out.replace(
      '</style>',
      '</style>\n<link rel="stylesheet" href="/pitch-deck-mobile.css" />',
    );
  }
  const sorted = [...PHRASES].sort((a, b) => b[0].length - a[0].length);
  for (const [es, en] of sorted) {
    out = out.split(es).join(en);
  }
  return out;
}

for (const slug of ['urbi', 'cobraai']) {
  const esPath = path.join(publicDir, `${slug}-pitch-deck.es.html`);
  const enPath = path.join(publicDir, `${slug}-pitch-deck.en.html`);
  const html = readFileSync(esPath, 'utf8');
  writeFileSync(enPath, translateHtml(html), 'utf8');
  console.log('Wrote', enPath);
}
