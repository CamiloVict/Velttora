#!/usr/bin/env python3
"""Sync pitch-deck demo prototype from public/urbi_app_prototype.html (canonical URBI UI)."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
PROTO = PUBLIC / "urbi_app_prototype.html"
PITCH_ES = PUBLIC / "urbi-pitch-deck.es.html"
PITCH_EN = PUBLIC / "urbi-pitch-deck.en.html"

SCOPE = "#s_demo .urbi-proto"
DEMO_CSS_START = "/* ── SLIDE DEMO: PRODUCTO ── */"
DEMO_CSS_END = "/* ── s_reportes: navegación entre categorías ── */"
JS_START = "// ── URBI PROTOTYPE LOGIC ──"
JS_END = "// Slide de categorías de reporte"

URBI_CATS = [
    ("vial", "ti-road", "Vías", "Sec. Infraestructura"),
    ("andenes", "ti-walk", "Andenes", "Sec. Infraestructura"),
    ("luz", "ti-bulb", "Luminaria", "EMCALI"),
    ("arboles", "ti-trees", "Arbolado", "DAGMA"),
    ("basura", "ti-trash", "Residuos", "Sec. Salud"),
    ("vehiculo", "ti-car", "Vehículos", "Tránsito"),
    ("ruido", "ti-volume", "Ruido", "Sec. Salud / Policía"),
    ("animal", "ti-paw", "Fauna", "DAGMA"),
    ("agua", "ti-droplet", "Inundación", "Gest. Riesgo"),
    ("grafiti", "ti-spray", "Grafiti", "Sec. Convivencia"),
    ("obra", "ti-building", "Const. Ilegal", "Curaduría"),
    ("fuga", "ti-droplet-half", "Fugas", "EMCALI"),
    ("seguridad", "ti-lock", "Inseguridad", "Sec. Seguridad"),
    ("evento", "ti-confetti", "Comunidad", "Sec. Cultura"),
]

TOKENS = """
#s_demo .urbi-proto {
  --font-sans: 'Bricolage Grotesque', sans-serif;
  --color-text-primary: #0D1B2A;
  --color-text-secondary: #5C6B7A;
  --color-text-tertiary: #8B9AAB;
  --color-text-success: #007A5E;
  --color-text-warning: #C45A00;
  --color-text-info: #1565C0;
  --color-background-primary: #FFFFFF;
  --color-background-secondary: #F4F6F8;
  --color-background-tertiary: #EEF1F4;
  --color-background-success: #E6FBF5;
  --color-background-warning: #FFF4E6;
  --color-background-info: #E8F4FD;
  --color-border-primary: #D8DEE4;
  --color-border-secondary: #C5CDD6;
  --color-border-tertiary: #E2E8EE;
  --color-border-success: rgba(0, 200, 150, 0.35);
  --color-border-warning: rgba(255, 140, 66, 0.45);
  --border-radius-md: 10px;
  --border-radius-lg: 14px;
  font-family: var(--font-sans);
}
#s_demo .urbi-proto .device {
  width: 280px;
  height: 580px;
  border-radius: 40px;
  padding: 8px;
  border: 1px solid rgba(255,255,255,0.12);
  background: var(--bg2);
  flex-shrink: 0;
}
#s_demo .urbi-proto .screen-wrap { border-radius: 34px; }
#s_demo .urbi-proto .cat-grid-full {
  max-height: 140px;
  overflow-y: auto;
  margin-bottom: 10px;
}
#s_demo .urbi-proto .cat-grid-full::-webkit-scrollbar { width: 3px; }
#s_demo .urbi-proto .cat-grid-full::-webkit-scrollbar-thumb {
  background: rgba(0, 200, 150, 0.35);
  border-radius: 3px;
}
"""

DEMO_PANEL_CSS = """
#s_demo { padding: 0; }
#s_demo > div { display: flex; flex: 1; gap: 0; min-height: 0; }
.demo-step-btn {
  background: var(--bg2);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 10px 14px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: all .2s;
  text-align: left;
  font-family: inherit;
  width: 100%;
  color: inherit;
}
.demo-step-btn.active {
  border-color: rgba(0,229,160,0.4) !important;
  background: rgba(0,229,160,0.06) !important;
}
.demo-step-btn:hover:not(.active) {
  border-color: rgba(255,255,255,0.15) !important;
  background: rgba(255,255,255,0.03) !important;
}
"""

GOTO_MAP = [
    ("splash", 0, 1),
    ("home", 1, 2),
    ("report", 2, 3),
    ("dup", 3, 4),
    ("success", 4, 5),
    ("track", 5, 6),
]


def _extract_keyframes(css: str) -> tuple[str, str]:
    """Pull @keyframes blocks out before scoping (nested braces)."""
    keyframes: list[str] = []
    out: list[str] = []
    i = 0
    while i < len(css):
        if css.startswith("@keyframes", i):
            start = i
            j = css.find("{", i)
            if j < 0:
                out.append(css[i:])
                break
            depth = 0
            k = j
            while k < len(css):
                ch = css[k]
                if ch == "{":
                    depth += 1
                elif ch == "}":
                    depth -= 1
                    if depth == 0:
                        keyframes.append(css[start : k + 1])
                        i = k + 1
                        break
                k += 1
            else:
                out.append(css[i:])
                break
        else:
            nxt = css.find("@keyframes", i + 1)
            if nxt < 0:
                out.append(css[i:])
                break
            out.append(css[i:nxt])
            i = nxt
    return "".join(out), "\n\n".join(keyframes)


def scope_prototype_css(raw: str) -> str:
    """Prefix prototype class rules under #s_demo .urbi-proto."""
    skip_prefixes = (".wrap", ".panel", ".nav-", ".hint-")
    raw = re.sub(r"\*\{[^}]+\}", "", raw)
    raw = re.sub(r"\.device\{[^}]+\}", "", raw)

    raw, keyframes = _extract_keyframes(raw)

    def repl(match: re.Match[str]) -> str:
        selector = match.group(1).strip()
        body = match.group(2)
        parts = [p.strip() for p in selector.split(",") if p.strip()]
        scoped: list[str] = []
        for sel in parts:
            if any(sel.startswith(p) for p in skip_prefixes):
                continue
            if sel.startswith("."):
                scoped.append(f"{SCOPE} {sel}")
        if not scoped:
            return ""
        return ",".join(scoped) + "{" + body + "}"

    css = re.sub(r"([^{}@]+)\{([^}]*)\}", repl, raw)
    css = re.sub(r"\n{3,}", "\n\n", css).strip()
    if keyframes:
        css += "\n\n" + keyframes
    return css.replace("}}", "}")


