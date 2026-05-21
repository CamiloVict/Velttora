import { useI18n } from '../i18n/I18nProvider';
import { Reveal } from './Reveal';

export function Capabilities() {
  const { t } = useI18n();
  const c = t.capabilities;
  const delays = [null, 1, 2, 3, 4, null];

  return (
    <section className="capabilities" id="capabilities">
      <div className="container">
        <Reveal className="section-eyebrow">{c.eyebrow}</Reveal>
        <Reveal delay={1} className="section-title">
          {c.titleLine1}
          <br />
          <em>{c.titleLine2}</em>
        </Reveal>
        <Reveal delay={2} className="section-lead">
          {c.lead}
        </Reveal>

        <div className="capabilities-grid">
          {c.items.map((cap, i) => (
            <Reveal key={cap.title} delay={delays[i]} className="capability-card">
              <span className="capability-icon">{cap.icon}</span>
              <div className="capability-title">{cap.title}</div>
              <p className="capability-desc">{cap.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
