import { useI18n } from '../i18n/I18nProvider';
import { Reveal } from './Reveal';

export function Products() {
  const { t } = useI18n();
  const p = t.products;

  return (
    <section className="products" id="products">
      <div className="container">
        <div className="products-header">
          <div>
            <Reveal className="section-eyebrow">{p.eyebrow}</Reveal>
            <Reveal delay={1} className="section-title">
              {p.titleLine1}
              <br />
              <em>{p.titleLine2}</em>
            </Reveal>
          </div>
          <Reveal
            delay={2}
            className="section-lead"
            style={{ maxWidth: 360, textAlign: 'right' }}
          >
            {p.lead}
          </Reveal>
        </div>

        <div className="products-grid">
          {p.items.map((product) => {
            const CardTag = product.href ? 'a' : 'div';
            const isExternal = product.href?.startsWith('http');
            const cardProps = product.href
              ? {
                  href: product.href,
                  ...(isExternal
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {}),
                  'aria-label': isExternal
                    ? `${product.name} — ${p.openWebsite}`
                    : `${product.name} — ${p.viewPitch}`,
                }
              : {};

            return (
              <Reveal key={product.name} delay={product.delay} className="product-card-reveal">
                <CardTag
                  className={`product-card${product.href ? ' product-card--link' : ''}`}
                  {...cardProps}
                >
                  <div className="product-num">{product.num}</div>
                  <div className="product-status">{product.status}</div>
                  <div className="product-icon">{product.icon}</div>
                  <div className="product-name">
                    {product.name}
                    {product.href && <span className="product-external">↗</span>}
                  </div>
                  <div className="product-tagline">{product.tagline}</div>
                  <p className="product-desc">{product.description}</p>
                  <div className="product-tags">
                    {product.tags.map((tag) => (
                      <span key={tag} className="product-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardTag>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