def extract_proto_parts() -> tuple[str, str]:
    text = PROTO.read_text(encoding="utf-8")
    style_m = re.search(r"<style>(.*?)</style>", text, re.DOTALL)
    if not style_m:
        raise SystemExit("No <style> in urbi_app_prototype.html")
    raw_css = style_m.group(1).strip()
    # Remove rules for external panel
    raw_css = re.sub(r"\.wrap\{[^}]+\}", "", raw_css)
    raw_css = re.sub(r"\.panel[^{]*\{[^}]+\}", "", raw_css)
    raw_css = re.sub(r"\.panel-[^{]*\{[^}]+\}", "", raw_css)
    raw_css = re.sub(r"\.nav-[^{]*\{[^}]+\}", "", raw_css)
    raw_css = re.sub(r"\.hint-[^{]*\{[^}]+\}", "", raw_css)

    wrap_tag = '<div class="screen-wrap">'
    wrap_pos = text.find(wrap_tag)
    if wrap_pos < 0:
        raise SystemExit("No screen-wrap in urbi_app_prototype.html")
    content_start = wrap_pos + len(wrap_tag)
    end_marker = "  </div>\n</div>\n</div>\n\n<script>"
    end_pos = text.find(end_marker, content_start)
    if end_pos < 0:
        raise SystemExit("Could not find end of screen-wrap content")
    screens = text[content_start:end_pos].strip()

    for name, _idx, n in GOTO_MAP:
        screens = re.sub(
            rf"goTo\('{name}',\s*\d+\)",
            f"urbiGoTo({n})",
            screens,
        )
    screens = screens.replace("simPhoto()", "urbiSimPhoto()")
    screens = screens.replace("onclick=\"selCat(", "onclick=\"urbiSelCat(")

    # 14-category scrollable grid (replaces 4 static buttons)
    screens = re.sub(
        r'<div class="cat-grid">.*?</div>\s*<div class="inp-group">',
        '<div class="cat-grid cat-grid-full" id="urbi-catgrid"></div>\n        <div class="inp-group">',
        screens,
        count=1,
        flags=re.DOTALL,
    )

    # Quick actions open report with category
    screens = screens.replace(
        "onclick=\"urbiGoTo(3)\"><i class=\"ti ti-road\"",
        "onclick=\"urbiQuickCat('vial')\"><i class=\"ti ti-road\"",
    )
    screens = screens.replace(
        "onclick=\"urbiGoTo(3)\"><i class=\"ti ti-bulb\"",
        "onclick=\"urbiQuickCat('luz')\"><i class=\"ti ti-bulb\"",
    )
    screens = screens.replace(
        "onclick=\"urbiGoTo(3)\"><i class=\"ti ti-trees\"",
        "onclick=\"urbiQuickCat('arboles')\"><i class=\"ti ti-trees\"",
    )

    # AI value element id for dynamic updates
    screens = screens.replace(
        '<div class="ai-val">Hueco en vía · Infraestructura Vial</div>',
        '<div class="ai-val" id="urbi-ai-cat">Hueco en vía · Infraestructura Vial</div>',
    )

    return scope_prototype_css(raw_css), screens


