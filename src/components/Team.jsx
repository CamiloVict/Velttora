import { Reveal } from './Reveal';

export function Team() {
  return (
    <section className="team" id="team">
      <div className="container">
        <Reveal className="section-eyebrow">The people</Reveal>
        <Reveal delay={1} className="section-title" style={{ marginBottom: 48 }}>
          Behind <em>Velttora.</em>
        </Reveal>

        <Reveal delay={2} className="founder-card">
          <div className="founder-avatar">CV</div>
          <div>
            <div className="founder-name">Camilo A. Victoria L.</div>
            <div className="founder-role">// Founder · CEO · Product Architect</div>
            <p className="founder-bio">
              Builder, product strategist, and entrepreneur from Cali, Colombia. Camilo founded
              Velttora LLC with a single thesis: the most impactful technology companies are built by
              people who deeply understand the problems of their region — and have the ambition to
              solve them at global scale.
            </p>
            <p className="founder-bio">
              He leads product strategy, technical architecture, and commercial relationships across
              all Velttora products — from GovTech platforms pitched to city governments, to AI-driven
              fintech tools and global education marketplaces.
            </p>
            <div className="founder-links">
              <a href="mailto:camiloavict@gmail.com" className="founder-link">
                <span>✉</span> camilo@Velttora.com
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="founder-link">
                <span>in</span> LinkedIn
              </a>
              <a href="#" className="founder-link">
                <span>🌎</span> Cali, Colombia
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
