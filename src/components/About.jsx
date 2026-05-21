import { useI18n } from '../i18n/I18nProvider';
import { Reveal } from './Reveal';

export function About() {
  const { t } = useI18n();
  const a = t.about;

  return (
    <section className="about" id="about">
      <div className="container">
        <div className="about-grid">
          <div>
            <Reveal className="section-eyebrow">{a.eyebrow}</Reveal>
            <Reveal delay={1} className="section-title">
              {a.titleLine1}
              <br />
              <em>{a.titleLine2}</em>
            </Reveal>
            <Reveal delay={2} className="section-lead">
              {a.lead1}
            </Reveal>
            <br />
            <Reveal delay={3} className="section-lead" style={{ marginTop: 0 }}>
              {a.lead2}
            </Reveal>
          </div>
          <div className="about-right">
            {a.cards.map((card, i) => (
              <Reveal key={card.title} delay={i + 1} className="about-card">
                <div className="about-card-title">{card.title}</div>
                <p>{card.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