def build_demo_css(proto_css: str) -> str:
    return (
        DEMO_CSS_START
        + "\n"
        + DEMO_PANEL_CSS
        + TOKENS
        + proto_css
        + "\n\n"
        + DEMO_CSS_END
    )


def build_js() -> str:
    cats_js = ",\n  ".join(
        f"{{id:'{i}', icon:'{ic}', name:'{nm}', receptor:'{rc}'}}"
        for i, ic, nm, rc in URBI_CATS
    )
    pitch_map = ", ".join(f"{idx}:'{uid}'" for idx, (uid, *_) in enumerate(URBI_CATS, 1))

    return f"""{JS_START}
const urbiCats = [
  {cats_js}
];

const pitchCatToUrbi = {{ {pitch_map} }};

const urbiScreenNames = ['splash','home','report','dup','success','track'];
let urbiCurrentScreen = 1;
let urbiPhotoSim = false;
let urbiSelectedCat = 'vial';
let pitchCatIndex = 1;

const urbiRoot = () => document.querySelector('#s_demo .urbi-proto');

function urbiRenderCats() {{
  const grid = document.getElementById('urbi-catgrid');
  if (!grid) return;
  grid.innerHTML = urbiCats.map(c => `
    <button type="button" class="cat-btn${{urbiSelectedCat === c.id ? ' sel' : ''}}" onclick="urbiSelCat('${{c.id}}')">
      <i class="ti ${{c.icon}}" aria-hidden="true"></i>
      <span class="cat-name">${{c.name}}</span>
    </button>
  `).join('');
}}

function urbiSelCat(id) {{
  const c = urbiCats.find(x => x.id === id);
  if (!c) return;
  urbiSelectedCat = id;
  const aiCat = document.getElementById('urbi-ai-cat');
  if (aiCat) aiCat.textContent = c.name + ' · ' + c.receptor;
  urbiRenderCats();
}}

function urbiQuickCat(id) {{
  urbiSelCat(id);
  urbiGoTo(3);
}}

function urbiGoTo(n) {{
  const root = urbiRoot();
  if (!root) return;
  const name = urbiScreenNames[n - 1];
  root.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const target = root.querySelector('#s-' + name);
  if (target) {{
    target.classList.add('active');
    urbiCurrentScreen = n;
  }}
  document.querySelectorAll('#s_demo .demo-step-btn').forEach((b, i) => {{
    b.classList.toggle('active', i + 1 === n);
  }});
  if (n === 3) {{
    urbiRenderCats();
    if (!urbiPhotoSim) {{
      const filled = document.getElementById('pzfilled');
      const badge = document.getElementById('aibadge');
      if (filled) filled.classList.remove('show');
      if (badge) badge.classList.remove('show');
      const pz = document.getElementById('pzone');
      if (pz) pz.classList.remove('filled');
    }}
  }}
}}

function urbiSimPhoto() {{
  if (urbiPhotoSim) return;
  const pz = document.getElementById('pzone');
  const filled = document.getElementById('pzfilled');
  const ldots = document.getElementById('ldots');
  const loc = document.getElementById('pzloc');
  if (!pz || !filled) return;
  pz.classList.add('filled');
  filled.classList.add('show');
  if (ldots) ldots.style.display = 'flex';
  const big = filled.querySelector('.pz-big-icon');
  if (big) big.style.display = 'none';
  setTimeout(() => {{
    if (ldots) ldots.style.display = 'none';
    if (big) big.style.display = 'flex';
    if (loc) loc.style.display = 'block';
    setTimeout(() => {{
      const badge = document.getElementById('aibadge');
      if (badge) badge.classList.add('show');
      urbiPhotoSim = true;
      urbiRenderCats();
    }}, 300);
  }}, 1100);
}}

function goToPitchSlide(id) {{
  const idx = [...slides].findIndex(s => s.id === id);
  if (idx >= 0) goTo(idx);
}}

function goToDemoWithCat(pitchNum) {{
  goToPitchSlide('s_demo');
  urbiSelCat(pitchCatToUrbi[pitchNum] || 'vial');
  urbiGoTo(3);
}}

function selectPitchCat(num, openPanel) {{
  pitchCatIndex = num;
  const card = document.querySelector(`#s_reportes .cat-card[data-cat="${{num}}"]`);
  if (!card) return;
  const wasActive = card.classList.contains('active') && !openPanel;
  document.querySelectorAll('#s_reportes .cat-card').forEach(c => c.classList.remove('active'));
  if (wasActive) {{
    catPanel.classList.remove('show');
    updateCatNavCounter();
    return;
  }}
  const d = catData[num];
  if (!d) return;
  card.classList.add('active');
  catReceptor.textContent = d.receptor;
  catGov.innerHTML = d.gov.map(t => `<div class="dot-item body-s d">${{t}}</div>`).join('');
  catCit.innerHTML = d.cit.map(t => `<div class="dot-item body-s d">${{t}}</div>`).join('');
  catPanel.classList.add('show');
  updateCatNavCounter();
}}

function updateCatNavCounter() {{
  const el = document.getElementById('cat-nav-counter');
  if (!el) return;
  const c = urbiCats.find(x => x.id === pitchCatToUrbi[pitchCatIndex]);
  el.textContent = `${{pitchCatIndex}} / 14 · ${{c ? c.name : ''}}`;
}}

function pitchCatPrev() {{
  pitchCatIndex = pitchCatIndex <= 1 ? 14 : pitchCatIndex - 1;
  selectPitchCat(pitchCatIndex, true);
}}

function pitchCatNext() {{
  pitchCatIndex = pitchCatIndex >= 14 ? 1 : pitchCatIndex + 1;
  selectPitchCat(pitchCatIndex, true);
}}

urbiGoTo(1);
"""


