import { aboutCards } from '../data/aboutCards';
import { Reveal } from './Reveal';

export function About() {
  return (
    <section className="about" id="about">
      <div className="container">
        <div className="about-grid">
          <div>
            <Reveal className="section-eyebrow">Who we are</Reveal>
            <Reveal delay={1} className="section-title">
              A studio built on
              <br />
              <em>deliberate bets.</em>
            </Reveal>
            <Reveal delay={2} className="section-lead">
              Velttora LLC is a software studio headquartered in Wyoming, USA, founded by Camilo
              Arturo Victoria Labrada from Cali, Colombia. We don&apos;t chase trends — we identify
              sectors where technology has been absent too long, then build the platform that becomes
              the new standard.
            </Reveal>
            <br />
            <Reveal delay={3} className="section-lead" style={{ marginTop: 0 }}>
              Every product we launch is a deliberate bet on an industry ready to change. We work lean,
              we ship fast, and we build for global scale from day one.
            </Reveal>
          </div>
          <div className="about-right">
            {aboutCards.map((card) => (
              <Reveal key={card.title} delay={card.delay} className="about-card">
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
