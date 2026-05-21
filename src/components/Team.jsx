import { useI18n } from '../i18n/I18nProvider';
import { Reveal } from './Reveal';

export function Team() {
  const { t } = useI18n();
  const tm = t.team;

  return (
    <section className="team" id="team">
      <div className="container">
        <Reveal className="section-eyebrow">{tm.eyebrow}</Reveal>
        <Reveal delay={1} className="section-title" style={{ marginBottom: 48 }}>
          {tm.titleBefore}
          <em>{tm.titleEm}</em>
        </Reveal>

        <Reveal delay={2} className="founder-card">
          <div className="founder-avatar">CV</div>
          <div>
            <div className="founder-name">{tm.name}</div>
            <div className="founder-role">{tm.role}</div>
            <p className="founder-bio">{tm.bio1}</p>
            <p className="founder-bio">{tm.bio2}</p>
            <div className="founder-links">
              <a href="mailto:camiloavict@gmail.com" className="founder-link">
                <span>✉</span> camilo@velttora.com
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="founder-link">
                <span>in</span> {tm.linkedin}
              </a>
              <a href="#" className="founder-link">
                <span>🌎</span> {tm.location}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