def slide_shell_es(screens: str) -> str:
    return f'''<!-- ═══════════════════════════════════════════
     SLIDE 3.5 — DEMO EN VIVO
═══════════════════════════════════════════ -->
<div class="slide" id="s_demo">
  <div style="display:flex;flex:1;gap:0;min-height:0">
    <div style="width:42%;padding:48px 36px 80px 72px;display:flex;flex-direction:column">
      <div class="slide-label">Producto</div>
      <div class="display lg" style="margin-bottom:16px">Así funciona URBI.<br>En vivo, <span class="g">ahora mismo.</span></div>
      <div class="body-m d" style="margin-bottom:24px;max-width:340px">No es un wireframe. No es un video. Es la app funcionando en tiempo real. Navega el flujo completo — desde el reporte hasta el seguimiento.</div>
      <div style="display:flex;flex-direction:column;gap:6px;flex:1">
        <button type="button" class="demo-step-btn active" onclick="urbiGoTo(1)">
          <div style="width:22px;height:22px;border-radius:50%;background:rgba(0,229,160,0.15);border:1px solid rgba(0,229,160,0.3);display:flex;align-items:center;justify-content:center;font-family:'Bebas Neue',sans-serif;font-size:12px;color:var(--green);flex-shrink:0">1</div>
          <div style="flex:1"><div class="body-s" style="color:var(--text)">Splash · Identidad URBI</div></div>
          <div class="badge" style="font-size:10px;padding:3px 8px">Bienvenida</div>
        </button>
        <button type="button" class="demo-step-btn" onclick="urbiGoTo(2)">
          <div style="width:22px;height:22px;border-radius:50%;background:rgba(0,229,160,0.15);border:1px solid rgba(0,229,160,0.3);display:flex;align-items:center;justify-content:center;font-family:'Bebas Neue',sans-serif;font-size:12px;color:var(--green);flex-shrink:0">2</div>
          <div style="flex:1"><div class="body-s" style="color:var(--text)">Home · Feed + estadísticas</div></div>
          <div class="badge" style="font-size:10px;padding:3px 8px">Dashboard</div>
        </button>
        <button type="button" class="demo-step-btn" onclick="urbiGoTo(3)" style="border-color:rgba(255,179,71,0.3)">
          <div style="width:22px;height:22px;border-radius:50%;background:rgba(255,179,71,0.15);border:1px solid rgba(255,179,71,0.3);display:flex;align-items:center;justify-content:center;font-family:'Bebas Neue',sans-serif;font-size:12px;color:var(--amber);flex-shrink:0">3</div>
          <div style="flex:1"><div class="body-s" style="color:var(--text)">Nuevo reporte · Foto + IA</div></div>
          <div class="badge-a" style="font-size:10px;padding:3px 8px">⚡ El momento clave</div>
        </button>
        <button type="button" class="demo-step-btn" onclick="urbiGoTo(4)">
          <div style="width:22px;height:22px;border-radius:50%;background:rgba(0,229,160,0.15);border:1px solid rgba(0,229,160,0.3);display:flex;align-items:center;justify-content:center;font-family:'Bebas Neue',sans-serif;font-size:12px;color:var(--green);flex-shrink:0">4</div>
          <div style="flex:1"><div class="body-s" style="color:var(--text)">Duplicado detectado · IA geográfica</div></div>
          <div class="badge" style="font-size:10px;padding:3px 8px">Validación</div>
        </button>
        <button type="button" class="demo-step-btn" onclick="urbiGoTo(5)">
          <div style="width:22px;height:22px;border-radius:50%;background:rgba(0,229,160,0.15);border:1px solid rgba(0,229,160,0.3);display:flex;align-items:center;justify-content:center;font-family:'Bebas Neue',sans-serif;font-size:12px;color:var(--green);flex-shrink:0">5</div>
          <div style="flex:1"><div class="body-s" style="color:var(--text)">Confirmación · Puntos + código</div></div>
          <div class="badge" style="font-size:10px;padding:3px 8px">Éxito</div>
        </button>
        <button type="button" class="demo-step-btn" onclick="urbiGoTo(6)">
          <div style="width:22px;height:22px;border-radius:50%;background:rgba(0,229,160,0.15);border:1px solid rgba(0,229,160,0.3);display:flex;align-items:center;justify-content:center;font-family:'Bebas Neue',sans-serif;font-size:12px;color:var(--green);flex-shrink:0">6</div>
          <div style="flex:1"><div class="body-s" style="color:var(--text)">Seguimiento · Timeline en vivo</div></div>
          <div class="badge" style="font-size:10px;padding:3px 8px">Transparencia</div>
        </button>
      </div>
    </div>
    <div style="flex:1;display:flex;align-items:center;justify-content:center;padding:32px 72px 80px 0;position:relative">
      <div style="position:absolute;width:300px;height:300px;background:var(--green);opacity:0.04;filter:blur(60px);border-radius:50%;pointer-events:none"></div>
      <div class="urbi-proto">
        <div class="device">
          <div class="screen-wrap">
{screens}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>'''


