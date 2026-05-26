/**
 * Geo-aware city copy for Urbi pitch deck (Cali · Medellín).
 * Priority: ?city= → localStorage → IP geolocation → Cali default.
 */
(function () {
  const STORAGE_KEY = 'urbi-pitch-city';
  const SUPPORTED = ['cali', 'medellin'];

  const COPY = {
    cali: {
      es: {
        heroGraphic: 'CALI',
        heroTagline:
          'La infraestructura de participación ciudadana digital<br>de Cali — y de toda Colombia.',
        problemHeadline:
          'Cali tiene <span class="g">2.2 millones</span> de ciudadanos<br>y <span class="a">cero canales digitales</span> que funcionen.',
        benchFeatured: 'Cali → Valle del Cauca → Colombia',
        opportunityCities:
          'Medellín, Bogotá, Barranquilla no tienen esto. El primero en entrar al mercado GovTech de reportes ciudadanos en Colombia define el estándar. Ese primero podemos ser nosotros.',
        revPeriodSaas: 'COP / año · Cali completo (22 comunas)',
        revPartnerExample: 'Metrocali: recarga de saldo para usuarios top',
        revExpansionLocal: 'Municipios del Valle: $8–15M COP/año c/u',
        arrYear1: 'COP Año 1 (Cali piloto)',
        arrYear2: 'COP Año 2 (Cali + 3 mun)',
        roadmapP1Title: 'MVP + Piloto Cali',
        roadmapP1Item: 'Piloto en 2 comunas de Cali',
        roadmapP2Title: 'Escala Cali + Valle',
        roadmapP2Item1: '22 comunas de Cali activas',
        roadmapP2Item2: '3 municipios del Valle',
        roadmapP3Item: 'Gobernación del Valle activa',
        sigTag: 'Integración SIG Cali',
        somDesc:
          'Cali + 8 ciudades colombianas + 2 ciudades en otro país LATAM. ARR alcanzable en 36 meses.',
        cityNameCali: '🏙️ Cali',
        cityPopCali: '2.2M hab · Fase 1 ← Ahora',
        cityNameMedellin: '🏙️ Medellín',
        cityPopMedellin: '2.9M hab · Fase 3',
        cityNameMetro: '🏘️ Municipios del Valle',
        cityPopMetro: '42 mun · Gobernación',
        timelineLetter: 'Carta de intención · Alcaldía Cali',
        ctaHeadline: 'CALI PUEDE SER<br>EL <span class="g">PRIMERO.</span>',
        ctaSub: 'Nosotros lo traemos a Colombia — desde Cali, para toda América Latina.',
        contactLocation: '📍 Cali, Colombia',
      },
      en: {
        heroGraphic: 'CALI',
        heroTagline:
          'The digital civic participation infrastructure<br>for Cali — and all of Colombia.',
        problemHeadline:
          'Cali has <span class="g">2.2 million</span> citizens<br>and <span class="a">zero digital channels</span> that actually work.',
        benchFeatured: 'Cali → Valle del Cauca → Colombia',
        opportunityCities:
          'Medellín, Bogotá, and Barranquilla do not have this yet. The first mover in Colombia\'s citizen-reporting GovTech market sets the standard — and that can be us.',
        revPeriodSaas: 'COP / year · full Cali rollout (22 districts)',
        revPartnerExample: 'Metrocali: top-up credits for power users',
        revExpansionLocal: 'Valle municipalities: $8–15M COP/year each',
        arrYear1: 'COP Year 1 (Cali pilot)',
        arrYear2: 'COP Year 2 (Cali + 3 mun)',
        roadmapP1Title: 'MVP + Cali pilot',
        roadmapP1Item: 'Pilot in 2 Cali districts',
        roadmapP2Title: 'Scale Cali + Valle',
        roadmapP2Item1: 'All 22 Cali districts live',
        roadmapP2Item2: '3 Valle municipalities',
        roadmapP3Item: 'Valle del Cauca governorship live',
        sigTag: 'Cali GIS integration',
        somDesc:
          'Cali + 8 Colombian cities + 2 cities in another LATAM country. Achievable ARR in 36 months.',
        cityNameCali: '🏙️ Cali',
        cityPopCali: '2.2M pop · Phase 1 ← Now',
        cityNameMedellin: '🏙️ Medellín',
        cityPopMedellin: '2.9M pop · Phase 3',
        cityNameMetro: '🏘️ Valle municipalities',
        cityPopMetro: '42 mun · Regional gov',
        timelineLetter: 'Letter of intent · Cali City Hall',
        ctaHeadline: 'CALI CAN BE<br>THE <span class="g">FIRST.</span>',
        ctaSub: 'We bring it to Colombia — from Cali, for all of Latin America.',
        contactLocation: '📍 Cali, Colombia',
      },
    },
    medellin: {
      es: {
        heroGraphic: 'MEDELLÍN',
        heroTagline:
          'La infraestructura de participación ciudadana digital<br>de Medellín — y de toda Colombia.',
        problemHeadline:
          'Medellín tiene <span class="g">2.5 millones</span> de ciudadanos<br>y <span class="a">cero canales digitales</span> que funcionen.',
        benchFeatured: 'Medellín → Antioquia → Colombia',
        opportunityCities:
          'Bogotá, Cali, Barranquilla no tienen esto. El primero en entrar al mercado GovTech de reportes ciudadanos en Colombia define el estándar. Ese primero podemos ser nosotros.',
        revPeriodSaas: 'COP / año · Medellín completo (16 comunas)',
        revPartnerExample: 'Metro de Medellín: recarga de saldo para usuarios top',
        revExpansionLocal: 'Municipios del Área Metropolitana: $8–15M COP/año c/u',
        arrYear1: 'COP Año 1 (Medellín piloto)',
        arrYear2: 'COP Año 2 (Medellín + 3 mun)',
        roadmapP1Title: 'MVP + Piloto Medellín',
        roadmapP1Item: 'Piloto en 2 comunas de Medellín',
        roadmapP2Title: 'Escala Medellín + Antioquia',
        roadmapP2Item1: '16 comunas de Medellín activas',
        roadmapP2Item2: '3 municipios del Área Metropolitana',
        roadmapP3Item: 'Gobernación de Antioquia activa',
        sigTag: 'Integración SIG Medellín',
        somDesc:
          'Medellín + 8 ciudades colombianas + 2 ciudades en otro país LATAM. ARR alcanzable en 36 meses.',
        cityNameCali: '🏙️ Cali',
        cityPopCali: '2.2M hab · Fase 3',
        cityNameMedellin: '🏙️ Medellín',
        cityPopMedellin: '2.9M hab · Fase 1 ← Ahora',
        cityNameMetro: '🏘️ Área Metropolitana',
        cityPopMetro: '10 mun · Gobernación',
        timelineLetter: 'Carta de intención · Alcaldía de Medellín',
        ctaHeadline: 'MEDELLÍN PUEDE SER<br>EL <span class="g">PRIMERO.</span>',
        ctaSub: 'Nosotros lo traemos a Colombia — desde Medellín, para toda América Latina.',
        contactLocation: '📍 Medellín, Colombia',
      },
      en: {
        heroGraphic: 'MEDELLÍN',
        heroTagline:
          'The digital civic participation infrastructure<br>for Medellín — and all of Colombia.',
        problemHeadline:
          'Medellín has <span class="g">2.5 million</span> citizens<br>and <span class="a">zero digital channels</span> that actually work.',
        benchFeatured: 'Medellín → Antioquia → Colombia',
        opportunityCities:
          'Bogotá, Cali, and Barranquilla do not have this yet. The first mover in Colombia\'s citizen-reporting GovTech market sets the standard — and that can be us.',
        revPeriodSaas: 'COP / year · full Medellín rollout (16 districts)',
        revPartnerExample: 'Metro de Medellín: top-up credits for power users',
        revExpansionLocal: 'Metropolitan Area municipalities: $8–15M COP/year each',
        arrYear1: 'COP Year 1 (Medellín pilot)',
        arrYear2: 'COP Year 2 (Medellín + 3 mun)',
        roadmapP1Title: 'MVP + Medellín pilot',
        roadmapP1Item: 'Pilot in 2 Medellín districts',
        roadmapP2Title: 'Scale Medellín + Antioquia',
        roadmapP2Item1: 'All 16 Medellín districts live',
        roadmapP2Item2: '3 Metropolitan Area municipalities',
        roadmapP3Item: 'Antioquia governorship live',
        sigTag: 'Medellín GIS integration',
        somDesc:
          'Medellín + 8 Colombian cities + 2 cities in another LATAM country. Achievable ARR in 36 months.',
        cityNameCali: '🏙️ Cali',
        cityPopCali: '2.2M pop · Phase 3',
        cityNameMedellin: '🏙️ Medellín',
        cityPopMedellin: '2.9M pop · Phase 1 ← Now',
        cityNameMetro: '🏘️ Metropolitan Area',
        cityPopMetro: '10 mun · Regional gov',
        timelineLetter: 'Letter of intent · Medellín City Hall',
        ctaHeadline: 'MEDELLÍN CAN BE<br>THE <span class="g">FIRST.</span>',
        ctaSub: 'We bring it to Colombia — from Medellín, for all of Latin America.',
        contactLocation: '📍 Medellín, Colombia',
      },
    },
  };

  const MEDELLIN_MATCH = [
    'medellin',
    'medellín',
    'envigado',
    'itagui',
    'itagüí',
    'bello',
    'sabaneta',
    'la estrella',
    'caldas',
    'copacabana',
    'barbosa',
    'girardota',
  ];

  const CALI_MATCH = ['cali', 'palmira', 'yumbo', 'jamundi', 'jamundí', 'candelaria'];

  function normalizeCity(value) {
    const slug = String(value || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();
    if (slug === 'medellin' || slug === 'medellín') return 'medellin';
    if (slug === 'cali') return 'cali';
    return null;
  }

  function matchCityName(name) {
    const n = String(name || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    if (MEDELLIN_MATCH.some((m) => n.includes(m.replace('í', 'i')))) return 'medellin';
    if (CALI_MATCH.some((m) => n.includes(m.replace('í', 'i')))) return 'cali';
    return null;
  }

  function cityFromUrl() {
    const param = new URLSearchParams(window.location.search).get('city');
    return normalizeCity(param);
  }

  function cityFromStorage() {
    try {
      return normalizeCity(localStorage.getItem(STORAGE_KEY));
    } catch {
      return null;
    }
  }

  function persistCity(city) {
    try {
      localStorage.setItem(STORAGE_KEY, city);
    } catch {
      /* ignore */
    }
  }

  async function cityFromIP() {
    try {
      const res = await fetch('https://ipapi.co/json/', {
        signal: AbortSignal.timeout(4000),
      });
      if (!res.ok) return null;
      const data = await res.json();
      if (data.country_code && data.country_code !== 'CO') return null;
      return matchCityName(data.city) || matchCityName(data.region);
    } catch {
      return null;
    }
  }

  async function resolveCity() {
    const fromUrl = cityFromUrl();
    if (fromUrl && SUPPORTED.includes(fromUrl)) {
      persistCity(fromUrl);
      return fromUrl;
    }

    const fromStorage = cityFromStorage();
    if (fromStorage && SUPPORTED.includes(fromStorage)) return fromStorage;

    const fromIP = await cityFromIP();
    if (fromIP && SUPPORTED.includes(fromIP)) {
      persistCity(fromIP);
      return fromIP;
    }

    return 'cali';
  }

  function detectLang() {
    const lang = (document.documentElement.lang || 'es').toLowerCase();
    return lang.startsWith('en') ? 'en' : 'es';
  }

  function applyCityCopy(city, lang) {
    const strings = COPY[city]?.[lang] || COPY.cali[lang];
    document.documentElement.dataset.pitchCity = city;

    document.querySelectorAll('[data-city]').forEach((el) => {
      const key = el.getAttribute('data-city');
      const value = strings[key];
      if (value == null) return;
      if (el.getAttribute('data-city-mode') === 'html') {
        el.innerHTML = value;
      } else {
        el.textContent = value;
      }
    });

    const caliRow = document.querySelector('[data-city-row="cali"] .city-val');
    const medellinRow = document.querySelector('[data-city-row="medellin"] .city-val');
    if (caliRow && medellinRow) {
      caliRow.classList.toggle('g', city === 'cali');
      medellinRow.classList.toggle('g', city === 'medellin');
    }

    document.title = `Urbi — Pitch Deck · ${strings.heroGraphic}`;
  }

  window.initPitchDeckCity = async function initPitchDeckCity() {
    const city = await resolveCity();
    applyCityCopy(city, detectLang());
    return city;
  };
})();
