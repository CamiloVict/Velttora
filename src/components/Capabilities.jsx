import { capabilities } from '../data/capabilities';
import { Reveal } from './Reveal';

export function Capabilities() {
  return (
    <section className="capabilities" id="capabilities">
      <div className="container">
        <Reveal className="section-eyebrow">What we do</Reveal>
        <Reveal delay={1} className="section-title">
          Full-stack capability.
          <br />
          <em>Zero fluff.</em>
        </Reveal>
        <Reveal delay={2} className="section-lead">
          We design, build, and ship production-grade software. From mobile apps to AI pipelines, we
          own the full stack.
        </Reveal>

        <div className="capabilities-grid">
          {capabilities.map((cap) => (
            <Reveal key={cap.title} delay={cap.delay} className="capability-card">
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