def slide_shell_en(screens: str) -> str:
    return slide_shell_es(screens).replace(
        "Así funciona URBI.<br>En vivo, <span class=\"g\">ahora mismo.</span>",
        "This is how URBI works.<br>Live, <span class=\"g\">right now.</span>",
    ).replace(
        "No es un wireframe. No es un video. Es la app funcionando en tiempo real. Navega el flujo completo — desde el reporte hasta el seguimiento.",
        "Not a wireframe. Not a video. The app running in real time. Navigate the full flow — from report to tracking.",
    ).replace('slide-label">Producto', 'slide-label">Product')


def patch_pitch(path: Path, slide_html: str, demo_css: str, js: str) -> None:
    html = path.read_text(encoding="utf-8")

    if DEMO_CSS_START not in html:
        raise SystemExit(f"Demo CSS marker missing in {path.name}")

    html = re.sub(
        re.escape(DEMO_CSS_START) + r".*?" + re.escape(DEMO_CSS_END),
        demo_css.rstrip() + "\n",
        html,
        count=1,
        flags=re.DOTALL,
    )

    html = re.sub(
        r"<!-- ═+\s*\n\s*SLIDE 3\.5 — .*?\n════════════════+\s*-->\s*<div class=\"slide\" id=\"s_demo\">.*?</div>\n\n<!-- ═+\s*\n\s*SLIDE 4 — BENCHMARK",
        slide_html + "\n\n<!-- ═══════════════════════════════════════════\n     SLIDE 4 — BENCHMARK",
        html,
        count=1,
        flags=re.DOTALL,
    )

    js_end = JS_END if JS_END in html else "// Report categories slide"
    html = re.sub(
        re.escape(JS_START) + r".*?" + re.escape(js_end),
        js.rstrip() + "\n\n" + js_end,
        html,
        count=1,
        flags=re.DOTALL,
    )

    if "tabler-icons" not in html:
        html = html.replace(
            "</title>",
            '</title>\n<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css">',
            1,
        )

    path.write_text(html, encoding="utf-8")
    print(f"synced: {path.name}")


def main() -> None:
    proto_css, screens = extract_proto_parts()
    demo_css = build_demo_css(proto_css)
    js = build_js()
    patch_pitch(PITCH_ES, slide_shell_es(screens), demo_css, js)
    patch_pitch(PITCH_EN, slide_shell_en(screens), demo_css, js)


if __name__ == "__main__":
    main()
