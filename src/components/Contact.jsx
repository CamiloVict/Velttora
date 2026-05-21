import { Reveal } from './Reveal';

export function Contact() {
  return (
    <section className="cta" id="contact">
      <div className="cta-glow" />
      <div className="container">
        <Reveal className="section-eyebrow" style={{ justifyContent: 'center' }}>
          Let&apos;s talk
        </Reveal>
        <Reveal delay={1} className="cta-title">
          Ready to build
          <br />
          something <em>real?</em>
        </Reveal>
        <Reveal delay={2} className="cta-subtitle">
          Whether you&apos;re a potential partner, investor, government institution, or fellow
          builder — we&apos;d love to hear from you.
        </Reveal>
        <Reveal delay={3} className="cta-contact-row">
          <a href="mailto:hello@Velttora.com" className="contact-item">
            <span>✉</span> hello@Velttora.com
          </a>
          <a href="https://Velttora.com" className="contact-item">
            <span>🌐</span> Velttora.com
          </a>
          <div className="contact-item">
            <span>📍</span> Cali, Colombia · Wyoming, USA
          </div>
        </Reveal>
      </div>
    </section>
  );
}
