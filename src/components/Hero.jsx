import { heroStats } from '../data/heroStats';

const ArrowIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

export function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-glow" />
      <div className="hero-glow-2" />
      <div className="container">
        <div className="hero-label">Wyoming LLC · Est. 2026 · Global</div>
        <h1 className="hero-title">
          We build software
          <br />
          that moves
          <br />
          <em>industries forward.</em>
          <span className="line-2">Powered by AI.</span>
        </h1>
        <p className="hero-desc">
          Velttora LLC is a technology studio that identifies industries operating on broken,
          manual, or fragmented systems — and replaces them with intelligent, scalable platforms.
        </p>
        <div className="hero-actions">
          <a href="#products" className="btn-primary">
            See our products
            <ArrowIcon />
          </a>
          <a href="#contact" className="btn-secondary">
            Get in touch
          </a>
        </div>
        <div className="hero-stats">
          {heroStats.map((stat) => (
            <div key={stat.label}>
              <div className="hero-stat-value">
                {stat.value}
                <span>{stat.suffix}</span>
              </div>
              <div className="hero-stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
